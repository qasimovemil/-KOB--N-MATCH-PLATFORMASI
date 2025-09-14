import { Link } from "react-router";

interface KOSCardProps {
  kos: {
    id: string;
    name?: string;
    projectName?: string;
    sector?: string | number;
    capitalNeed?: number;
    stage?: string | number;
    description?: string | number;
    shortDesc?: string | number;
    email?: string | number;
    riskLevel?: string | number;
    experience?: string | number;
  };
}

const KOSCard = ({ kos }: KOSCardProps) => {
  const displayName = ('projectName' in kos && typeof kos.projectName === 'string') 
    ? kos.projectName 
    : (typeof kos.name === 'string' ? kos.name : 'KOS Layihəsi');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{displayName}</h3>
        <span className="bg-primary/20 text-primary px-2 py-1 rounded text-sm">KOS</span>
      </div>
      
      {('sector' in kos && (typeof kos.sector === 'string' || typeof kos.sector === 'number')) && (
        <div className="mb-3">
          <span className="text-sm font-medium text-gray-700">Sektor:</span>
          <p className="text-gray-600 mt-1">{kos.sector}</p>
        </div>
      )}
      
      {('capitalNeed' in kos && typeof kos.capitalNeed === 'number') && (
        <div className="mb-3">
          <span className="text-sm font-medium text-gray-700">Kapital Ehtiyacı:</span>
          <p className="text-gray-600 mt-1">{kos.capitalNeed.toLocaleString()} USD</p>
        </div>
      )}
      
      {('stage' in kos && (typeof kos.stage === 'string' || typeof kos.stage === 'number')) && (
        <div className="mb-3">
          <span className="text-sm font-medium text-gray-700">Mərhələ:</span>
          <p className="text-gray-600 mt-1">{kos.stage}</p>
        </div>
      )}
      
      {('riskLevel' in kos && (typeof kos.riskLevel === 'string' || typeof kos.riskLevel === 'number')) && (
        <div className="mb-3">
          <span className="text-sm font-medium text-gray-700">Risk Səviyyəsi:</span>
          <p className="text-gray-600 mt-1">{kos.riskLevel}</p>
        </div>
      )}
      
      {(('description' in kos && (typeof kos.description === 'string' || typeof kos.description === 'number')) ||
        ('shortDesc' in kos && (typeof kos.shortDesc === 'string' || typeof kos.shortDesc === 'number'))) && (
        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            {kos.description || kos.shortDesc}
          </p>
        </div>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          {kos.email && (
            <span>📧 {kos.email}</span>
          )}
        </div>
        <Link 
          to={`/kos/${kos.id}`}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary/80 transition-colors"
        >
          Ətraflı
        </Link>
      </div>
    </div>
  );
};

export default KOSCard;