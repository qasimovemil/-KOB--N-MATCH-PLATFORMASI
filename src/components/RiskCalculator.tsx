// src/components/RiskCalculator.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RiskScore from './RiskScore';
import { FiDollarSign, FiBarChart2, FiTarget, FiSliders } from 'react-icons/fi';

type NumOrEmpty = number | '';

interface RiskInputs {
  // Maliyyə göstəriciləri
  aktivler: NumOrEmpty;
  menfeət: NumOrEmpty;
  borcKapitalNisbeti: NumOrEmpty;
  likvidlik: NumOrEmpty;
  rentabellik: NumOrEmpty;

  // Qeyri-maliyyə göstəriciləri
  sirketYasi: NumOrEmpty;
  menecmentTecrubesi: NumOrEmpty;
  sektorRiski: NumOrEmpty;
  ixracPotensiali: NumOrEmpty;
  innovasiyaBalı: NumOrEmpty;
  esgFaktorlari: NumOrEmpty;
}

const RiskCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<RiskInputs>({
    aktivler: 0,
    menfeət: 0,
    borcKapitalNisbeti: 0,
    likvidlik: 0,
    rentabellik: 0,
    sirketYasi: 0,
    menecmentTecrubesi: 0,
    sektorRiski: 3,
    ixracPotensiali: 0,
    innovasiyaBalı: 0,
    esgFaktorlari: 3
  });

  const [calculatedScore, setCalculatedScore] = useState<number>(0);
  const [showResult, setShowResult] = useState(false);

  // Hesablanmış risk balına görə şərh və tövsiyələr
  function getRiskAdvisory(score: number) {
    // 0 (çox aşağı risk) → 100 (çox yüksək risk)
    if (score <= 20) {
      return {
        level: 'Çox Aşağı Risk',
        tone: 'positive',
        classes: 'border-green-200 bg-green-50 text-green-800',
        advice: 'Risk səviyyəniz çox aşağıdır. Cari strategiyanı qoruyun və maliyyə intizamını davam etdirin.',
      };
    }
    if (score <= 40) {
      return {
        level: 'Aşağı Risk',
        tone: 'positive',
        classes: 'border-emerald-200 bg-emerald-50 text-emerald-800',
        advice: 'Ümumi vəziyyət yaxşıdır. Kiçik optimizasiyalarla daha da gücləndirə bilərsiniz.',
      };
    }
    if (score <= 60) {
      return {
        level: 'Orta Risk',
        tone: 'neutral',
        classes: 'border-yellow-200 bg-yellow-50 text-yellow-800',
        advice: 'Diqqətli olmaq lazımdır. Seçilmiş layihə/parametrləri təkmilləşdirərək riski endirin.',
      };
    }
    if (score <= 80) {
      return {
        level: 'Yüksək Risk',
        tone: 'warning',
        classes: 'border-orange-200 bg-orange-50 text-orange-800',
        advice: 'Risk səviyyəsi yüksəkdir. Parametrləri yaxşılaşdırın və alternativ seçimləri nəzərdən keçirin.',
      };
    }
    return {
      level: 'Çox Yüksək Risk',
      tone: 'danger',
      classes: 'border-red-200 bg-red-50 text-red-800',
      advice: 'Risk çox yüksəkdir, tövsiyə edilmir. Lazım gələrsə bu seçimi dəyişin və daha təhlükəsiz alternativlərə baxın.',
    };
  }

  function buildRecommendations(score: number) {
    const recs: string[] = [];
    // Sadə qaydalarla 3-4 konkret tövsiyə
    if (toNum(inputs.borcKapitalNisbeti) > 3) recs.push('Borc/Kapital nisbətini azaldın (xərcləri optimizə edin, kapitalı gücləndirin).');
    if (toNum(inputs.likvidlik) < 5) recs.push('Likvidlik dərəcəsini artırın (nağd axınını və ehtiyatları yaxşılaşdırın).');
    if (toNum(inputs.rentabellik) < 10) recs.push('Rentabelliyi artırın (marjanı yüksəldin, səmərəliliyi artırın).');
    if (toNum(inputs.sektorRiski) >= 4) recs.push('Daha aşağı riskli sektor/seqmentləri nəzərdən keçirin.');
    if (toNum(inputs.esgFaktorlari) <= 2) recs.push('ESG göstəricilərini gücləndirin (idarəetmə, ekoloji və sosial siyasətlər).');
    if (toNum(inputs.menfeət) <= 0) recs.push('Mənfəətliliyi müsbətə çevirin (gəliri artırın, xərcləri azaldın).');
    if (toNum(inputs.innovasiyaBalı) < 5_000) recs.push('İnnovasiyaya investisiyanı artırın (R&D, texnoloji yüksəliş).');
    if (toNum(inputs.ixracPotensiali) < 10_000) recs.push('İxrac potensialını artırın (yeni bazarlar, satış kanalları).');
    if (toNum(inputs.sirketYasi) < 1 && toNum(inputs.menecmentTecrubesi) < 3) recs.push('Təcrübəli məsləhətçilər və idarəetmə dəstəyi ilə komandanı gücləndirin.');

    // Skora görə ümumi istiqamət
    if (score > 80) recs.unshift('Alternativ layihə və ya daha təhlükəsiz seçimlərə üstünlük verin.');
    else if (score > 60) recs.unshift('Parametrləri yaxşılaşdırmadan böyük öhdəliklərə girməyin.');
    else if (score >= 40) recs.unshift('Riskləri izləyin və hədəfli optimizasiyalar edin.');

    return recs.slice(0, 4);
  }

  // Risk hesablama formulası
  const toNum = (v: NumOrEmpty) => (v === '' || isNaN(Number(v)) ? 0 : Number(v));

  const calculateRiskScore = (): number => {
    // Yardımçı
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    // Çəkilər (ümumi 100%)
    const weights = {
      maliyye: 0.4,      // 40%
      idareEtme: 0.2,    // 20%
      bazarPotensiali: 0.2, // 20%
      innovasiya: 0.1,   // 10%
      esg: 0.1          // 10%
    };

    // Maliyyə balı (1-5 arası)
    const aktivler = toNum(inputs.aktivler);
    const menfeet = toNum(inputs.menfeət);
    const borcKapital = toNum(inputs.borcKapitalNisbeti);
    const likvidlik = toNum(inputs.likvidlik);
    const rentabellik = toNum(inputs.rentabellik);
    const maliyyeBali = Math.min(5, Math.max(1,
      (aktivler / 1_000_000 * 0.3) +
      (menfeet / 100_000 * 0.3) +
      (Math.max(0, 5 - borcKapital) * 0.2) +
      (likvidlik * 0.1) +
      (rentabellik / 20 * 0.1)
    ));

    // İdarəetmə balı (şirkət yaşı 0–30, təcrübə 1–25 miqyaslarında normallaşdırılır)
    const ageNorm = clamp01(toNum(inputs.sirketYasi) / 30);
    const expNorm = clamp01(toNum(inputs.menecmentTecrubesi) / 25);
    const idare0to1 = (ageNorm * 0.4) + (expNorm * 0.6);
    const idareBali = 1 + idare0to1 * 4; // 1–5

    // Bazar potensialı balı
    // sektorRiski: 1 (aşağı risk) → 5 (yüksək risk). 1 yaxşı, 5 pis → tərs çeviririk və 0–1 aralığına salırıq.
    const sektorSkoru01 = clamp01((6 - toNum(inputs.sektorRiski)) / 5);
    // ixracPotensiali: manat ilə. 0–500k aralığında 0–1-ə xəritələyirik (üstü 1-ə sıxılır)
    const ixracNorm = clamp01(toNum(inputs.ixracPotensiali) / 500_000);
    const bazar0to1 = (sektorSkoru01 * 0.7) + (ixracNorm * 0.3);
    const bazarBali = 1 + bazar0to1 * 4; // 1–5

    // İnnovasiya balı (manat ilə çəkilən xərclər) → 0–100k = 0–1
    const innovNorm = clamp01(toNum(inputs.innovasiyaBalı) / 100_000);
    const innovasiyaBaliNormalized = 1 + innovNorm * 4; // 1–5

    // ESG balı (1–5 arası)
    const esgBaliNormalized = Math.min(5, Math.max(1, toNum(inputs.esgFaktorlari)));

    // Çəkili ortalama hesablama
    const weightedScore =
      (maliyyeBali * weights.maliyye) +
      (idareBali * weights.idareEtme) +
      (bazarBali * weights.bazarPotensiali) +
      (innovasiyaBaliNormalized * weights.innovasiya) +
      (esgBaliNormalized * weights.esg);

    // 1-5 arası balı 0-100 arasına çevir (risk üçün tərsinə çevir)
    return Math.round((5 - weightedScore) * 25);
  };

  const handleCalculate = () => {
    const score = calculateRiskScore();
    setCalculatedScore(score);
    setShowResult(true);
  };

  const handleInputChange = (field: keyof RiskInputs, value: NumOrEmpty) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setShowResult(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
  <h2 className="text-3xl font-bold text-primary mb-2">KOS Risk Hesablayıcısı</h2>
        <p className="text-gray-600">Şirkətinizin risk profilini hesablayın</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Sol tərəf - Form */}
        <div className="space-y-6">
          {/* Maliyyə Göstəriciləri */}
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-primary mb-4 inline-flex items-center gap-2">
              <FiDollarSign className="w-5 h-5" />
              Maliyyə Göstəriciləri
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aktivlərin Həcmi (Manat)
                </label>
                <input
                  type="number"
                  value={inputs.aktivler}
                  onChange={(e) => handleInputChange('aktivler', e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İllik Mənfəət (Manat)
                </label>
                <input
                  type="number"
                  value={inputs.menfeət}
                  onChange={(e) => handleInputChange('menfeət', e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Borc/Kapital Nisbəti
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.borcKapitalNisbeti}
                  onChange={(e) => handleInputChange('borcKapitalNisbeti', e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                  placeholder="0.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Likvidlik dərəcəsi(%)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={inputs.likvidlik}
                  onChange={(e) => handleInputChange('likvidlik', Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{inputs.likvidlik}/10</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rentabellik (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.rentabellik}
                  onChange={(e) => handleInputChange('rentabellik', e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                  placeholder="0.0"
                />
              </div>
            </div>
          </div>

          {/* Qeyri-maliyyə Göstəriciləri */}
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-primary mb-4 inline-flex items-center gap-2">
              <FiBarChart2 className="w-5 h-5" />
              Şirkət Məlumatları
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şirkətin Yaşı (il)
                </label>
                <input
                  type="number"
                  value={inputs.sirketYasi}
                  onChange={(e) => handleInputChange('sirketYasi', e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Menecerin təcrübəsi (il)
                </label>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={inputs.menecmentTecrubesi}
                  onChange={(e) => handleInputChange('menecmentTecrubesi', Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{inputs.menecmentTecrubesi}/25</span>
              </div>

              {/* Sektor riski */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sektor Riski (1: Aşağı, 5: Yüksək)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={inputs.sektorRiski}
                  onChange={(e) => handleInputChange('sektorRiski', Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{inputs.sektorRiski}/5</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İxrac Potensialı (manat)
                </label>
                <input
                  type="number"
                  value={inputs.ixracPotensiali}
                  onChange={(e) => handleInputChange('ixracPotensiali', e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İnnovasiya çəkilən xərclər (Manatla)
                </label>
                <input
                  type="number"
                  value={inputs.innovasiyaBalı}
                  onChange={(e) => handleInputChange('innovasiyaBalı', e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
              </div>

              {/* ESG faktörləri */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ESG Faktorları (1–5)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={inputs.esgFaktorlari}
                  onChange={(e) => handleInputChange('esgFaktorlari', Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{inputs.esgFaktorlari}/5</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
          >
            <FiTarget className="w-5 h-5" />
            Risk Balını Hesabla
          </button>

        </div>

        {/* Sağ tərəf - Nəticə */}
        <div className="flex flex-col justify-center items-center">
          {showResult ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Risk Profili Nəticəsi</h3>
              <RiskScore score={calculatedScore} size="large" showDetails={true} />
              {/* Şərh və tövsiyələr */}
              <div className="mt-6 text-left">
                {(() => {
                  const adv = getRiskAdvisory(calculatedScore);
                  const recs = buildRecommendations(calculatedScore);
                  return (
                    <div className={`border rounded-lg p-4 ${adv.classes}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm uppercase tracking-wide opacity-80">Risk Səviyyəsi</div>
                          <div className="text-xl font-semibold">{adv.level}</div>
                        </div>
                        <span className="text-sm font-medium opacity-80">Bal: {calculatedScore}/100</span>
                      </div>
                      <p className="mt-3 font-medium">{adv.advice}</p>
                      {recs.length > 0 && (
                        <div className="mt-3">
                          <div className="text-sm font-semibold mb-2 opacity-80">Tövsiyələr:</div>
                          <ul className="list-disc pl-5 space-y-1">
                            {recs.map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-gray-400">
              <FiSliders className="w-32 h-32 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Məlumatları daxil edib<br />Risk Balını hesablayın</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskCalculator;