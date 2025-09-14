// src/components/RiskScore.tsx

import React from 'react';
import { motion } from 'framer-motion';

interface RiskScoreProps {
  score: number; // 0-100 arası
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
}

interface RiskFactors {
  finansal: number;
  kredit: number;
  bazar: number;
  idare: number;
  innovasiya: number;
}

const RiskScore: React.FC<RiskScoreProps> = ({ 
  score, 
  size = 'medium',
  showDetails = false 
}) => {
  // Risk səviyyəsini təyin et
  const getRiskLevel = (score: number) => {
    if (score <= 30) return { level: 'Aşağı Risk', color: 'text-green-600', bgColor: 'bg-green-100', strokeColor: '#10B981' };
    if (score <= 60) return { level: 'Orta Risk', color: 'text-yellow-600', bgColor: 'bg-yellow-100', strokeColor: '#F59E0B' };
    return { level: 'Yüksək Risk', color: 'text-red-600', bgColor: 'bg-red-100', strokeColor: '#EF4444' };
  };

  const riskInfo = getRiskLevel(score);
  
  // Ölçü ayarları
  const sizeConfig = {
    small: { radius: 40, strokeWidth: 6, fontSize: 'text-lg', containerSize: 'w-24 h-24' },
    medium: { radius: 60, strokeWidth: 8, fontSize: 'text-xl', containerSize: 'w-32 h-32' },
    large: { radius: 80, strokeWidth: 10, fontSize: 'text-2xl', containerSize: 'w-40 h-40' }
  };

  const config = sizeConfig[size];
  const circumference = 2 * Math.PI * config.radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Nümunə risk faktorları
  const riskFactors: RiskFactors = {
    finansal: Math.max(0, Math.min(100, score + Math.random() * 20 - 10)),
    kredit: Math.max(0, Math.min(100, score + Math.random() * 15 - 7)),
    bazar: Math.max(0, Math.min(100, score + Math.random() * 25 - 12)),
    idare: Math.max(0, Math.min(100, score + Math.random() * 18 - 9)),
    innovasiya: Math.max(0, Math.min(100, score + Math.random() * 22 - 11))
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Dairəvi Progress Bar */}
      <div className="relative">
        <svg 
          className={config.containerSize} 
          viewBox={`0 0 ${(config.radius + config.strokeWidth) * 2} ${(config.radius + config.strokeWidth) * 2}`}
        >
          {/* Arxa fon */}
          <circle
            cx={config.radius + config.strokeWidth}
            cy={config.radius + config.strokeWidth}
            r={config.radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={config.strokeWidth}
          />
          
          {/* Progress */}
          <motion.circle
            cx={config.radius + config.strokeWidth}
            cy={config.radius + config.strokeWidth}
            r={config.radius}
            fill="none"
            stroke={riskInfo.strokeColor}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${config.radius + config.strokeWidth} ${config.radius + config.strokeWidth})`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        
        {/* Mərkəzdəki mətn */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className={`${config.fontSize} font-bold ${riskInfo.color}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-gray-500">/100</span>
        </div>
      </div>

      {/* Risk səviyyəsi */}
      <div className={`px-4 py-2 rounded-full ${riskInfo.bgColor}`}>
        <span className={`font-semibold ${riskInfo.color}`}>
          {riskInfo.level}
        </span>
      </div>

      {/* Ətraflı məlumatlar */}
      {showDetails && (
        <motion.div 
          className="w-full max-w-md space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <h4 className="font-semibold text-gray-800 text-center">Risk Faktorları</h4>
          
          {Object.entries(riskFactors).map(([key, value]) => {
            const factorName = {
              finansal: 'Maliyyə Sabitliyi',
              kredit: 'Kredit Tarixçəsi', 
              bazar: 'Bazar Riski',
              idare: 'İdarəetmə',
              innovasiya: 'İnnovasiya'
            };

            return (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{factorName[key as keyof typeof factorName]}</span>
                  <span className="font-medium">{Math.round(value)}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-primary to-primary/80"
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default RiskScore;