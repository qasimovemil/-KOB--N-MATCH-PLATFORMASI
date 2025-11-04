// src/pages/KOSDetail.tsx
import { useParams } from "react-router-dom";
import { KOS_LIST } from "../data/kosData";

interface StaticProject { id: string; title: string; description: string; risk: string }
interface StaticCert { name: string; year?: number; issuer?: string }
interface StaticKos {
  id: string;
  name: string;
  sector: string;
  turnoverUSD: number;
  exportPotential: string;
  innovationScore: number;
  projects: StaticProject[];
  certificates: StaticCert[];
}

interface MinimalKos {
  id: string;
  email?: string;
  name?: string;
  companyName?: string;
  sector?: string;
  employeeCount?: number | string;
  turnover?: string;
  exportPotential?: string;
  innovation?: string;
  patents?: string;
  technology?: string;
  certificates?: string;
  ecoLabels?: string;
  projects?: string | string[];
  projectDesc?: string;
  projectRisk?: string;
  projectInvestment?: string;
  social?: string;
}

const KOSDetail = () => {
  const { id } = useParams();

  // 1) Statik datasetdə axtar
  const kosStatic = (KOS_LIST as StaticKos[]).find((k) => k.id === id);

  // 2) localStorage-dan axtar (KOS səhifəsində yaradılan/demo qeydlər)
  let kosLocal: MinimalKos | undefined;
  try {
    const raw = JSON.parse(localStorage.getItem("kosList") || "[]") as unknown;
    if (Array.isArray(raw)) kosLocal = (raw as MinimalKos[]).find((k) => k.id === id);
  } catch {
    // ignore
  }

  if (!kosStatic && !kosLocal) return <div className="min-h-screen bg-gray-50 p-8">Şirkət tapılmadı.</div>;

  // Statik detal görünüşü (tam məlumat)
  if (kosStatic) {
    const kos = kosStatic;
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-6">{kos.name} - Ətraflı</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Ümumi Məlumatlar</h3>
              <p>Sektor: {kos.sector}</p>
              <p>Dövriyyə: ${kos.turnoverUSD}</p>
              <p>İxrac Potensialı: {kos.exportPotential}</p>
              <p>İnnovasiya Reytinqi: {kos.innovationScore}</p>

              <h3 className="mt-4 text-lg font-semibold">Layihələr</h3>
              <ul className="list-disc ml-5">
                {kos.projects.map((project) => (
                  <li key={project.id}>
                    <strong>{project.title}</strong> - {project.description} - Risk: {project.risk}
                  </li>
                ))}
              </ul>

              <h3 className="mt-4 text-lg font-semibold">Sertifikatlar</h3>
              <ul className="list-disc ml-5">
                {kos.certificates.map((certificate, index) => (
                  <li key={index}>
                    {certificate.name} {certificate.year && `(${certificate.year})`} {certificate.issuer && `- ${certificate.issuer}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Minimal localStorage görünüşü (demo və ya istifadəçi daxil etdiyi məlumatlar)
  const k = kosLocal as MinimalKos;
  const displayName = (k.companyName || k.name || "-");
  const projectsText = Array.isArray(k.projects) ? k.projects.join(', ') : (k.projects || k.projectDesc || '-');

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">{displayName} - Ətraflı</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Ümumi Məlumatlar</h3>
            <p>Sektor: {k.sector || '-'}</p>
            <p>Dövriyyə: {k.turnover || '-'}</p>
            <p>İxrac Potensialı: {k.exportPotential || '-'}</p>
            <p>İnnovasiya: {k.innovation || '-'}</p>
            <p>Patentlər: {k.patents || '-'}</p>
            <p>Texnologiyalar: {k.technology || '-'}</p>
            <p>Sertifikatlar: {k.certificates || '-'}</p>
            <p>Ekoloji etiketlər: {k.ecoLabels || '-'}</p>
            <p>Əlaqə: {k.email || '-'}</p>

            <h3 className="mt-4 text-lg font-semibold">Layihə</h3>
            <p>{projectsText}</p>
            <p>Layihə təsviri: {k.projectDesc || '-'}</p>
            <p>Layihə riski: {k.projectRisk || '-'}</p>
            <p>İnvestisiya tələbi: {k.projectInvestment || '-'}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KOSDetail;
