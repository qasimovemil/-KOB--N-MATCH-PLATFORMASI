// src/pages/KOSInvestmentIndexPage.tsx
import React from 'react';
import InvestmentAttractivenessCalculator from '../components/InvestmentAttractivenessCalculator';

const KOSInvestmentIndexPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <InvestmentAttractivenessCalculator />
      </div>
    </div>
  );
};

export default KOSInvestmentIndexPage;
