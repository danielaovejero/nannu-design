export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  iconName: string; // Resolves to LucideIcon
  details: string[];
  bannerUrl: string;
  colorName?: "fuchsia" | "cyan" | "violet" | "emerald" | "amber";
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "Carteles" | "Lonas" | "Vehículos" | "Vinilos" | "Eventos" | "Papelería";
  imageUrl: string;
  description: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimony {
  id: string;
  name: string;
  role: string;
  text: string;
  company: string;
  rating: number;
}
