import express, { Request, Response } from "express";

const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "alive", message: "Imprenta Nannu Desing API Server is active!" });
});

export default app;
