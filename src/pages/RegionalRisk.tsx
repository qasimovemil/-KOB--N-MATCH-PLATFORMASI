// src/pages/RegionalRisk.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMap, FiBarChart2, FiSearch, FiClipboard, FiCheckCircle, FiAlertTriangle, FiInfo, FiBriefcase } from 'react-icons/fi';
import AzerbaijanAdm1Map from '../components/AzerbaijanAdm1Map';
import BalanceWheel from '../components/BalanceWheel';

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
    region: 'Abşeron',
    riskScore: 30,
    population: 950000,
    gdp: 28000,
    businessCount: 7200,
    infrastructure: 78,
    education: 82,
    stability: 82,
    corruption: 28,
    businessEase: 74,
    factors: { economic: 78, political: 82, infrastructure: 78, social: 76, environmental: 65 },
    opportunities: ['Bakıya yaxınlıq', 'Sürətli urbanizasiya', 'Logistika düyünləri'],
    challenges: ['Torpaq və infrastruktur xərcləri', 'Ekoloji təzyiq'],
    keyIndustries: ['Tikinti', 'Logistika', 'Ticarət', 'İT']
  },
  {
    region: 'Aran',
    riskScore: 52,
    population: 1700000,
    gdp: 22000,
    businessCount: 6000,
    infrastructure: 58,
    education: 60,
    stability: 78,
    corruption: 32,
    businessEase: 68,
    factors: { economic: 62, political: 78, infrastructure: 58, social: 68, environmental: 70 },
    opportunities: ['Kənd təsərrüfatı', 'Yüngül sənaye'],
    challenges: ['Suvarma sistemləri', 'Kapital çıxışı məhdudluğu'],
    keyIndustries: ['Kənd təsərrüfatı', 'Qida emalı', 'Tekstil']
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
    region: 'Quba-Xaçmaz',
    riskScore: 42,
    population: 900000,
    gdp: 16000,
    businessCount: 4300,
    infrastructure: 62,
    education: 66,
    stability: 84,
    corruption: 26,
    businessEase: 73,
    factors: { economic: 60, political: 84, infrastructure: 62, social: 78, environmental: 80 },
    opportunities: ['Meyvəçilik və emal', 'Dəniz turizmi', 'Rusiya bazarına çıxış'],
    challenges: ['Mövsümi məşğulluq', 'Logistika optimizasiyası'],
    keyIndustries: ['Kənd təsərrüfatı', 'Turizm', 'Qida sənayesi']
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
    region: 'Naxçıvan',
    riskScore: 38,
    population: 460000,
    gdp: 19000,
    businessCount: 3000,
    infrastructure: 72,
    education: 75,
    stability: 88,
    corruption: 22,
    businessEase: 78,
    factors: { economic: 66, political: 88, infrastructure: 72, social: 76, environmental: 72 },
    opportunities: ['Sərhəd ticarəti', 'Turizm', 'Kənd təsərrüfatı'],
    challenges: ['İzolyasiya və logistika', 'Bazar həcmi məhdudluğu'],
    keyIndustries: ['Qida sənayesi', 'Turizm', 'Kənd təsərrüfatı']
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
  },
  {
    region: 'Dağlıq Şirvan',
    riskScore: 47,
    population: 500000,
    gdp: 14000,
    businessCount: 2600,
    infrastructure: 57,
    education: 62,
    stability: 86,
    corruption: 24,
    businessEase: 70,
    factors: { economic: 58, political: 86, infrastructure: 57, social: 72, environmental: 78 },
    opportunities: ['Dağ turizmi', 'Ekoloji məhsullar'],
    challenges: ['Nəqliyyat əlçatanlığı', 'Kiçik bazar'],
    keyIndustries: ['Turizm', 'Kənd təsərrüfatı', 'Əl sənətləri']
  },
  {
    region: 'Şərqi-Zəngəzur',
    riskScore: 55,
    population: 430000,
    gdp: 12000,
    businessCount: 1800,
    infrastructure: 50,
    education: 58,
    stability: 75,
    corruption: 28,
    businessEase: 66,
    factors: { economic: 58, political: 75, infrastructure: 50, social: 64, environmental: 82 },
    opportunities: ['Bərpa və quruculuq', 'Mədənçilik', 'Turizm'],
    challenges: ['İnfrastrukturun bərpası', 'İnsan resursları çatışmazlığı'],
    keyIndustries: ['Tikinti', 'Mədənçilik', 'Kənd təsərrüfatı']
  },
  {
    region: 'Mil-Muğan',
    riskScore: 53,
    population: 750000,
    gdp: 17000,
    businessCount: 3400,
    infrastructure: 56,
    education: 60,
    stability: 82,
    corruption: 29,
    businessEase: 69,
    factors: { economic: 60, political: 82, infrastructure: 56, social: 66, environmental: 72 },
    opportunities: ['Pambıqçılıq və emal', 'İxrac potensialı'],
    challenges: ['Su ehtiyatları', 'Modernizasiya ehtiyacı'],
    keyIndustries: ['Kənd təsərrüfatı', 'Qida sənayesi']
  },
  {
    region: 'Qarabağ',
    riskScore: 57,
    population: 600000,
    gdp: 13000,
    businessCount: 2100,
    infrastructure: 48,
    education: 59,
    stability: 74,
    corruption: 27,
    businessEase: 65,
    factors: { economic: 56, political: 74, infrastructure: 48, social: 62, environmental: 80 },
    opportunities: ['Bərpa işləri', 'Aqrar inkişaf', 'Enerji layihələri'],
    challenges: ['Miqrasiya və məskunlaşma', 'İnfrastruktur yatırımı'],
    keyIndustries: ['Tikinti', 'Enerji', 'Kənd təsərrüfatı']
  },
  {
    region: 'Mərkəzi-Aran',
    riskScore: 51,
    population: 880000,
    gdp: 18000,
    businessCount: 3600,
    infrastructure: 59,
    education: 61,
    stability: 80,
    corruption: 30,
    businessEase: 70,
    factors: { economic: 60, political: 80, infrastructure: 59, social: 66, environmental: 70 },
    opportunities: ['Logistika mərkəzləri', 'Aqrar sənaye parkları'],
    challenges: ['Kapitalın cəlbi', 'İnnovasiya sürəti'],
    keyIndustries: ['Kənd təsərrüfatı', 'Logistika', 'Yüngül sənaye']
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
          <h1 className="text-4xl font-bold text-primary mb-4 inline-flex items-center gap-2">
            <FiMap className="w-8 h-8" />
            Regional Risk Analizi
          </h1>
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
              <span className="inline-flex items-center gap-2">
                <FiBarChart2 className="w-5 h-5" />
                Ümumi Baxış
              </span>
            </button>
            <button
              onClick={() => setView('detailed')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                view === 'detailed' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <FiSearch className="w-5 h-5" />
                Ətraflı Analiz
              </span>
            </button>
          </div>
        </div>

        {/* Ümumi metrik paneli kaldırıldı (xəritə odaklı idi) */}

        {view === 'overview' ? (
          /* Ümumi Baxış */
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sol tərəf - Xəritə + Regionlar Siyahısı */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-4 inline-flex items-center gap-2">
                <FiMap className="w-6 h-6" />
                İnteraktiv Xəritə
              </h2>
              <div className="mb-6">
                <AzerbaijanAdm1Map
                  selectedName={selectedRegion.region}
                  onRegionClick={(name) => {
                    const region = REGIONAL_DATA.find(r => r.region === name);
                    if (region) setSelectedRegion(region);
                  }}
                />
              </div>
              <h3 className="text-lg font-semibold mb-3 inline-flex items-center gap-2">
                <FiClipboard className="w-5 h-5" />
                Regionlar Siyahısı
              </h3>
              <div className="space-y-2">
                {REGIONAL_DATA.map((region) => (
                  <motion.div
                    key={region.region}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedRegion.region === region.region
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedRegion(region)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{region.region}</h4>
                        <p className="text-xs text-gray-600">Əhali: {(region.population / 1000000).toFixed(1)}M</p>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(region.riskScore)}`}>
                          {region.riskScore}/100
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{getRiskLevel(region.riskScore)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sağ tərəf - Seçilmiş Region Təfərrüatlı Analizi */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">{selectedRegion.region} Regionu</h2>
                <div className="text-sm text-gray-500">Soldakı siyahıdan region seçin</div>
              </div>
              
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
                <h4 className="font-semibold mb-3 inline-flex items-center gap-2">
                  <FiBriefcase className="w-5 h-5" />
                  Əsas Sənaye Sahələri
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRegion.keyIndustries.map((industry, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fürsətlər və Çağırışlar */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600 inline-flex items-center gap-2">
                    <FiCheckCircle className="w-5 h-5" />
                    Fürsətlər
                  </h4>
                  <ul className="space-y-2">
                    {selectedRegion.opportunities.slice(0, 3).map((opp, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <FiCheckCircle className="text-green-500 mr-2 mt-0.5" />
                        {opp}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-red-600 inline-flex items-center gap-2">
                    <FiAlertTriangle className="w-5 h-5" />
                    Çağırışlar
                  </h4>
                  <ul className="space-y-2">
                    {selectedRegion.challenges.slice(0, 3).map((challenge, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <FiAlertTriangle className="text-red-500 mr-2 mt-0.5" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Seçim Təlimatı (xəritəsiz) */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <FiInfo className="w-5 h-5 text-blue-600" />
                  <p className="text-sm text-blue-800 font-medium">
                    Məsləhət: Soldakı region siyahısından birini seçərək ətraflı analizə baxa bilərsiniz
                  </p>
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

            {/* Risk Faktorları Analizi - Balance Wheel */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">{selectedRegion.region} - Risk Faktorları</h2>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="max-w-[420px] mx-auto">
                  <BalanceWheel factors={selectedRegion.factors} size={380} />
                </div>
                <div className="space-y-4">
                  {Object.entries(selectedRegion.factors).map(([factor, score]) => {
                    const factorNames = {
                      economic: 'İqtisadi',
                      political: 'Siyasi',
                      infrastructure: 'İnfrastruktur',
                      social: 'Sosial',
                      environmental: 'Ekoloji'
                    };
                    return (
                      <div key={factor}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-gray-700">{factorNames[factor as keyof typeof factorNames]}</span>
                          <span className="font-bold text-primary">{score}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <motion.div
                            className="bg-primary h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Müqayisəli Analiz */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-6 inline-flex items-center gap-2">
                <FiBarChart2 className="w-6 h-6" />
                Regionlar Müqayisəsi
              </h2>
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