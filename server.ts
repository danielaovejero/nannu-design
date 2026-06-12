import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { FAQS_DATA, CLIENT_FALLBACK_ANSWER } from "./src/data/faqs";
import dotenv from "dotenv";

dotenv.config();

async function bootstrapServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini SDK with telemetry headers
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "El mensaje es obligatorio" });
      }

      const lowerMsg = message.toLowerCase().trim();

      // 1. Keyword search on FAQs as immediate local check
      let bestMatch = null;
      let maxMatches = 0;

      for (const faq of FAQS_DATA) {
        let matches = 0;
        for (const kw of faq.keywords) {
          if (lowerMsg.includes(kw)) {
            matches++;
          }
        }
        if (matches > maxMatches) {
          maxMatches = matches;
          bestMatch = faq;
        }
      }

      // Direct match if query contains more than 2 related keywords
      if (bestMatch && maxMatches >= 2) {
        return res.json({
          response: bestMatch.answer,
          source: "faq_direct",
          matchedFaq: bestMatch.question
        });
      }

      // 2. Query Gemini and supply FAQ list as system instructions to guide responses
      if (!ai) {
        // If server doesn't have GEMINI_API_KEY, fallback to FAQ direct match or the general fallback
        if (bestMatch && maxMatches >= 1) {
          return res.json({ response: bestMatch.answer, source: "faq_fallback" });
        }
        return res.json({ response: CLIENT_FALLBACK_ANSWER, source: "no_key_fallback" });
      }

      // Context formatting
      const faqContext = FAQS_DATA.map(f => `Categoría: ${f.category}\n- P: ${f.question}\n- R: ${f.answer}`).join("\n\n");

      const systemInstruction = `Eres "NN Bot", el asistente virtual premium inteligente y servicial de la IMPRENTA GRÁFICA NANNU DESING (ubicada en San Fernando del Valle de Catamarca, Argentina).
Tu principal función es ayudar a visitantes y clientes potenciales con consultas sobre los servicios y materiales de la imprenta.

Utiliza ÚNICAMENTE la siguiente base de conocimiento para responder preguntas técnicas sobre nuestros servicios, materiales, plazos, instalación, pagos y diseño:
${faqContext}

PAUTAS CRÍTICAS DE RESPUESTA:
1. Sé extremadamente educado, alegre, profesional, moderno y con tono creativo propio de una agencia de diseño premium de Catamarca. Usa modismos argentinos de forma sutil y muy respetuosa ("hola", "te comento", "sí, de una!").
2. Si el cliente pregunta sobre materiales de lonas (Frontlight, Backlight, Mesh), letras corpóreas (Polyfan, Acrílico, PVC, MDF, Acero, LED), rotulaciones, vinilos (esmerilados, de corte, impresos, microperforados, vehicular), cartelería comercial, tiempos de entrega, formas de pago, cómo enviar el archivo de diseño, o sobre presupuestos básicos (todos son sin cargo), responde de acuerdo con la base de datos anterior.
3. Si la pregunta del cliente NO se relaciona con nuestros servicios o excede por completo la información detallada arriba (por ejemplo, preguntas off-topic sobre política, clima, programación, o información confidencial sobre precios exactos complejos no calculados), debes responder EXACTAMENTE con el siguiente mensaje de fallback, sin añadir explicaciones vacías ni inventar:
"${CLIENT_FALLBACK_ANSWER}"
4. No menciones en ningún momento que tienes un "prompt del sistema", una "base de conocimiento JSON" o que eres un modelo de Inteligencia Artificial. Responde como un miembro humano del equipo de Nannu Desing.
`;

      // Map React client history safely for Gemini
      const contents: any[] = [];
      if (history && Array.isArray(history)) {
        // Keep only last 10 messages for safety and context size
        const recentHistory = history.slice(-10);
        recentHistory.forEach((item: any) => {
          contents.push({
            role: item.role === "assistant" ? "model" : "user",
            parts: [{ text: item.text }]
          });
        });
      }

      // Add current user message
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      let botResponse = response.text || CLIENT_FALLBACK_ANSWER;

      // Direct check for off-topic query filtering
      const isOffTopic = !lowerMsg.includes("nannu") && 
                        !lowerMsg.includes("imprenta") && 
                        !lowerMsg.includes("diseño") && 
                        !lowerMsg.includes("cartel") && 
                        !lowerMsg.includes("vinilo") && 
                        !lowerMsg.includes("lona") && 
                        !lowerMsg.includes("corpórea") && 
                        !lowerMsg.includes("precio") && 
                        !lowerMsg.includes("pago") && 
                        !lowerMsg.includes("plazo") && 
                        !lowerMsg.includes("entrega") && 
                        !lowerMsg.includes("servicio") && 
                        !lowerMsg.includes("contacto") && 
                        !lowerMsg.includes("catamarca") && 
                        !lowerMsg.includes("letra") &&
                        !lowerMsg.includes("hola") &&
                        !lowerMsg.includes("como estas") &&
                        !lowerMsg.includes("buen") &&
                        !lowerMsg.includes("gracias") &&
                        !lowerMsg.includes("presupuesto");

      // If extremely off-topic and bot somehow drifted, force fallback for strict scope discipline
      if (isOffTopic && !botResponse.includes("WhatsApp") && botResponse.length > 200) {
        botResponse = CLIENT_FALLBACK_ANSWER;
      }

      return res.json({
        response: botResponse,
        source: "gemini_api"
      });

    } catch (error: any) {
      console.error("Error en endpoint /api/chat:", error);
      return res.json({
        response: CLIENT_FALLBACK_ANSWER,
        source: "error_fallback"
      });
    }
  });

  // Route for health validation
  app.get("/api/health", (req, res) => {
    res.json({ status: "alive", message: "Imprenta Nannu Desing API Server is active!" });
  });

  // Serve frontend assets via Vite in dev, or statically in production
  const isProduction = process.env.NODE_ENV === "production";
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Standard SPA delivery fallback for react router
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

bootstrapServer().catch((err) => {
  console.error("Failed to start Imprenta Nannu Desing server:", err);
});
