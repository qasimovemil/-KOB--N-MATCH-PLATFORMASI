// src/components/RiskCalculator.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RiskScore from './RiskScore';

interface RiskInputs {
  // Maliyyə göstəriciləri
  aktivler: number;
  menfeət: number;
  borcKapitalNisbeti: number;
  likvidlik: number;
  rentabellik: number;
  
  // Qeyri-maliyyə göstəriciləri
  sirketYasi: number;
  menecmentTecrubesi: number;
  sektorRiski: number;
  ixracPotensiali: number;
  innovasiyaBalı: number;
  esgFaktorlari: number;
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

  // Risk hesablama formulası
  const calculateRiskScore = (): number => {
    // Çəkilər (ümumi 100%)
    const weights = {
      maliyye: 0.4,      // 40%
      idareEtme: 0.2,    // 20%
      bazarPotensiali: 0.2, // 20%
      innovasiya: 0.1,   // 10%
      esg: 0.1          // 10%
    };

    // Maliyyə balı (1-5 arası)
    const maliyyeBali = Math.min(5, Math.max(1, 
      (inputs.aktivler / 1000000 * 0.3) + 
      (inputs.menfeət / 100000 * 0.3) + 
      (Math.max(0, 5 - inputs.borcKapitalNisbeti) * 0.2) +
      (inputs.likvidlik * 0.1) +
      (inputs.rentabellik / 20 * 0.1)
    ));

    // İdarəetmə balı
    const idareBali = Math.min(5, Math.max(1,
      (inputs.sirketYasi / 10 * 0.4) +
      (inputs.menecmentTecrubesi / 10 * 0.6)
    ));

    // Bazar potensialı balı
    const bazarBali = Math.min(5, Math.max(1,
      (Math.max(0, 6 - inputs.sektorRiski) * 0.7) +
      (inputs.ixracPotensiali / 10 * 0.3)
    ));

    // İnnovasiya balı
    const innovasiyaBaliNormalized = Math.min(5, Math.max(1, inputs.innovasiyaBalı));

    // ESG balı
    const esgBaliNormalized = Math.min(5, Math.max(1, inputs.esgFaktorlari));

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

  const handleInputChange = (field: keyof RiskInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setShowResult(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">KOS Risk Hesablaıcısı</h2>
        <p className="text-gray-600">Şirkətinizin risk profilini hesablayın</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Sol tərəf - Form */}
        <div className="space-y-6">
          {/* Maliyyə Göstəriciləri */}
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-primary mb-4">💰 Maliyyə Göstəriciləri</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aktivlərin Həcmi (Manat)
                </label>
                <input
                  type="number"
                  value={inputs.aktivler}
                  onChange={(e) => handleInputChange('aktivler', Number(e.target.value))}
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
                  onChange={(e) => handleInputChange('menfeət', Number(e.target.value))}
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
                  onChange={(e) => handleInputChange('borcKapitalNisbeti', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                  placeholder="0.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Likvidlik Nisbəti (1-10)
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
                  onChange={(e) => handleInputChange('rentabellik', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                  placeholder="0.0"
                />
              </div>
            </div>
          </div>

          {/* Qeyri-maliyyə Göstəriciləri */}
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-primary mb-4">📊 Şirkət Məlumatları</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şirkətin Yaşı (il)
                </label>
                <input
                  type="number"
                  value={inputs.sirketYasi}
                  onChange={(e) => handleInputChange('sirketYasi', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Menecment Təcrübəsi (1-10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={inputs.menecmentTecrubesi}
                  onChange={(e) => handleInputChange('menecmentTecrubesi', Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{inputs.menecmentTecrubesi}/10</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sektor Risk Səviyyəsi (1-5)
                </label>
                <select
                  value={inputs.sektorRiski}
                  onChange={(e) => handleInputChange('sektorRiski', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                >
                  <option value={1}>1 - Çox Sabit</option>
                  <option value={2}>2 - Sabit</option>
                  <option value={3}>3 - Orta</option>
                  <option value={4}>4 - Riskli</option>
                  <option value={5}>5 - Çox Riskli</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İxrac Potensialı (1-10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={inputs.ixracPotensiali}
                  onChange={(e) => handleInputChange('ixracPotensiali', Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{inputs.ixracPotensiali}/10</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İnnovasiya Balı (1-5)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={inputs.innovasiyaBalı}
                  onChange={(e) => handleInputChange('innovasiyaBalı', Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{inputs.innovasiyaBalı}/5</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors"
          >
            🎯 Risk Balını Hesabla
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
            </motion.div>
          ) : (
            <div className="text-center text-gray-400">
              <svg className="w-32 h-32 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L9 7V9C9 10.1 9.9 11 11 11V16L7.5 15.5C6.7 15.3 6.2 14.6 6 13.8L4.4 8.2C4.1 7.1 4.7 6 5.8 5.7C6.9 5.4 8 6 8.3 7.1L9.5 11.5L11 11V9C11 7.9 11.9 7 13 7H15C16.1 7 17 7.9 17 9V11L18.5 11.5L19.7 7.1C20 6 21.1 5.4 22.2 5.7C23.3 6 23.9 7.1 23.6 8.2L22 13.8C21.8 14.6 21.3 15.3 20.5 15.5L17 16V11C17 9.9 16.1 9 15 9H21Z"/>
              </svg>
              <p className="text-lg">Məlumatları daxil edib<br/>Risk Balını hesablayın</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskCalculator;