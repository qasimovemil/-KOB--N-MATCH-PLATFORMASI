// src/components/InvestmentAttractivenessCalculator.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';

type NumOrEmpty = number | '';

interface InvestmentInputs {
  // Maliyyə göstəriciləri (40%)
  revenue: NumOrEmpty;          // Gəlir (son 3 il ortalaması)
  profitMargin: NumOrEmpty;     // Mənfəət marjası (%)
  debtToEquity: NumOrEmpty;     // Borc/Kapital nisbəti
  currentRatio: NumOrEmpty;     // Cari likvidlik nisbəti
  roe: NumOrEmpty;             // Kapital rentabelliyi (%)

  // İdarəetmə keyfiyyəti (20%)
  managementExperience: NumOrEmpty; // Menecment təcrübəsi (1-10)
  corporateGovernance: NumOrEmpty;  // Korporativ idarəetmə (1-10)
  financialTransparency: NumOrEmpty; // Maliyyə şəffaflığı (1-10)

  // Bazar potensialı (20%)
  marketSize: NumOrEmpty;       // Bazar həcmi (Manat)
  marketGrowthRate: NumOrEmpty; // Bazar artım tempı (%)
  competitivePosition: NumOrEmpty; // Rəqabət mövqeyi (1-10)
  exportPotential: NumOrEmpty;  // İxrac potensialı (Manat)

  // İnnovasiya və texnologiya (10%)
  rdInvestment: NumOrEmpty;     // R&D investisiyası (gəlirin %-i)
  patentsCount: NumOrEmpty;     // Patent sayı
  technologyLevel: NumOrEmpty;  // Texnologiya səviyyəsi (1-10)

  // Hüquqi və ESG faktorları (10%)
  legalCompliance: NumOrEmpty;  // Qanun pozuntularının sayı
  esgScore: NumOrEmpty;        // ESG balı (1-10)
  socialImpact: NumOrEmpty;    // Sosial təsir (1-10)
}

const InvestmentAttractivenessCalculator = () => {
  const [inputs, setInputs] = useState<InvestmentInputs>({
    revenue: 0,
    profitMargin: 0,
    debtToEquity: 0,
    currentRatio: 1,
    roe: 0,
    managementExperience: 5,
    corporateGovernance: 5,
    financialTransparency: 5,
    marketSize: 0,
    marketGrowthRate: 0,
    competitivePosition: 5,
    exportPotential: 5,
    rdInvestment: 0,
    patentsCount: 0,
    technologyLevel: 5,
    legalCompliance: 0,
    esgScore: 5,
    socialImpact: 5
  });

  const [result, setResult] = useState<{
    overallScore: number;
    breakdown: {
      financial: number;
      management: number;
      market: number;
      innovation: number;
      legal: number;
    };
    rating: string;
    recommendations: string[];
  } | null>(null);

  const toNum = (v: NumOrEmpty) => (v === '' || isNaN(Number(v)) ? 0 : Number(v));

  const calculateScore = () => {
    // Maliyyə göstəriciləri balı (40%)
    const revenue = toNum(inputs.revenue);
    const profitMargin = toNum(inputs.profitMargin);
    const debtToEquity = toNum(inputs.debtToEquity);
    const currentRatio = toNum(inputs.currentRatio);
    const roe = toNum(inputs.roe);

    const financialScore = Math.min(100,
      (Math.log(revenue + 1) / Math.log(10000000) * 20) + // Revenue normalization
      (Math.min(profitMargin, 30) / 30 * 25) + // Profit margin (max 30%)
      (Math.max(0, (3 - debtToEquity)) / 3 * 20) + // Lower debt is better
      (Math.min(currentRatio, 3) / 3 * 15) + // Current ratio (optimal around 2-3)
      (Math.min(roe, 25) / 25 * 20) // ROE (max 25%)
    );

    // İdarəetmə balı (20%)
    const managementExperience = toNum(inputs.managementExperience);
    const corporateGovernance = toNum(inputs.corporateGovernance);
    const financialTransparency = toNum(inputs.financialTransparency);
    const managementScore =
      (managementExperience * 10 * 0.4) +
      (corporateGovernance * 10 * 0.35) +
      (financialTransparency * 10 * 0.25);

    // Bazar potensialı balı (20%)
    const marketSize = toNum(inputs.marketSize);
    const marketGrowthRate = toNum(inputs.marketGrowthRate);
    const competitivePosition = toNum(inputs.competitivePosition);
    const exportPotential = toNum(inputs.exportPotential);
    const marketScore = Math.min(100,
      (Math.log(marketSize + 1) / Math.log(1_000_000_000) * 25) + // Market size (Manat)
      (Math.min(marketGrowthRate, 20) / 20 * 25) + // Growth rate (max 20%)
      (competitivePosition * 10 * 0.25) +
      // ExportPotential manat: 0–500k → 0–1
      (Math.min(exportPotential, 500_000) / 500_000 * 25)
    );

    // İnnovasiya balı (10%)
    const rdInvestment = toNum(inputs.rdInvestment);
    const patentsCount = toNum(inputs.patentsCount);
    const technologyLevel = toNum(inputs.technologyLevel);
    const innovationScore = Math.min(100,
      (Math.min(rdInvestment, 10) / 10 * 30) + // R&D investment (max 10%)
      (Math.min(patentsCount, 10) / 10 * 30) + // Patents (diminishing returns)
      (technologyLevel * 10 * 0.4)
    );

    // Hüquqi və ESG balı (10%)
    const legalCompliance = toNum(inputs.legalCompliance);
    const esgScore = toNum(inputs.esgScore);
    const socialImpact = toNum(inputs.socialImpact);
    const legalScore = Math.min(100,
      (Math.max(0, (10 - legalCompliance)) / 10 * 40) + // Fewer violations is better
      (esgScore * 10 * 0.35) +
      (socialImpact * 10 * 0.25)
    );

    // Çəkili ortalama
    const overallScore = Math.round(
      (financialScore * 0.4) +
      (managementScore * 0.2) +
      (marketScore * 0.2) +
      (innovationScore * 0.1) +
      (legalScore * 0.1)
    );

    // Rating təyin et
    let rating = '';
    let recommendations: string[] = [];

    if (overallScore >= 80) {
      rating = 'Çox Cəlbedici (AAA)';
      recommendations = [
        'Yüksək investisiya potensialı',
        'Güclü maliyyə göstəriciləri',
        'Stabil bazar mövqeyi'
      ];
    } else if (overallScore >= 65) {
      rating = 'Cəlbedici (AA)';
      recommendations = [
        'Yaxşı investisiya fürsəti',
        'Bəzi sahələrdə təkmilləşdirmə ehtiyacı',
        'Orta müddətli perspektiv'
      ];
    } else if (overallScore >= 50) {
      rating = 'Orta (A)';
      recommendations = [
        'Diqqətli investisiya tələb olunur',
        'Risk faktorlarının detallı təhlili lazımdır',
        'Potensial mövcuddur, lakin risklidir'
      ];
    } else {
      rating = 'Aşağı Cəlbedicilik (B)';
      recommendations = [
        'Yüksək risk səviyyəsi',
        'Fundamental problemlərin həlli lazımdır',
        'İnvestisiya tövsiyə olunmur'
      ];
    }

    setResult({
      overallScore,
      breakdown: {
        financial: Math.round(financialScore),
        management: Math.round(managementScore),
        market: Math.round(marketScore),
        innovation: Math.round(innovationScore),
        legal: Math.round(legalScore)
      },
      rating,
      recommendations
    });
  };

  const handleInputChange = (field: keyof InvestmentInputs, value: NumOrEmpty) => {
    // Boş bırakma (""), 0’a zorlamaz; kullanıcı sayıyı tamamen sildiyse state’i '' tutarız.
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">📈 İnvestisiya Cəlbedicilik İndeksi</h2>
        <p className="text-gray-600">Şirkətinizin investisiya cəlbediciliyini qiymətləndirin</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sol tərəf - Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Maliyyə Göstəriciləri */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">💰 Maliyyə Göstəriciləri (40%)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gəlir (Manat)</label>
                <input
                  type="number"
                  value={inputs.revenue}
                  onChange={(e) => handleInputChange('revenue', e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mənfəət Marjası (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.profitMargin}
                  onChange={(e) => handleInputChange('profitMargin', e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Borc/Kapital Nisbəti</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.debtToEquity}
                  onChange={(e) => handleInputChange('debtToEquity', e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cari Likvidlik Nisbəti</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.currentRatio}
                  onChange={(e) => handleInputChange('currentRatio', e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ROE (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.roe}
                  onChange={(e) => handleInputChange('roe', e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* İdarəetmə Keyfiyyəti */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-800 mb-4">🏛️ İdarəetmə Keyfiyyəti (20%)</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Menecmentin Təcrübəsi (illə)</label>
                <input
                  type="number"
                  value={inputs.managementExperience}
                  onChange={(e) => handleInputChange('managementExperience', e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Bazar Potensialı */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">📊 Bazar Potensialı (20%)</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bazar Həcmi (Manat)</label>
                <input
                  type="number"
                  value={inputs.marketSize}
                  onChange={(e) => handleInputChange('marketSize', e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bazar Artım Tempı (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.marketGrowthRate}
                  onChange={(e) => handleInputChange('marketGrowthRate', e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">İxrac Potensialı (manat)</label>
                <input
                  type="number"
                  value={inputs.exportPotential}
                  onChange={(e) => handleInputChange('exportPotential', e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* İnnovasiya və ESG */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-800 mb-4">🔬 İnnovasiya (10%)</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">R&D İnvestisiyası (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.rdInvestment}
                    onChange={(e) => handleInputChange('rdInvestment', e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patent Sayı</label>
                  <input
                    type="number"
                    value={inputs.patentsCount}
                    onChange={(e) => handleInputChange('patentsCount', e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Texnologiya Səviyyəsi (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={inputs.technologyLevel}
                    onChange={(e) => handleInputChange('technologyLevel', Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">{inputs.technologyLevel}/10</span>
                </div>
              </div>
            </div>

           
          </div>

          <button
            onClick={calculateScore}
            className="w-full bg-primary text-white py-4 rounded-lg font-bold text-xl hover:bg-primary/90 transition-colors"
          >
            🎯 İnvestisiya Cəlbediciliyini Hesabla
          </button>
        </div>

        {/* Sağ tərəf - Nəticələr */}
        <div className="lg:col-span-1">
          {result ? (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Ümumi Bal */}
              <div className="bg-primary/5 p-6 rounded-xl text-center">
                <h3 className="text-2xl font-bold text-primary mb-4">Ümumi İndeks</h3>
                <div className="text-5xl font-bold text-primary mb-2">{result.overallScore}</div>
                <div className="text-lg text-gray-600 mb-4">/100</div>
                <div className={`px-4 py-2 rounded-full font-semibold ${result.overallScore >= 80 ? 'bg-green-100 text-green-800' :
                    result.overallScore >= 65 ? 'bg-blue-100 text-blue-800' :
                      result.overallScore >= 50 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                  }`}>
                  {result.rating}
                </div>
              </div>

              {/* Breakdown */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="text-lg font-semibold mb-4">Təfərrüat</h4>
                <div className="space-y-3">
                  {Object.entries(result.breakdown).map(([key, value]) => {
                    const labels = {
                      financial: 'Maliyyə',
                      management: 'İdarəetmə',
                      market: 'Bazar',
                      innovation: 'İnnovasiya',
                      legal: 'Hüquqi & ESG'
                    };
                    return (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-gray-600">{labels[key as keyof typeof labels]}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-500"
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <span className="font-medium">{value}/100</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tövsiyələr */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="text-lg font-semibold mb-4">Tövsiyələr</h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-gray-600">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12C17 14.76 14.76 17 12 17S7 14.76 7 12 9.24 7 12 7 17 9.24 17 12ZM12 9C10.34 9 9 10.34 9 12S10.34 15 12 15 15 13.66 15 12 13.66 9 12 9Z" />
                </svg>
                <p className="text-lg">Məlumatları daxil edib<br />İndeksi hesablayın</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentAttractivenessCalculator;