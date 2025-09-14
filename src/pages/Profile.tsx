// src/pages/Profile.tsx


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<any>({});
  const [aiMatch, setAiMatch] = useState<any>(null);
  const navigate = useNavigate();

  // AI uyğunluq məntiqi (Match.tsx-dakı kimi)
  function getBestMatch(user: any, list: any[], role: "KOS" | "Investor") {
    if (!user || !list.length) return null;
    if (role === "KOS") {
      const matches = list.filter((inv) =>
        inv.sectorInterest && user.sector && inv.sectorInterest.toLowerCase().includes(user.sector.toLowerCase()) &&
        inv.riskTolerance === user.projectRisk
      );
      return matches[0] || null;
    } else {
      const matches = list.filter((kos) =>
        kos.sector && user.sectorInterest && kos.sector.toLowerCase().includes(user.sectorInterest.toLowerCase()) &&
        kos.projectRisk === user.riskTolerance
      );
      return matches[0] || null;
    }
  }

  useEffect(() => {
    // localStorage-də saxlanmış istifadəçi məlumatını alırıq
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      // Rol-a görə fərqli form sahələri
      if (parsed.role === "KOS") {
        setForm({
          email: parsed.email || "",
          name: parsed.name || "",
          phone: parsed.phone || "",
          companyName: parsed.companyName || "",
          sector: parsed.sector || "",
          employeeCount: parsed.employeeCount || "",
          turnover: parsed.turnover || "",
          exportPotential: parsed.exportPotential || "",
          innovation: parsed.innovation || "",
          patents: parsed.patents || "",
          technology: parsed.technology || "",
          certificates: parsed.certificates || "",
          ecoLabels: parsed.ecoLabels || "",
          projects: parsed.projects || "",
          projectDesc: parsed.projectDesc || "",
          projectRisk: parsed.projectRisk || "",
          projectInvestment: parsed.projectInvestment || "",
          social: parsed.social || ""
        });
      } else {
        setForm({
          email: parsed.email || "",
          name: parsed.name || "",
          phone: parsed.phone || "",
          investorName: parsed.investorName || "",
          sectorInterest: parsed.sectorInterest || "",
          experience: parsed.experience || "",
          cooperation: parsed.cooperation || "",
          riskTolerance: parsed.riskTolerance || "",
          capitalMin: parsed.capitalMin || "",
          capitalMax: parsed.capitalMax || "",
          investmentHistory: parsed.investmentHistory || "",
          extraTerms: parsed.extraTerms || "",
          social: parsed.social || ""
        });
      }
    } else {
      navigate("/login"); // Əgər login olunmayıbsa login səhifəsinə yönləndiririk
    }
  }, [navigate]);

  // AI match-i yalnız user məlum olduqda hesabla
  useEffect(() => {
    if (!user) return;
    if (user.role === "KOS") {
      const investorList = JSON.parse(localStorage.getItem("investorList") || "[]");
      setAiMatch(getBestMatch(user, investorList, "KOS"));
    } else {
      const kosList = JSON.parse(localStorage.getItem("kosList") || "[]");
      setAiMatch(getBestMatch(user, kosList, "Investor"));
    }
  }, [user]);

  if (!user) return <div>Yüklənir...</div>;

  // Profil məlumatlarını yadda saxla
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, ...form };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // KOS və ya Investor siyahısına əlavə et/yeni məlumatı yenilə
    if (updatedUser.role === "KOS") {
      let kosList = [];
      try {
        kosList = JSON.parse(localStorage.getItem("kosList") || "[]");
      } catch {
        kosList = [];
      }
      // Eyni email varsa yenilə, yoxdursa əlavə et
      const idx = kosList.findIndex((k: any) => k.email === updatedUser.email);
      if (idx > -1) {
        kosList[idx] = { ...kosList[idx], ...updatedUser };
      } else {
        // id təyin et
        const newId = `kos_${Date.now()}`;
        kosList.push({ ...updatedUser, id: newId });
      }
      localStorage.setItem("kosList", JSON.stringify(kosList));
    } else if (updatedUser.role === "Investor") {
      let investorList = [];
      try {
        investorList = JSON.parse(localStorage.getItem("investorList") || "[]");
      } catch {
        investorList = [];
      }
      const idx = investorList.findIndex((i: any) => i.email === updatedUser.email);
      if (idx > -1) {
        investorList[idx] = { ...investorList[idx], ...updatedUser };
      } else {
        const newId = `investor_${Date.now()}`;
        investorList.push({ ...updatedUser, id: newId });
      }
      localStorage.setItem("investorList", JSON.stringify(investorList));
    }

    setEditMode(false);
  };


  // (Təkrarlanan kod silindi, yalnız yuxarıda saxlanılır)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-primary">
          {user.role === "KOS" ? "KOS Profil Səhifəsi" : "İnvestor Profil Səhifəsi"}
        </h2>

        {/* AI ilə məsləhət bölməsi */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-primary">AI ilə məsləhət al</h3>
          {aiMatch ? (
            <div className="p-4 border rounded bg-gray-50">
              <div className="font-bold text-primary mb-2">Sizə ən uyğun {user.role === "KOS" ? "Investor" : "KOS"}:</div>
              {user.role === "KOS" ? (
                <>
                  <div><b>Ad:</b> {aiMatch.investorName || aiMatch.name}</div>
                  <div><b>Sektoral maraqlar:</b> {aiMatch.sectorInterest}</div>
                  <div><b>Risk toleransı:</b> {aiMatch.riskTolerance}</div>
                  <div><b>Əlaqə:</b> {aiMatch.email}</div>
                </>
              ) : (
                <>
                  <div><b>Şirkət adı:</b> {aiMatch.companyName}</div>
                  <div><b>Sektor:</b> {aiMatch.sector}</div>
                  <div><b>Risk dərəcəsi:</b> {aiMatch.projectRisk}</div>
                  <div><b>Əlaqə:</b> {aiMatch.email}</div>
                </>
              )}
              <div className="mt-2 text-xs text-gray-500">AI məsləhəti: Uyğunluq sektor və risk dərəcəsinə əsaslanır. Daha dəqiq nəticə üçün profilinizi tam doldurun.</div>
            </div>
          ) : (
            <div className="text-red-500">Hazırda uyğun match tapılmadı. Zəhmət olmasa profilinizi tam doldurun və ya gözləyin.</div>
          )}
        </div>

        {editMode ? (
          <form onSubmit={handleSave} className="space-y-4">
            {/* Hər iki rolda olan sahələr */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.email} onChange={e => setForm((f:any) => ({ ...f, email: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ad</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.name} onChange={e => setForm((f:any) => ({ ...f, name: e.target.value }))} placeholder="Adınızı daxil edin" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Telefon</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.phone} onChange={e => setForm((f:any) => ({ ...f, phone: e.target.value }))} placeholder="Telefon nömrəniz" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sosial şəbəkə</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.social} onChange={e => setForm((f:any) => ({ ...f, social: e.target.value }))} placeholder="LinkedIn, Facebook və s." />
              </div>
            </div>

            {/* KOS üçün əlavə sahələr */}
            {user.role === "KOS" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Şirkət adı</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.companyName} onChange={e => setForm((f:any) => ({ ...f, companyName: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Sektor</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.sector} onChange={e => setForm((f:any) => ({ ...f, sector: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">İşçilərin sayı</label>
                    <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.employeeCount} onChange={e => setForm((f:any) => ({ ...f, employeeCount: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dövriyyə (illik gəlir)</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.turnover} onChange={e => setForm((f:any) => ({ ...f, turnover: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">İxrac potensialı</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.exportPotential} onChange={e => setForm((f:any) => ({ ...f, exportPotential: e.target.value }))}>
                      <option value="">Seçin</option>
                      <option value="Aşağı">Aşağı</option>
                      <option value="Orta">Orta</option>
                      <option value="Yüksək">Yüksək</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">İnnovasiya göstəriciləri</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.innovation} onChange={e => setForm((f:any) => ({ ...f, innovation: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Patentlər</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.patents} onChange={e => setForm((f:any) => ({ ...f, patents: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Texnologiya istifadəsi</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.technology} onChange={e => setForm((f:any) => ({ ...f, technology: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Sertifikatlar</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.certificates} onChange={e => setForm((f:any) => ({ ...f, certificates: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ekoloji göstəricilər</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.ecoLabels} onChange={e => setForm((f:any) => ({ ...f, ecoLabels: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Layihələrin adı</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.projects} onChange={e => setForm((f:any) => ({ ...f, projects: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Layihə təsviri və məqsəd</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.projectDesc} onChange={e => setForm((f:any) => ({ ...f, projectDesc: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Risk dərəcəsi</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.projectRisk} onChange={e => setForm((f:any) => ({ ...f, projectRisk: e.target.value }))}>
                      <option value="">Seçin</option>
                      <option value="Aşağı">Aşağı</option>
                      <option value="Orta">Orta</option>
                      <option value="Yüksək">Yüksək</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">İnvestisiya miqdarı</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.projectInvestment} onChange={e => setForm((f:any) => ({ ...f, projectInvestment: e.target.value }))} />
                  </div>
                </div>
              </>
            )}

            {/* Investor üçün əlavə sahələr */}
            {user.role === "Investor" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Investor adı</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.investorName} onChange={e => setForm((f:any) => ({ ...f, investorName: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Sektoral maraqlar</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.sectorInterest} onChange={e => setForm((f:any) => ({ ...f, sectorInterest: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">İnvestisiya təcrübəsi</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.experience} onChange={e => setForm((f:any) => ({ ...f, experience: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Əməkdaşlıq modelləri</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.cooperation} onChange={e => setForm((f:any) => ({ ...f, cooperation: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Risk toleransı</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.riskTolerance} onChange={e => setForm((f:any) => ({ ...f, riskTolerance: e.target.value }))}>
                      <option value="">Seçin</option>
                      <option value="Aşağı">Aşağı</option>
                      <option value="Orta">Orta</option>
                      <option value="Yüksək">Yüksək</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Sərmayə həcmi (min)</label>
                    <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.capitalMin} onChange={e => setForm((f:any) => ({ ...f, capitalMin: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Sərmayə həcmi (max)</label>
                    <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.capitalMax} onChange={e => setForm((f:any) => ({ ...f, capitalMax: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">İnvestisiya tarixi</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.investmentHistory} onChange={e => setForm((f:any) => ({ ...f, investmentHistory: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Əlavə şərtlər</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" value={form.extraTerms} onChange={e => setForm((f:any) => ({ ...f, extraTerms: e.target.value }))} />
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-2 mt-4">
              <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 transition-colors">Yadda saxla</button>
              <button type="button" className="w-full bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400" onClick={() => setEditMode(false)}>Ləğv et</button>
            </div>
          </form>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><b>Email:</b> {user.email}</div>
              <div><b>Ad:</b> {user.name || <span className="text-gray-400">-</span>}</div>
              <div><b>Telefon:</b> {user.phone || <span className="text-gray-400">-</span>}</div>
              <div><b>Sosial şəbəkə:</b> {user.social || <span className="text-gray-400">-</span>}</div>
            </div>

            {user.role === "KOS" && (
              <>
                <h3 className="mt-6 mb-2 text-lg font-semibold text-primary">Şirkət və Layihə Məlumatları</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><b>Şirkət adı:</b> {typeof user.companyName === 'string' ? user.companyName : <span className="text-gray-400">-</span>}</div>
                  <div><b>Sektor:</b> {typeof user.sector === 'string' ? user.sector : <span className="text-gray-400">-</span>}</div>
                  <div><b>İşçilərin sayı:</b> {typeof user.employeeCount === 'string' || typeof user.employeeCount === 'number' ? user.employeeCount : <span className="text-gray-400">-</span>}</div>
                  <div><b>Dövriyyə:</b> {typeof user.turnover === 'string' ? user.turnover : <span className="text-gray-400">-</span>}</div>
                  <div><b>İxrac potensialı:</b> {typeof user.exportPotential === 'string' ? user.exportPotential : <span className="text-gray-400">-</span>}</div>
                  <div><b>İnnovasiya göstəriciləri:</b> {typeof user.innovation === 'string' ? user.innovation : <span className="text-gray-400">-</span>}</div>
                  <div><b>Patentlər:</b> {typeof user.patents === 'string' ? user.patents : <span className="text-gray-400">-</span>}</div>
                  <div><b>Texnologiya istifadəsi:</b> {typeof user.technology === 'string' ? user.technology : <span className="text-gray-400">-</span>}</div>
                  <div><b>Sertifikatlar:</b> {typeof user.certificates === 'string' ? user.certificates : <span className="text-gray-400">-</span>}</div>
                  <div><b>Ekoloji göstəricilər:</b> {typeof user.ecoLabels === 'string' ? user.ecoLabels : <span className="text-gray-400">-</span>}</div>
                  <div><b>Layihələrin adı:</b> {
                    Array.isArray(user.projects)
                      ? user.projects.join(', ')
                      : (typeof user.projects === 'string' && user.projects)
                        ? user.projects
                        : <span className="text-gray-400">-</span>
                  }</div>
                  <div><b>Layihə təsviri və məqsəd:</b> {typeof user.projectDesc === 'string' ? user.projectDesc : <span className="text-gray-400">-</span>}</div>
                  <div><b>Risk dərəcəsi:</b> {typeof user.projectRisk === 'string' ? user.projectRisk : <span className="text-gray-400">-</span>}</div>
                  <div><b>İnvestisiya miqdarı:</b> {typeof user.projectInvestment === 'string' ? user.projectInvestment : <span className="text-gray-400">-</span>}</div>
                </div>
              </>
            )}

            {user.role === "Investor" && (
              <>
                <h3 className="mt-6 mb-2 text-lg font-semibold text-primary">Investor Məlumatları</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><b>Investor adı:</b> {typeof user.investorName === 'string' ? user.investorName : <span className="text-gray-400">-</span>}</div>
                  <div><b>Sektoral maraqlar:</b> {
                    Array.isArray(user.sectorInterest)
                      ? user.sectorInterest.join(', ')
                      : (typeof user.sectorInterest === 'string' && user.sectorInterest)
                        ? user.sectorInterest
                        : <span className="text-gray-400">-</span>
                  }</div>
                  <div><b>İnvestisiya təcrübəsi:</b> {typeof user.experience === 'string' ? user.experience : <span className="text-gray-400">-</span>}</div>
                  <div><b>Əməkdaşlıq modelləri:</b> {
                    Array.isArray(user.cooperation)
                      ? user.cooperation.join(', ')
                      : (typeof user.cooperation === 'string' && user.cooperation)
                        ? user.cooperation
                        : <span className="text-gray-400">-</span>
                  }</div>
                  <div><b>Risk toleransı:</b> {typeof user.riskTolerance === 'string' ? user.riskTolerance : <span className="text-gray-400">-</span>}</div>
                  <div><b>Sərmayə həcmi (min):</b> {typeof user.capitalMin === 'string' || typeof user.capitalMin === 'number' ? user.capitalMin : <span className="text-gray-400">-</span>}</div>
                  <div><b>Sərmayə həcmi (max):</b> {typeof user.capitalMax === 'string' || typeof user.capitalMax === 'number' ? user.capitalMax : <span className="text-gray-400">-</span>}</div>
                  <div><b>İnvestisiya tarixi:</b> {
                    Array.isArray(user.investmentHistory)
                      ? user.investmentHistory.join(', ')
                      : (typeof user.investmentHistory === 'string' && user.investmentHistory)
                        ? user.investmentHistory
                        : <span className="text-gray-400">-</span>
                  }</div>
                  <div><b>Əlavə şərtlər:</b> {typeof user.extraTerms === 'string' ? user.extraTerms : <span className="text-gray-400">-</span>}</div>
                </div>
              </>
            )}

            <button
              onClick={() => setEditMode(true)}
              className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 transition-colors"
            >
              Məlumatları Redaktə Et
            </button>
          </>
        )}

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Çıxış Et
        </button>
      </div>
    </div>
  );
};

export default Profile;
