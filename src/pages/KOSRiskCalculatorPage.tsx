// src/pages/KOSRiskCalculatorPage.tsx
import React from 'react';
import RiskCalculator from '../components/RiskCalculator';

const KOSRiskCalculatorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <RiskCalculator />
      </div>
    </div>
  );
};

export default KOSRiskCalculatorPage;
