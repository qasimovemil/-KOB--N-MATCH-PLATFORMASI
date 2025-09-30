// src/components/AzerbaijanMap.tsx

import { motion } from 'framer-motion';

interface MapProps {
  selectedRegion: string;
  onRegionClick: (region: string) => void;
  regionData: Array<{
    region: string;
    riskScore: number;
  }>;
}

const AzerbaijanMap = ({ selectedRegion, onRegionClick, regionData }: MapProps) => {
  const getRiskColor = (riskScore: number) => {
    if (riskScore <= 30) return '#10b981'; // green
    if (riskScore <= 50) return '#f59e0b'; // yellow
    if (riskScore <= 70) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  const getRegionRisk = (regionName: string) => {
    const region = regionData.find(r => r.region === regionName);
    return region ? region.riskScore : 50;
  };

  return (
    <div className="w-full h-96 bg-gray-50 rounded-lg border border-gray-200 p-4">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 700"
        className="cursor-pointer"
      >
        {/* Həqiqi Azərbaycan xəritəsi - Ana ərazisi */}
        <motion.path
          d="M150 300 L180 250 L220 240 L280 220 L350 210 L420 200 L480 190 L540 180 L580 170 L620 165 L680 160 L720 170 L760 180 L800 200 L820 230 L840 270 L850 310 L860 350 L850 390 L830 430 L800 460 L760 480 L720 490 L680 500 L640 510 L600 520 L560 530 L520 540 L480 550 L440 560 L400 570 L360 580 L320 590 L280 600 L240 610 L200 600 L160 580 L130 550 L110 510 L100 470 L105 430 L115 390 L125 350 L135 320 Z"
          fill={getRiskColor(getRegionRisk('Bakı'))}
          stroke="#374151"
          strokeWidth="2"
          onClick={() => onRegionClick('Bakı')}
          whileHover={{ scale: 1.02, opacity: 0.8 }}
          className={`cursor-pointer transition-all ${
            selectedRegion === 'Bakı' ? 'stroke-4 stroke-primary' : ''
          }`}
        />

        {/* Naxçıvan Muxtar Respublikası */}
        <motion.path
          d="M50 450 L90 440 L130 445 L160 460 L180 480 L170 500 L150 520 L120 530 L90 525 L60 510 L40 490 L35 470 Z"
          fill={getRiskColor(getRegionRisk('Gəncə-Qazax'))}
          stroke="#374151"
          strokeWidth="2"
          onClick={() => onRegionClick('Gəncə-Qazax')}
          whileHover={{ scale: 1.02, opacity: 0.8 }}
          className={`cursor-pointer transition-all ${
            selectedRegion === 'Gəncə-Qazax' ? 'stroke-4 stroke-primary' : ''
          }`}
        />

        {/* Regionları daha dəqiq təqdim edək */}
        {/* Bakı regionu - şərq sahil */}
        <motion.path
          d="M620 280 L680 270 L720 280 L760 300 L780 330 L770 360 L750 380 L720 390 L680 400 L640 410 L610 390 L600 360 L605 330 L610 300 Z"
          fill={getRiskColor(getRegionRisk('Bakı'))}
          stroke="#374151"
          strokeWidth="2"
          onClick={() => onRegionClick('Bakı')}
          whileHover={{ scale: 1.02, opacity: 0.8 }}
          className={`cursor-pointer transition-all ${
            selectedRegion === 'Bakı' ? 'stroke-4 stroke-primary' : ''
          }`}
        />
        
        {/* Gəncə-Qazax regionu - qərb */}
        <motion.path
          d="M200 280 L260 270 L310 275 L350 290 L380 310 L370 340 L350 360 L320 370 L280 375 L240 370 L210 350 L190 320 L185 300 Z"
          fill={getRiskColor(getRegionRisk('Gəncə-Qazax'))}
          stroke="#374151"
          strokeWidth="2"
          onClick={() => onRegionClick('Gəncə-Qazax')}
          whileHover={{ scale: 1.02, opacity: 0.8 }}
          className={`cursor-pointer transition-all ${
            selectedRegion === 'Gəncə-Qazax' ? 'stroke-4 stroke-primary' : ''
          }`}
        />

        {/* Şəki-Zaqatala regionu - şimal */}
        <motion.path
          d="M250 200 L320 190 L380 185 L440 180 L490 175 L520 190 L540 210 L530 240 L510 260 L480 270 L440 275 L400 280 L360 285 L320 290 L280 280 L240 260 L220 240 L230 220 Z"
          fill={getRiskColor(getRegionRisk('Şəki-Zaqatala'))}
          stroke="#374151"
          strokeWidth="2"
          onClick={() => onRegionClick('Şəki-Zaqatala')}
          whileHover={{ scale: 1.02, opacity: 0.8 }}
          className={`cursor-pointer transition-all ${
            selectedRegion === 'Şəki-Zaqatala' ? 'stroke-4 stroke-primary' : ''
          }`}
        />

        {/* Lənkəran regionu - cənub */}
        <motion.path
          d="M520 450 L580 440 L630 445 L670 460 L690 480 L680 510 L660 530 L630 540 L590 545 L550 540 L520 530 L500 510 L495 480 L505 465 Z"
          fill={getRiskColor(getRegionRisk('Lənkəran'))}
          stroke="#374151"
          strokeWidth="2"
          onClick={() => onRegionClick('Lənkəran')}
          whileHover={{ scale: 1.02, opacity: 0.8 }}
          className={`cursor-pointer transition-all ${
            selectedRegion === 'Lənkəran' ? 'stroke-4 stroke-primary' : ''
          }`}
        />

        {/* Şirvan-Salyan regionu - mərkəz-şərq */}
        <motion.path
          d="M450 350 L520 340 L570 345 L610 360 L630 380 L620 410 L600 430 L570 440 L530 445 L490 440 L450 430 L420 410 L410 380 L420 360 Z"
          fill={getRiskColor(getRegionRisk('Şirvan-Salyan'))}
          stroke="#374151"
          strokeWidth="2"
          onClick={() => onRegionClick('Şirvan-Salyan')}
          whileHover={{ scale: 1.02, opacity: 0.8 }}
          className={`cursor-pointer transition-all ${
            selectedRegion === 'Şirvan-Salyan' ? 'stroke-4 stroke-primary' : ''
          }`}
        />

        {/* Region adları */}
        <text x="690" y="340" textAnchor="middle" className="fill-white font-bold text-sm pointer-events-none drop-shadow-lg">
          Bakı
        </text>
        <text x="295" y="330" textAnchor="middle" className="fill-white font-bold text-sm pointer-events-none drop-shadow-lg">
          Gəncə
        </text>
        <text x="385" y="235" textAnchor="middle" className="fill-white font-bold text-sm pointer-events-none drop-shadow-lg">
          Şəki-Zaqatala
        </text>
        <text x="600" y="495" textAnchor="middle" className="fill-white font-bold text-sm pointer-events-none drop-shadow-lg">
          Lənkəran
        </text>
        <text x="540" y="395" textAnchor="middle" className="fill-white font-bold text-sm pointer-events-none drop-shadow-lg">
          Şirvan-Salyan
        </text>
        <text x="110" y="485" textAnchor="middle" className="fill-white font-bold text-xs pointer-events-none drop-shadow-lg">
          Naxçıvan
        </text>

        {/* Risk balları */}
        {regionData.map((region) => {
          const positions: { [key: string]: { x: number; y: number } } = {
            'Bakı': { x: 690, y: 360 },
            'Gəncə-Qazax': { x: 295, y: 350 },
            'Şəki-Zaqatala': { x: 385, y: 255 },
            'Lənkəran': { x: 600, y: 515 },
            'Şirvan-Salyan': { x: 540, y: 415 }
          };
          
          const pos = positions[region.region];
          if (!pos) return null;

          return (
            <g key={region.region}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="18"
                fill="rgba(0,0,0,0.8)"
                className="pointer-events-none"
              />
              <text
                x={pos.x}
                y={pos.y + 5}
                textAnchor="middle"
                className="fill-white font-bold text-sm pointer-events-none"
              >
                {region.riskScore}
              </text>
            </g>
          );
        })}

        {/* Xəzər dənizi etiketi */}
        <text x="850" y="350" textAnchor="middle" className="fill-blue-600 font-bold text-lg pointer-events-none opacity-30">
          Xəzər Dənizi
        </text>
      </svg>

      {/* Map Legend */}
      <div className="mt-4">
        <div className="flex justify-center space-x-6 mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm">Aşağı Risk (≤30)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm">Orta Risk (31-50)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-sm">Yüksək Risk (51-70)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm">Çox Yüksək Risk (&gt;70)</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">
            💡 Xəritədə regionlara klik edərək ətraflı risk analizi əldə edin
          </p>
        </div>
      </div>
    </div>
  );
};

export default AzerbaijanMap;