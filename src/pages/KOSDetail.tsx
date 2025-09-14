// src/pages/KOSDetail.tsx
import { useParams } from "react-router-dom";
import { KOS_LIST } from "../data/kosData";

const KOSDetail = () => {
  const { id } = useParams();
  const kos = KOS_LIST.find((k) => k.id === id);

  if (!kos) return <div>Şirkət tapılmadı.</div>;

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
                  {certificate.name} {certificate.year && `(${certificate.year})`} {"issuer" in certificate && certificate.issuer && `- ${certificate.issuer}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KOSDetail;
