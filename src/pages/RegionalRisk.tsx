// src/pages/RegionalRisk.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';

interface RegionalData {
  region: string;
  riskScore: number;
  population: number;
  gdp: number;
  businessCount: number;
  infrastructure: number;
  education: number;
  stability: number;
  corruption: number;
  businessEase: number;
  factors: {
    economic: number;
    political: number;
    infrastructure: number;
    social: number;
    environmental: number;
  };
  opportunities: string[];
  challenges: string[];
  keyIndustries: string[];
}

const REGIONAL_DATA: RegionalData[] = [
  {
    region: 'Bakı',
    riskScore: 25,
    population: 2300000,
    gdp: 45000,
    businessCount: 15000,
    infrastructure: 85,
    education: 90,
    stability: 80,
    corruption: 30,
    businessEase: 75,
    factors: { economic: 85, political: 80, infrastructure: 85, social: 75, environmental: 60 },
    opportunities: ['Güclü maliyyə sektoru', 'Yüksək infrastruktur', 'Beynəlxalq əlaqələr', 'IT hub potensialı'],
    challenges: ['Yüksək rəqabət', 'Əmək qüvvəsi qıtlığı', 'Ekoloji problemlər'],
    keyIndustries: ['Neft və qaz', 'Maliyyə', 'İT', 'Turizm', 'Logistika']
  },
  {
    region: 'Gəncə-Qazax',
    riskScore: 35,
    population: 1800000,
    gdp: 25000,
    businessCount: 8500,
    infrastructure: 70,
    education: 75,
    stability: 85,
    corruption: 25,
    businessEase: 80,
    factors: { economic: 70, political: 85, infrastructure: 70, social: 80, environmental: 75 },
    opportunities: ['Kənd təsərrüfatı potensialı', 'Coğrafi mövqe', 'Gürcüstan ilə sərhəd ticarəti'],
    challenges: ['Məhdud maliyyə imkanları', 'İnfrastruktur ehtiyacları'],
    keyIndustries: ['Kənd təsərrüfatı', 'Tekstil', 'Qida sənayesi', 'Ticarət']
  },
  {
    region: 'Şəki-Zaqatala',
    riskScore: 40,
    population: 1200000,
    gdp: 18000,
    businessCount: 5500,
    infrastructure: 65,
    education: 70,
    stability: 90,
    corruption: 20,
    businessEase: 85,
    factors: { economic: 65, political: 90, infrastructure: 65, social: 85, environmental: 85 },
    opportunities: ['Turizm potensialı', 'Ekoloji məhsullar', 'İpək yolu marşrutu'],
    challenges: ['Uzaq coğrafi mövqe', 'Məhdud nəqliyyat'],
    keyIndustries: ['Turizm', 'Kənd təsərrüfatı', 'Əl sənətləri', 'Ormançılıq']
  },
  {
    region: 'Lənkəran',
    riskScore: 45,
    population: 900000,
    gdp: 15000,
    businessCount: 4200,
    infrastructure: 60,
    education: 65,
    stability: 85,
    corruption: 25,
    businessEase: 75,
    factors: { economic: 60, political: 85, infrastructure: 60, social: 75, environmental: 80 },
    opportunities: ['Çay istehsalı', 'Turizm', 'İran sərhədi ticarəti'],
    challenges: ['İnfrastruktur problemləri', 'Məhdud investisiya'],
    keyIndustries: ['Çay istehsalı', 'Kənd təsərrüfatı', 'Balıqçılıq', 'Turizm']
  },
  {
    region: 'Şirvan-Salyan',
    riskScore: 50,
    population: 800000,
    gdp: 20000,
    businessCount: 3800,
    infrastructure: 55,
    education: 60,
    stability: 80,
    corruption: 30,
    businessEase: 70,
    factors: { economic: 65, political: 80, infrastructure: 55, social: 70, environmental: 70 },
    opportunities: ['Neft sənayesi', 'Kənd təsərrüfatı', 'Xəzər dənizi resursu'],
    challenges: ['Ekoloji problemlər', 'İnfrastruktur çatışmazlığı'],
    keyIndustries: ['Neft', 'Qaz', 'Kənd təsərrüfatı', 'Kimya sənayesi']
  }
];

const RegionalRisk = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionalData>(REGIONAL_DATA[0]);
  const [view, setView] = useState<'overview' | 'detailed'>('overview');

  const getRiskColor = (score: number) => {
    if (score <= 30) return 'text-green-600 bg-green-100';
    if (score <= 50) return 'text-yellow-600 bg-yellow-100';
    if (score <= 70) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getRiskLevel = (score: number) => {
    if (score <= 30) return 'Aşağı Risk';
    if (score <= 50) return 'Orta Risk';
    if (score <= 70) return 'Yüksək Risk';
    return 'Çox Yüksək Risk';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">🗺️ Regional Risk Analizi</h1>
          <p className="text-xl text-gray-600">Azərbaycanın regionları üzrə investisiya riskləri və fürsətləri</p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setView('overview')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                view === 'overview' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              📊 Ümumi Baxış
            </button>
            <button
              onClick={() => setView('detailed')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                view === 'detailed' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              🔍 Ətraflı Analiz
            </button>
          </div>
        </div>

        {view === 'overview' ? (
          /* Ümumi Baxış */
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sol tərəf - Regional Map */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">🗺️ Risk Xəritəsi</h2>
              <div className="space-y-4">
                {REGIONAL_DATA.map((region) => (
                  <motion.div
                    key={region.region}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedRegion.region === region.region
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedRegion(region)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">{region.region}</h3>
                        <p className="text-sm text-gray-600">Əhali: {(region.population / 1000000).toFixed(1)}M</p>
                      </div>
                      <div className="text-right">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(region.riskScore)}`}>
                          {region.riskScore}/100
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{getRiskLevel(region.riskScore)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sağ tərəf - Seçilmiş Region Məlumatları */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">{selectedRegion.region} Regionu</h2>
              
              {/* Risk Score */}
              <div className="text-center mb-6">
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke={selectedRegion.riskScore <= 30 ? '#10b981' : 
                             selectedRegion.riskScore <= 50 ? '#f59e0b' : 
                             selectedRegion.riskScore <= 70 ? '#f97316' : '#ef4444'}
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${(100 - selectedRegion.riskScore) * 2.51} 251`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{selectedRegion.riskScore}</div>
                      <div className="text-xs text-gray-500">Risk Balı</div>
                    </div>
                  </div>
                </div>
                <div className={`mt-4 px-4 py-2 rounded-full font-semibold ${getRiskColor(selectedRegion.riskScore)}`}>
                  {getRiskLevel(selectedRegion.riskScore)}
                </div>
              </div>

              {/* Əsas Göstəricilər */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{(selectedRegion.gdp / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-gray-600">Adambaşına GDp (₼)</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedRegion.businessCount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Biznes sayı</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{selectedRegion.infrastructure}%</div>
                  <div className="text-sm text-gray-600">İnfrastruktur</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{selectedRegion.businessEase}%</div>
                  <div className="text-sm text-gray-600">Biznes Asanlığı</div>
                </div>
              </div>

              {/* Əsas Sənaye Sahələri */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">🏭 Əsas Sənaye Sahələri</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRegion.keyIndustries.map((industry, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fürsətlər və Çağırışlar */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">✅ Fürsətlər</h4>
                  <ul className="space-y-2">
                    {selectedRegion.opportunities.slice(0, 3).map((opp, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {opp}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-red-600">⚠️ Çağırışlar</h4>
                  <ul className="space-y-2">
                    {selectedRegion.challenges.slice(0, 3).map((challenge, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Ətraflı Analiz */
          <div className="space-y-8">
            {/* Region Seçimi */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Region Seçin</h2>
              <div className="grid md:grid-cols-5 gap-4">
                {REGIONAL_DATA.map((region) => (
                  <button
                    key={region.region}
                    onClick={() => setSelectedRegion(region)}
                    className={`p-4 rounded-lg text-left transition-all ${
                      selectedRegion.region === region.region
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    <div className="font-semibold">{region.region}</div>
                    <div className="text-sm opacity-75">Risk: {region.riskScore}/100</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Risk Faktorları Analizi */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">{selectedRegion.region} - Risk Faktorları</h2>
              <div className="space-y-6">
                {Object.entries(selectedRegion.factors).map(([factor, score]) => {
                  const factorNames = {
                    economic: 'İqtisadi Risk',
                    political: 'Siyasi Sabitlik',
                    infrastructure: 'İnfrastruktur',
                    social: 'Sosial Faktorlar',
                    environmental: 'Ekoloji Risk'
                  };
                  
                  return (
                    <div key={factor}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{factorNames[factor as keyof typeof factorNames]}</span>
                        <span className="font-bold text-primary">{score}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-primary/70 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Müqayisəli Analiz */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">📊 Regionlar Müqayisəsi</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Region</th>
                      <th className="text-center py-3 px-4">Risk Balı</th>
                      <th className="text-center py-3 px-4">GDP</th>
                      <th className="text-center py-3 px-4">Biznes Sayı</th>
                      <th className="text-center py-3 px-4">İnfrastruktur</th>
                      <th className="text-center py-3 px-4">Təhsil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REGIONAL_DATA.map((region) => (
                      <tr 
                        key={region.region}
                        className={`border-b border-gray-100 hover:bg-gray-50 ${
                          selectedRegion.region === region.region ? 'bg-primary/5' : ''
                        }`}
                      >
                        <td className="py-3 px-4 font-medium">{region.region}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${getRiskColor(region.riskScore)}`}>
                            {region.riskScore}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">₼{(region.gdp / 1000).toFixed(0)}K</td>
                        <td className="py-3 px-4 text-center">{region.businessCount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-center">{region.infrastructure}%</td>
                        <td className="py-3 px-4 text-center">{region.education}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionalRisk;