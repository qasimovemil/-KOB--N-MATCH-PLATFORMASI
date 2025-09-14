// Demo üçün uyğun KOS və Investor istifadəçi localStorage-a yazılır

export function setDemoMatchUsers() {
  // Demo KOS
  const demoKOS = {
    id: "kos-demo-match",
    email: "kos-match@demo.com",
    name: "Test KOS MMC",
    companyName: "Test KOS MMC",
    sector: "İT",
    employeeCount: 30,
    turnover: "300000",
    exportPotential: "Orta",
    innovation: "Yaxşı",
    patents: "1 patent",
    technology: "AI",
    certificates: "ISO 9001",
    ecoLabels: "EcoStar",
    projects: "Test Layihə",
    projectDesc: "Test layihə təsviri",
    projectRisk: "Orta",
    projectInvestment: "50000",
    social: "linkedin.com/in/kosmatch"
  };
  // Demo Investor
  const demoInvestor = {
    id: "investor-demo-match",
    email: "investor-match@demo.com",
    name: "Test Investor",
    investorName: "Test Investor MMC",
    sectorInterest: "İT",
    experience: "5 il",
    cooperation: "Birbaşa investisiya",
    riskTolerance: "Orta",
    capitalMin: 20000,
    capitalMax: 100000,
    investmentHistory: "Test Startup",
    extraTerms: "Yalnız İT layihələr",
    social: "linkedin.com/in/investormatch"
  };
  // Siyahılara əlavə et
  let kosList = [];
  let investorList = [];
  try { kosList = JSON.parse(localStorage.getItem("kosList") || "[]"); } catch { kosList = []; }
  try { investorList = JSON.parse(localStorage.getItem("investorList") || "[]"); } catch { investorList = []; }
  if (!kosList.some((k:any) => k.id === demoKOS.id)) kosList.unshift(demoKOS);
  if (!investorList.some((i:any) => i.id === demoInvestor.id)) investorList.unshift(demoInvestor);
  localStorage.setItem("kosList", JSON.stringify(kosList));
  localStorage.setItem("investorList", JSON.stringify(investorList));
}
