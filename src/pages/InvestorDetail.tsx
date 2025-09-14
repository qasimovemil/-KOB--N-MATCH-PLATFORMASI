// src/pages/InvestorDetail.tsx
import { useParams } from "react-router-dom";
import { INVESTORS } from "../data/investorData";
const InvestorDetail = () => {
  const { id } = useParams();
  const investor = INVESTORS.find((i) => i.id === id);

  if (!investor) return <div>Investor tapılmadı.</div>;

  return (
    <div className="min-h-screen flex flex-col">

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">{investor.name} - Ətraflı</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Ümumi Məlumatlar</h3>
            <p>Sektorlar: {investor.sectors.join(", ")}</p>
            <p>Sərmayə Aralığı: ${investor.capitalMinUSD} - ${investor.capitalMaxUSD}</p>
            <p>Risk Toleransı: {investor.riskTolerance}</p>

            <h3 className="mt-4 text-lg font-semibold">Əvvəlki İnvesteşlər</h3>
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
};

export default InvestorDetail;
