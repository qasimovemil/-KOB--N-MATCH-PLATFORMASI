// src/pages/Investor.tsx
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { INVESTORS as STATIC_INVESTORS } from "../data/investorData";
import { DEMO_INVESTOR } from "../data/demoUsers";

const Investor = () => {
  const [investorList, setInvestorList] = useState(STATIC_INVESTORS);

  useEffect(() => {
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem("investorList") || "[]");
    } catch { list = []; }
    // Demo investor əlavə et (əgər yoxdursa)
    const hasDemo = list.some((i:any) => i.id === DEMO_INVESTOR.id);
    if (!hasDemo) {
      list = [DEMO_INVESTOR, ...list];
      localStorage.setItem("investorList", JSON.stringify(list));
    }
    setInvestorList(list);
  }, []);

  useEffect(() => {
    localStorage.setItem("investorList", JSON.stringify(investorList));
  }, [investorList]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6 text-primary">Investor Profilləri</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investorList.map((investor) => (
              <div key={investor.id} className="rounded-lg border border-gray-200 p-4 bg-white shadow-md">
                <h3 className="text-xl font-semibold">{('investorName' in investor && typeof investor.investorName === 'string') ? investor.investorName : (typeof investor.name === 'string' ? investor.name : '')}</h3>
                {('sectors' in investor && Array.isArray(investor.sectors)) && (
                  <p className="text-gray-600 mt-2">Sektorlar: {investor.sectors.join(", ")}</p>
                )}
                {('sectorInterest' in investor && (typeof investor.sectorInterest === 'string' || typeof investor.sectorInterest === 'number')) && (
                  <p className="text-gray-600 mt-2">Sektor marağı: {investor.sectorInterest}</p>
                )}
                {('capitalMin' in investor && 'capitalMax' in investor && typeof investor.capitalMin === 'number' && typeof investor.capitalMax === 'number') && (
                  <p className="text-gray-600 mt-2">Sərmayə Aralığı: {investor.capitalMin} - {investor.capitalMax}</p>
                )}
                {('capitalMinUSD' in investor && 'capitalMaxUSD' in investor && typeof investor.capitalMinUSD === 'number' && typeof investor.capitalMaxUSD === 'number') && (
                  <p className="text-gray-600 mt-2">Sərmayə Aralığı: {investor.capitalMinUSD} - {investor.capitalMaxUSD} USD</p>
                )}
                {('riskTolerance' in investor && (typeof investor.riskTolerance === 'string' || typeof investor.riskTolerance === 'number')) && (
                  <p className="text-gray-600 mt-2">Risk Toleransı: {investor.riskTolerance}</p>
                )}
                {('experience' in investor && (typeof investor.experience === 'string' || typeof investor.experience === 'number')) && (
                  <p className="text-gray-600 mt-2">Təcrübə: {investor.experience}</p>
                )}
                {('experienceYears' in investor && typeof investor.experienceYears === 'number') && (
                  <p className="text-gray-600 mt-2">Təcrübə: {investor.experienceYears} il</p>
                )}
                {('cooperation' in investor && (typeof investor.cooperation === 'string' || typeof investor.cooperation === 'number')) && (
                  <p className="text-gray-600 mt-2">Əməkdaşlıq: {investor.cooperation}</p>
                )}
                {('cooperationModel' in investor && Array.isArray(investor.cooperationModel)) && (
                  <p className="text-gray-600 mt-2">Əməkdaşlıq modelləri: {investor.cooperationModel.join(", ")}</p>
                )}
                {('investmentHistory' in investor && (typeof investor.investmentHistory === 'string' || typeof investor.investmentHistory === 'number')) && (
                  <p className="text-gray-600 mt-2">İnvestisiya tarixi: {investor.investmentHistory}</p>
                )}
                {('trackRecord' in investor && Array.isArray(investor.trackRecord)) && (
                  <p className="text-gray-600 mt-2">Track record: {investor.trackRecord.join(", ")}</p>
                )}
                {('extraTerms' in investor && (typeof investor.extraTerms === 'string' || typeof investor.extraTerms === 'number')) && (
                  <p className="text-gray-600 mt-2">Əlavə şərtlər: {investor.extraTerms}</p>
                )}
                {('shortDesc' in investor && (typeof investor.shortDesc === 'string' || typeof investor.shortDesc === 'number')) && (
                  <p className="text-gray-600 mt-2">Qısa təsvir: {investor.shortDesc}</p>
                )}
                {('social' in investor && (typeof investor.social === 'string' || typeof investor.social === 'number')) && (
                  <p className="text-gray-600 mt-2">Sosial: {investor.social}</p>
                )}
                {('email' in investor && (typeof investor.email === 'string' || typeof investor.email === 'number')) && (
                  <p className="text-gray-600 mt-2">Əlaqə: {investor.email}</p>
                )}
                <Link to={`/investor/${investor.id}`} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg inline-block hover:bg-primary/80 transition-colors">Ətraflı</Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Investor;
