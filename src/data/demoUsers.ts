// Demo test üçün tam KOS və Investor user-lar

export const DEMO_KOS = {
  id: "kos-demo-full",
  email: "kos-demo@demo.com",
  name: "Demo KOS MMC",
  companyName: "Demo KOS MMC",
  sector: "İT, Sənaye, Enerji",
  employeeCount: 120,
  turnover: "1 200 000",
  exportPotential: "Yüksək",
  innovation: "Yüksək texnologiya, R&D",
  patents: "5 patent",
  technology: "AI, Cloud, IoT",
  certificates: "ISO 9001, ISO 14001",
  ecoLabels: "GreenTech, EcoStar",
  projects: [
    { id: 1, title: "AI Platforması", askUSD: 100000, description: "AI əsaslı platforma", risk: "Orta" },
    { id: 2, title: "Enerji Monitorinqi", askUSD: 50000, description: "Enerji səmərəliliyi üçün IoT", risk: "Aşağı" }
  ],
  projectDesc: "Çoxsaylı innovativ layihələr",
  projectRisk: "Orta",
  projectInvestment: "200000",
  social: "linkedin.com/in/kosdemo"
};

export const DEMO_INVESTOR = {
  id: "investor-demo-full",
  email: "investor-demo@demo.com",
  name: "Demo Investor",
  investorName: "Demo Investor MMC",
  sectorInterest: ["İT", "Enerji", "Sənaye"],
  experience: "10 il",
  cooperation: ["Birbaşa investisiya", "Ortaqlıq"],
  riskTolerance: "Orta",
  capitalMin: 50000,
  capitalMax: 500000,
  investmentHistory: ["Startup A", "Layihə B"],
  extraTerms: "Yalnız innovativ layihələr",
  social: "linkedin.com/in/investordemo"
};
