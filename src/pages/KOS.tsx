// src/pages/KOS.tsx

import { Link } from "react-router";
import { useEffect, useState } from "react";
import RiskCalculator from "../components/RiskCalculator";
import RiskScore from "../components/RiskScore";
import InvestmentAttractivenessCalculator from "../components/InvestmentAttractivenessCalculator";
import { FiClipboard, FiTarget, FiTrendingUp } from "react-icons/fi";

const DEMO_KOS = {
  id: "kos-demo",
  email: "kos-demo@demo.com",
  name: "Demo KOS MMC",
  companyName: "Demo KOS MMC",
  sector: "İT",
  employeeCount: 50,
  turnover: "500000",
  exportPotential: "Yüksək",
  innovation: "Yüksək texnologiya",
  patents: "2 patent",
  technology: "AI, Cloud",
  certificates: "ISO 9001",
  ecoLabels: "GreenTech",
  projects: "Demo Layihə",
  projectDesc: "AI əsaslı platforma",
  projectRisk: "Orta",
  projectInvestment: "100000",
  social: "linkedin.com/in/kosdemo"
};

const KOS = () => {
  const [kosList, setKosList] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("");
  const [risk, setRisk] = useState("");
  const [activeTab, setActiveTab] = useState<'list' | 'calculator' | 'investment'>('list');

  useEffect(() => {
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem("kosList") || "[]");
    } catch { list = []; }
    // Demo user əlavə et (əgər yoxdursa)
    const hasDemo = list.some((k:any) => k.id === DEMO_KOS.id);
    if (!hasDemo) {
      list = [DEMO_KOS, ...list];
      localStorage.setItem("kosList", JSON.stringify(list));
    }
    setKosList(list);
  }, []);

  const filtered = kosList.filter((kos) => {
    const matchesSearch = search === "" || (kos.companyName || kos.name || "").toLowerCase().includes(search.toLowerCase());
    const matchesSector = sector === "" || (kos.sector || "").toLowerCase().includes(sector.toLowerCase());
    const matchesRisk = risk === "" || (kos.projectRisk || "").toLowerCase() === risk.toLowerCase();
    return matchesSearch && matchesSector && matchesRisk;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6 text-primary">KOS Platforması</h2>
          
          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'list' 
                  ? 'bg-primary text-black' 
                  : 'bg-white text-primary border border-primary hover:bg-primary/10'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <FiClipboard className="w-5 h-5" />
                KOS Siyahısı
              </span>
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'calculator' 
                  ? 'bg-primary text-black' 
                  : 'bg-white text-primary border border-primary hover:bg-primary/10'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <FiTarget className="w-5 h-5" />
                Risk Hesablayıcısı
              </span>
            </button>
            <button
              onClick={() => setActiveTab('investment')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'investment' 
                  ? 'bg-primary text-black' 
                  : 'bg-white text-primary border border-primary hover:bg-primary/10'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <FiTrendingUp className="w-5 h-5" />
                İnvestisiya İndeksi
              </span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'list' ? (
            <div>
              <div className="flex flex-wrap gap-4 mb-6">
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Ad və ya şirkət axtar..." className="px-3 py-2 border border-primary/30 rounded focus:border-primary focus:outline-none" />
                <input value={sector} onChange={e => setSector(e.target.value)} placeholder="Sektor..." className="px-3 py-2 border border-primary/30 rounded focus:border-primary focus:outline-none" />
                <select value={risk} onChange={e => setRisk(e.target.value)} className="px-3 py-2 border border-primary/30 rounded focus:border-primary focus:outline-none">
                  <option value="">Risk (hamısı)</option>
                  <option value="Aşağı">Aşağı</option>
                  <option value="Orta">Orta</option>
                  <option value="Yüksək">Yüksək</option>
                </select>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((kos) => (
                  <div key={kos.id} className="rounded-lg border border-gray-200 p-4 bg-white shadow-md">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold">{typeof kos.companyName === 'string' ? kos.companyName : (typeof kos.name === 'string' ? kos.name : '-')}</h3>
                      <RiskScore score={Math.floor(Math.random() * 100)} size="small" />
                    </div>
                    <p className="text-gray-600 mt-2">Sektor: {typeof kos.sector === 'string' ? kos.sector : '-'}</p>
                    <p className="text-gray-600 mt-2">Dövriyyə: {typeof kos.turnover === 'string' ? kos.turnover : '-'}</p>
                    <p className="text-gray-600 mt-2">İşçilərin sayı: {typeof kos.employeeCount === 'number' || typeof kos.employeeCount === 'string' ? kos.employeeCount : '-'}</p>
                    <p className="text-gray-600 mt-2">İxrac potensialı: {typeof kos.exportPotential === 'string' ? kos.exportPotential : '-'}</p>
                    <p className="text-gray-600 mt-2">Risk: {typeof kos.projectRisk === 'string' ? kos.projectRisk : '-'}</p>
                    <p className="text-gray-600 mt-2">Layihə: {
                      Array.isArray(kos.projects)
                        ? kos.projects.join(', ')
                        : (typeof kos.projects === 'string' && kos.projects)
                          ? kos.projects
                          : '-'
                    }</p>
                    <p className="text-gray-600 mt-2">Əlaqə: {typeof kos.email === 'string' ? kos.email : '-'}</p>
                    <Link to={`/kos/${kos.id}`} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg inline-block hover:bg-primary/80 transition-colors">Ətraflı</Link>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'calculator' ? (
            <RiskCalculator />
          ) : (
            <InvestmentAttractivenessCalculator />
          )}
        </div>
      </main>
    </div>
  );
};

export default KOS;
