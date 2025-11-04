// src/pages/InvestorDetail.tsx
import { useParams } from "react-router-dom";
import { INVESTORS } from "../data/investorData";
import { DEMO_INVESTOR } from "../data/demoUsers";

interface StaticInvestor {
  id: string;
  name: string;
  sectors: string[];
  capitalMinUSD: number;
  capitalMaxUSD: number;
  riskTolerance: string;
  trackRecord?: string[];
  cooperationModel: string[];
}

interface MinimalInvestor {
  id: string;
  email?: string;
  name?: string;
  investorName?: string;
  sectorInterest?: string | string[];
  experience?: string | number;
  cooperation?: string | string[];
  riskTolerance?: string | number;
  capitalMin?: number;
  capitalMax?: number;
  investmentHistory?: string | string[];
  extraTerms?: string;
  social?: string;
}

const InvestorDetail = () => {
  const { id } = useParams();

  // 1) Statik məlumatda axtar
  const invStatic = (INVESTORS as StaticInvestor[]).find((i) => i.id === id);

  // 2) localStorage-dan axtar (Investor səhifəsində saxlanan/demo qeydlər)
  let invLocal: MinimalInvestor | undefined;
  try {
    const raw = JSON.parse(localStorage.getItem("investorList") || "[]") as unknown;
    if (Array.isArray(raw)) invLocal = (raw as MinimalInvestor[]).find((i) => i.id === id);
  } catch {
    // ignore
  }

  // 3) Demo fallback: istifadəçi birbaşa detal linkinə gəlibsə, siyahı səhifəsi işləmədən DEMO əlavə olunmur
  if (!invStatic && !invLocal && id === DEMO_INVESTOR.id) {
    invLocal = DEMO_INVESTOR as unknown as MinimalInvestor;
  }

  if (!invStatic && !invLocal) return <div className="min-h-screen bg-gray-50 p-8">Investor tapılmadı.</div>;

  // Statik görünüş
  if (invStatic) {
    const investor = invStatic;
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-6">{investor.name} - Ətraflı</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Ümumi Məlumatlar</h3>
              <p>Sektorlar: {investor.sectors.join(", ")}</p>
              <p>Sərmayə Aralığı: ${investor.capitalMinUSD} - ${investor.capitalMaxUSD}</p>
              <p>Risk Toleransı: {investor.riskTolerance}</p>

              <h3 className="mt-4 text-lg font-semibold">Əvvəlki İnvestisiyalar</h3>
              <ul className="list-disc ml-5">
                {investor.trackRecord?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="mt-4 text-lg font-semibold">Əməkdaşlıq Modelləri</h3>
              <ul className="list-disc ml-5">
                {investor.cooperationModel.map((model, index) => (
                  <li key={index}>{model}</li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Minimal localStorage görünüşü
  const i = invLocal as MinimalInvestor;
  const displayName = i.investorName || i.name || "-";
  const sectorText = Array.isArray(i.sectorInterest) ? i.sectorInterest.join(", ") : (i.sectorInterest || "-");
  const coopText = Array.isArray(i.cooperation) ? i.cooperation.join(", ") : (i.cooperation || "-");
  const historyText = Array.isArray(i.investmentHistory) ? i.investmentHistory.join(", ") : (i.investmentHistory || "-");

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">{displayName} - Ətraflı</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Ümumi Məlumatlar</h3>
            <p>Sektor marağı: {sectorText}</p>
            <p>Kapital aralığı: {typeof i.capitalMin === 'number' && typeof i.capitalMax === 'number' ? `${i.capitalMin} - ${i.capitalMax}` : '-'}</p>
            <p>Risk Toleransı: {i.riskTolerance || '-'}</p>
            <p>Təcrübə: {i.experience || '-'}</p>
            <p>Əməkdaşlıq: {coopText}</p>
            <p>İnvestisiya tarixi: {historyText}</p>
            <p>Əlavə şərtlər: {i.extraTerms || '-'}</p>
            <p>Əlaqə: {i.email || '-'}</p>
            <p>Sosial: {i.social || '-'}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvestorDetail;
