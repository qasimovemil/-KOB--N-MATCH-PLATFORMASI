import { Link } from "react-router";

interface InvestorCardProps {
  investor: {
    id: string;
    name?: string;
    investorName?: string;
    sectors?: string[];
    sectorInterest?: string | number;
    capitalMinUSD?: number;
    capitalMaxUSD?: number;
    capitalMin?: number;
    capitalMax?: number;
    riskTolerance?: string | number;
    experience?: string | number;
    experienceYears?: number;
    shortDesc?: string | number;
    email?: string | number;
  };
}

const InvestorCard = ({ investor }: InvestorCardProps) => {
  const displayName = ('investorName' in investor && typeof investor.investorName === 'string') 
    ? investor.investorName 
    : (typeof investor.name === 'string' ? investor.name : 'İnvestor');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{displayName}</h3>
        <span className="bg-primary/20 text-primary px-2 py-1 rounded text-sm">İnvestor</span>
      </div>
      
      {('sectors' in investor && Array.isArray(investor.sectors)) && (
        <div className="mb-3">
          <span className="text-sm font-medium text-gray-700">Sektorlar:</span>
          <p className="text-gray-600 mt-1">{investor.sectors.join(", ")}</p>
        </div>
      )}
      
      {('sectorInterest' in investor && (typeof investor.sectorInterest === 'string' || typeof investor.sectorInterest === 'number')) && (
        <div className="mb-3">
          <span className="text-sm font-medium text-gray-700">Sektor marağı:</span>
          <p className="text-gray-600 mt-1">{investor.sectorInterest}</p>
        </div>
      )}
      
      {(('capitalMinUSD' in investor && 'capitalMaxUSD' in investor && typeof investor.capitalMinUSD === 'number' && typeof investor.capitalMaxUSD === 'number') || 
        ('capitalMin' in investor && 'capitalMax' in investor && typeof investor.capitalMin === 'number' && typeof investor.capitalMax === 'number')) && (
        <div className="mb-3">
          <span className="text-sm font-medium text-gray-700">Sərmayə Aralığı:</span>
          <p className="text-gray-600 mt-1">
            {investor.capitalMinUSD && investor.capitalMaxUSD 
              ? `${investor.capitalMinUSD} - ${investor.capitalMaxUSD} USD`
              : `${investor.capitalMin} - ${investor.capitalMax}`}
          </p>
        </div>
      )}
      
      {('riskTolerance' in investor && (typeof investor.riskTolerance === 'string' || typeof investor.riskTolerance === 'number')) && (
        <div className="mb-3">
          <span className="text-sm font-medium text-gray-700">Risk Toleransı:</span>
          <p className="text-gray-600 mt-1">{investor.riskTolerance}</p>
        </div>
      )}
      
      {('shortDesc' in investor && (typeof investor.shortDesc === 'string' || typeof investor.shortDesc === 'number')) && (
        <div className="mb-4">
          <p className="text-gray-600 text-sm">{investor.shortDesc}</p>
        </div>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          {investor.email && (
            <span>📧 {investor.email}</span>
          )}
        </div>
        <Link 
          to={`/investor/${investor.id}`}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary/80 transition-colors"
        >
          Ətraflı
        </Link>
      </div>
    </div>
  );
};

export default InvestorCard;