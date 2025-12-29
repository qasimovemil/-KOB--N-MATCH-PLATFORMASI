// src/components/InvestmentAttractivenessCalculator.tsx

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiTrendingUp,
  FiDollarSign,
  FiUsers,
  FiBarChart2,
  FiZap,
  FiTarget,
  FiPieChart,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';

type NumOrEmpty = number | '';

interface InvestmentInputs {
  // Maliyyə göstəriciləri (40%)
  revenue: NumOrEmpty; // Gəlir (son 3 il ortalaması) — manat
  profitMargin: NumOrEmpty; // Mənfəət marjası (%)
  debtToEquity: NumOrEmpty; // Borc/Kapital nisbəti
  currentRatio: NumOrEmpty; // Cari likvidlik nisbəti
  roe: NumOrEmpty; // Kapital rentabelliyi (%)

  // İdarəetmə keyfiyyəti (20%)
  managementExperienceYears: NumOrEmpty; // Menecmentin təcrübəsi (illə)
  corporateGovernance: NumOrEmpty; // Korporativ idarəetmə (1-10)
  financialTransparency: NumOrEmpty; // Maliyyə şəffaflığı (1-10)

  // Bazar potensialı (20%)
  competitivePosition: NumOrEmpty; // Rəqabət mövqeyi (1-10)
  exportVolume: NumOrEmpty; // İxrac həcmi (manat)

  // İnnovasiya və texnologiya (10%)
  innovationInvestment: NumOrEmpty; // İnnovativ məhsullara investisiya (manatla)
  patentsCount: NumOrEmpty; // Patent sayı

  // Hüquqi və ESG faktorları (10%)
  legalCompliance: NumOrEmpty; // Qanun pozuntularının sayı
  esgScore: NumOrEmpty; // ESG balı (1-10)
  socialImpact: NumOrEmpty; // Sosial təsir (1-10)
}

type Result = {
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
};

const InvestmentAttractivenessCalculator = () => {
  const [inputs, setInputs] = useState<InvestmentInputs>({
    revenue: 0,
    profitMargin: 0,
    debtToEquity: 0,
    currentRatio: 1,
    roe: 0,

    managementExperienceYears: 5,
    corporateGovernance: 5,
    financialTransparency: 5,

    competitivePosition: 5,
    exportVolume: 0,

    innovationInvestment: 0,
    patentsCount: 0,

    legalCompliance: 0,
    esgScore: 5,
    socialImpact: 5,
  });

  const [result, setResult] = useState<Result | null>(null);
  const [hoverKey, setHoverKey] = useState<string | null>(null);

  const toNum = (v: NumOrEmpty) => (v === '' || Number.isNaN(Number(v)) ? 0 : Number(v));

  const tooltips: Record<string, { formula: string; desc: string }> = useMemo(
    () => ({
      REVENUE: {
        formula: 'Son 3 ilin orta gəliri (manat)',
        desc: 'Şirkətin ölçüsü və sabitliyi barədə ilkin siqnaldır; qiymətləndirmədə loqarifmik normallaşdırma istifadə olunur.',
      },
      PROFIT_MARGIN: {
        formula: '(Xalis mənfəət / Gəlir) × 100',
        desc: 'Mənfəət marjası şirkətin satış gəlirlərindən əldə etdiyi xalis mənfəətin faizidir.',
      },
      DEBT_EQUITY: {
        formula: 'Ümumi Borclar / Öz Kapital',
        desc: 'Borc/Kapital nisbəti şirkətin borc yükünü öz kapitalına nisbətdə göstərir; yüksək dəyər daha yüksək maliyyə riski deməkdir.',
      },
      CURRENT_RATIO: {
        formula: 'Dövriyyə Aktivləri / Qısamüddətli Öhdəliklər',
        desc: 'Cari likvidlik qısamüddətli öhdəlikləri qarşılamaq üçün mövcud aktivlərin nə qədər olduğunu göstərir; 1-dən yuxarı yaxşı hesab olunur.',
      },
      ROE: {
        formula: '(Xalis Mənfəət / Öz Kapital) × 100',
        desc: 'Öz kapitala gəlir (ROE) sərmayəçilərin qoyduğu kapitaldan əldə olunan gəliri göstərir.',
      },
      MGMT_YEARS: {
        formula: 'Menecmentin ümumi təcrübəsi (illə)',
        desc: 'Menecment komandasının təcrübə ili çox olduqca idarəetmə riski azalır və bal yüksəlir.',
      },
      EXPORT_VOL: {
        formula: 'İllik ixrac həcmi (manat)',
        desc: 'İxrac həcmi bazar genişlənməsi və valyuta gəliri baxımından müsbət faktor sayılır (müəyyən limitlə normallaşdırılır).',
      },
      INNOV_INVEST: {
        formula: 'İnnovativ məhsullara investisiya (manatla)',
        desc: 'İnnovasiya üçün ayrılan vəsait artdıqca innovasiya balı yüksəlir (müəyyən limitlə normallaşdırılır).',
      },
      LEGAL: {
        formula: 'Qanun pozuntularının sayı',
        desc: 'Pozuntular nə qədər azdırsa, bal bir o qədər yüksəkdir.',
      },
    }),
    []
  );

  const InfoIcon: React.FC<{ k: string }> = ({ k }) => (
    <span
      className="relative inline-flex items-center ml-2 cursor-help"
      onMouseEnter={() => setHoverKey(k)}
      onMouseLeave={() => setHoverKey(null)}
    >
      <FiInfo className="w-4 h-4 text-gray-400 hover:text-primary transition-colors" />
      {hoverKey === k && (
        <span className="absolute left-0 top-full mt-1 z-50 w-72 bg-white border border-gray-300 rounded-lg shadow-lg p-3 text-xs text-gray-700">
          <div className="font-semibold text-primary mb-1">Formula:</div>
          <div className="mb-2">{tooltips[k]?.formula}</div>
          <div className="font-semibold text-primary mb-1">İzah:</div>
          <div>{tooltips[k]?.desc}</div>
        </span>
      )}
    </span>
  );

  const handleInputChange = (field: keyof InvestmentInputs, value: NumOrEmpty) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const getBadgeClass = (score: number) =>
    score >= 80
      ? 'bg-green-100 text-green-800'
      : score >= 65
      ? 'bg-blue-100 text-blue-800'
      : score >= 50
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800';

  const calculateScore = () => {
    // Maliyyə göstəriciləri balı (40%)
    const revenue = toNum(inputs.revenue);
    const profitMargin = toNum(inputs.profitMargin);
    const debtToEquity = toNum(inputs.debtToEquity);
    const currentRatio = toNum(inputs.currentRatio);
    const roe = toNum(inputs.roe);

    const financialScore = Math.min(
      100,
      (Math.log(revenue + 1) / Math.log(10_000_000)) * 20 +
        (Math.min(profitMargin, 30) / 30) * 25 +
        (Math.max(0, 3 - debtToEquity) / 3) * 20 +
        (Math.min(currentRatio, 3) / 3) * 15 +
        (Math.min(roe, 25) / 25) * 20
    );

    // İdarəetmə balı (20%) — illə input
    const mgmtYears = toNum(inputs.managementExperienceYears);
    const corporateGovernance = toNum(inputs.corporateGovernance);
    const financialTransparency = toNum(inputs.financialTransparency);

    // Menecment ili üçün 0..20 il aralığını 1..10 bal kimi normallaşdırırıq
    const mgmtYearsScore10 = Math.min(mgmtYears, 20) / 20 * 10;

    const managementScore =
      mgmtYearsScore10 * 10 * 0.4 + corporateGovernance * 10 * 0.35 + financialTransparency * 10 * 0.25;

    // Bazar potensialı balı (20%) — ixrac həcmi
    const competitivePosition = toNum(inputs.competitivePosition);
    const exportVolume = toNum(inputs.exportVolume);

    const marketScore = Math.min(
      100,
      competitivePosition * 10 * 0.4 + (Math.min(exportVolume, 500_000) / 500_000) * 60
    );

    // İnnovasiya balı (10%) — innovativ məhsullara investisiya (manatla)
    const innovationInvestment = toNum(inputs.innovationInvestment);
    const patentsCount = toNum(inputs.patentsCount);

    const innovationScore = Math.min(
      100,
      (Math.min(innovationInvestment, 500_000) / 500_000) * 60 + (Math.min(patentsCount, 10) / 10) * 40
    );

    // Hüquqi və ESG balı (10%)
    const legalCompliance = toNum(inputs.legalCompliance);
    const esgScore = toNum(inputs.esgScore);
    const socialImpact = toNum(inputs.socialImpact);

    const legalScore = Math.min(
      100,
      (Math.max(0, 10 - legalCompliance) / 10) * 40 + esgScore * 10 * 0.35 + socialImpact * 10 * 0.25
    );

    const overallScore = Math.round(
      financialScore * 0.4 + managementScore * 0.2 + marketScore * 0.2 + innovationScore * 0.1 + legalScore * 0.1
    );

    let rating = '';
    let recommendations: string[] = [];

    if (overallScore >= 80) {
      rating = 'Çox Cəlbedici (AAA)';
      recommendations = ['Yüksək investisiya potensialı', 'Güclü maliyyə göstəriciləri', 'Stabil bazar mövqeyi'];
    } else if (overallScore >= 65) {
      rating = 'Cəlbedici (AA)';
      recommendations = ['Yaxşı investisiya fürsəti', 'Bəzi sahələrdə təkmilləşdirmə ehtiyacı', 'Orta müddətli perspektiv'];
    } else if (overallScore >= 50) {
      rating = 'Orta (A)';
      recommendations = ['Diqqətli investisiya tələb olunur', 'Risk faktorlarının detallı təhlili lazımdır', 'Potensial mövcuddur, lakin risklidir'];
    } else {
      rating = 'Aşağı Cəlbedicilik (B)';
      recommendations = ['Yüksək risk səviyyəsi', 'Fundamental problemlərin həlli lazımdır', 'İnvestisiya tövsiyə olunmur'];
    }

    setResult({
      overallScore,
      breakdown: {
        financial: Math.round(financialScore),
        management: Math.round(managementScore),
        market: Math.round(marketScore),
        innovation: Math.round(innovationScore),
        legal: Math.round(legalScore),
      },
      rating,
      recommendations,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2 inline-flex items-center gap-2 justify-center">
          <FiTrendingUp className="w-7 h-7" />
          İnvestisiya Cəlbedicilik İndeksi
        </h2>
        <p className="text-gray-600">Şirkətinizin investisiya cəlbediciliyini qiymətləndirin</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sol tərəf - Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Maliyyə Göstəriciləri */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4 inline-flex items-center gap-2">
              <FiDollarSign className="w-5 h-5" />
              Maliyyə Göstəriciləri
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gəlir (son 3 il ortalaması, manat) <InfoIcon k="REVENUE" />
                </label>
                <input
                  type="number"
                  value={inputs.revenue}
                  onChange={(e) => handleInputChange('revenue', e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mənfəət marjası (%) <InfoIcon k="PROFIT_MARGIN" />
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.profitMargin}
                  onChange={(e) =>
                    handleInputChange('profitMargin', e.target.value === '' ? '' : Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Borc/Kapital nisbəti <InfoIcon k="DEBT_EQUITY" />
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.debtToEquity}
                  onChange={(e) =>
                    handleInputChange('debtToEquity', e.target.value === '' ? '' : Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cari Likvidlik Nisbəti <InfoIcon k="CURRENT_RATIO" />
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.currentRatio}
                  onChange={(e) =>
                    handleInputChange('currentRatio', e.target.value === '' ? '' : Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ROE (%) <InfoIcon k="ROE" />
                </label>
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
            <h3 className="text-xl font-semibold text-green-800 mb-4 inline-flex items-center gap-2">
              <FiUsers className="w-5 h-5" />
              İdarəetmə Keyfiyyəti
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Menecmentin təcrübəsi (illə) <InfoIcon k="MGMT_YEARS" />
                </label>
                <input
                  type="number"
                  min={0}
                  value={inputs.managementExperienceYears}
                  onChange={(e) =>
                    handleInputChange(
                      'managementExperienceYears',
                      e.target.value === '' ? '' : Number(e.target.value)
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Korporativ idarəetmə (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={inputs.corporateGovernance}
                  onChange={(e) =>
                    handleInputChange('corporateGovernance', e.target.value === '' ? '' : Number(e.target.value))
                  }
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{inputs.corporateGovernance}/10</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maliyyə şəffaflığı (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={inputs.financialTransparency}
                  onChange={(e) =>
                    handleInputChange('financialTransparency', e.target.value === '' ? '' : Number(e.target.value))
                  }
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{inputs.financialTransparency}/10</span>
              </div>
            </div>
          </div>

          {/* Bazar Potensialı */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-800 mb-4 inline-flex items-center gap-2">
              <FiBarChart2 className="w-5 h-5" />
              Bazar Potensialı
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rəqabət Mövqeyi (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={inputs.competitivePosition}
                  onChange={(e) =>
                    handleInputChange('competitivePosition', e.target.value === '' ? '' : Number(e.target.value))
                  }
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{inputs.competitivePosition}/10</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İxrac həcmi (manat) <InfoIcon k="EXPORT_VOL" />
                </label>
                <input
                  type="number"
                  value={inputs.exportVolume}
                  onChange={(e) =>
                    handleInputChange('exportVolume', e.target.value === '' ? '' : Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* İnnovasiya və Hüquqi/ESG */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* İnnovasiya */}
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-800 mb-4 inline-flex items-center gap-2">
                <FiZap className="w-5 h-5" />
                İnnovasiya
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İnnovativ məhsullara investisiya (manatla) <InfoIcon k="INNOV_INVEST" />
                  </label>
                  <input
                    type="number"
                    value={inputs.innovationInvestment}
                    onChange={(e) =>
                      handleInputChange('innovationInvestment', e.target.value === '' ? '' : Number(e.target.value))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patent sayı</label>
                  <input
                    type="number"
                    value={inputs.patentsCount}
                    onChange={(e) =>
                      handleInputChange('patentsCount', e.target.value === '' ? '' : Number(e.target.value))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Hüquqi və ESG */}
            <div className="bg-rose-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-rose-800 mb-4 inline-flex items-center gap-2">
                <FiPieChart className="w-5 h-5" />
                Hüquqi & ESG
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qanun pozuntularının sayı <InfoIcon k="LEGAL" />
                  </label>
                  <input
                    type="number"
                    value={inputs.legalCompliance}
                    onChange={(e) =>
                      handleInputChange('legalCompliance', e.target.value === '' ? '' : Number(e.target.value))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ESG balı (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={inputs.esgScore}
                    onChange={(e) => handleInputChange('esgScore', e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">{inputs.esgScore}/10</span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sosial təsir (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={inputs.socialImpact}
                    onChange={(e) =>
                      handleInputChange('socialImpact', e.target.value === '' ? '' : Number(e.target.value))
                    }
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">{inputs.socialImpact}/10</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={calculateScore}
            className="w-full bg-primary text-white py-4 rounded-lg font-bold text-xl hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
          >
            <FiTarget className="w-6 h-6" />
            İnvestisiya Cəlbediciliyini Hesabla
          </button>
        </div>

        {/* Sağ tərəf - Nəticələr */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 inline-flex items-center gap-2">
              <FiCheckCircle className="w-5 h-5" />
              Nəticə
            </h3>

            {!result ? (
              <div className="text-gray-600 text-sm">
                Məlumatları daxil edib <span className="font-semibold">Hesabla</span> düyməsinə basın.
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-primary">{result.overallScore}</div>
                  <div className="text-sm text-gray-600 mt-1">Ümumi bal</div>
                  <div className="mt-2 inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold bg-white border border-gray-200">
                    {result.rating}
                  </div>
                </div>

                <div className="space-y-2">
                  {(
                    [
                      ['financial', 'Maliyyə'],
                      ['management', 'İdarəetmə'],
                      ['market', 'Bazar'],
                      ['innovation', 'İnnovasiya'],
                      ['legal', 'Hüquqi & ESG'],
                    ] as const
                  ).map(([k, label]) => {
                    const score = result.breakdown[k];
                    return (
                      <div key={k} className="flex items-center justify-between gap-3">
                        <div className="text-sm text-gray-700">{label}</div>
                        <div className={`text-xs font-semibold px-2 py-1 rounded ${getBadgeClass(score)}`}>{score}</div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-800 mb-2">Tövsiyələr</div>
                  <ul className="space-y-1">
                    {result.recommendations.map((r, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="mt-0.5 text-primary">
                          <FiCheckCircle />
                        </span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentAttractivenessCalculator;
