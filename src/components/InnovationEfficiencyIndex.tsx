import React, { useMemo, useState } from 'react';
import { FiBarChart2, FiTrendingUp, FiInfo, FiCpu, FiCheckCircle, FiAlertTriangle, FiTarget, FiSliders } from 'react-icons/fi';

// Innovasiya Səmərəlilik İndeksi
// Efficiency = Outputs Index / Inputs Index
// Inputs (%): IYIP, IKIQ, ETED, IMAI, RIT
// Outputs (% unless noted): PBM, IYIMP, IIG (ratio, cap 5x), IME, EDAI, IDG

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const toNum = (v: string): number | undefined => {
  const n = parseFloat(v.replace(',', '.'));
  return Number.isFinite(n) ? n : undefined;
};

const normalizePercent = (v?: number) => v === undefined ? undefined : clamp(v, 0, 100);
const normalizeRatio = (v?: number, cap = 5) => v === undefined ? undefined : clamp((v / cap) * 100, 0, 100);

const avg = (arr: Array<number | undefined>) => {
  const nums = arr.filter((x): x is number => typeof x === 'number');
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
};

const card = 'rounded-xl border border-gray-200 bg-white p-4 shadow-sm';
const label = 'text-sm font-medium text-gray-700';
const inputCls = 'mt-1 w-full rounded-lg border border-primary/30 px-3 py-2 focus:border-primary focus:outline-none';

const InnovationEfficiencyIndex: React.FC = () => {
  const [form, setForm] = useState({
    IYIP: '', IKIQ: '', ETED: '', IMAI: '', RIT: '',
    PBM: '', IYIMP: '', IIG: '', IME: '', EDAI: '', IDG: ''
  });
  const [targetEff, setTargetEff] = useState<string>('1.20');

  const values = useMemo(() => ({
    IYIP: toNum(form.IYIP),
    IKIQ: toNum(form.IKIQ),
    ETED: toNum(form.ETED),
    IMAI: toNum(form.IMAI),
    RIT: toNum(form.RIT),
    PBM: toNum(form.PBM),
    IYIMP: toNum(form.IYIMP),
    IIG: toNum(form.IIG),
    IME: toNum(form.IME),
    EDAI: toNum(form.EDAI),
    IDG: toNum(form.IDG),
  }), [form]);

  const inputsIndex = useMemo(() => {
    return avg([
      normalizePercent(values.IYIP),
      normalizePercent(values.IKIQ),
      normalizePercent(values.ETED),
      normalizePercent(values.IMAI),
      normalizePercent(values.RIT),
    ]);
  }, [values]);

  const outputsIndex = useMemo(() => {
    return avg([
      normalizePercent(values.PBM),
      normalizePercent(values.IYIMP),
      normalizeRatio(values.IIG, 5), // cap 5x
      normalizePercent(values.IME),
      normalizePercent(values.EDAI),
      normalizePercent(values.IDG),
    ]);
  }, [values]);

  const efficiency = useMemo(() => {
    const denom = Math.max(inputsIndex, 0.0001);
    return outputsIndex / denom; // x times
  }, [inputsIndex, outputsIndex]);

  const efficiencyClass = useMemo(() => {
    if (efficiency < 0.9) return { label: 'Aşağı səmərəlilik', color: 'bg-red-100 text-red-700' };
    if (efficiency <= 1.2) return { label: 'Balanslı', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'Yüksək səmərəlilik', color: 'bg-green-100 text-green-700' };
  }, [efficiency]);

  const weakestInputs = useMemo(() => {
    const list: Array<{ key: string; label: string; val: number }> = [
      { key: 'IYIP', label: 'İnnovasiya investisiyaları', val: normalizePercent(values.IYIP) ?? 0 },
      { key: 'IKIQ', label: 'İnsan kapitalı (İKİQ)', val: normalizePercent(values.IKIQ) ?? 0 },
      { key: 'ETED', label: 'Elmi-tədqiqat əməkdaşlığı', val: normalizePercent(values.ETED) ?? 0 },
      { key: 'IMAI', label: 'Maliyyə əlçatanlığı (İMAİ)', val: normalizePercent(values.IMAI) ?? 0 },
      { key: 'RIT', label: 'İnfrastruktur təminatı (RİT)', val: normalizePercent(values.RIT) ?? 0 },
    ];
    return list.sort((a, b) => a.val - b.val).slice(0, 3);
  }, [values]);

  const strongestOutputs = useMemo(() => {
    const list: Array<{ key: string; label: string; val: number }> = [
      { key: 'PBM', label: 'Patent/brendli məhsullar (PBM)', val: normalizePercent(values.PBM) ?? 0 },
      { key: 'IYIMP', label: 'İxrac yönümlü məhsullar (İYİMP)', val: normalizePercent(values.IYIMP) ?? 0 },
      { key: 'IIG', label: 'Gəlirlilik (İİG norm.)', val: normalizeRatio(values.IIG, 5) ?? 0 },
      { key: 'IME', label: 'Məşğulluq effekti (İME)', val: normalizePercent(values.IME) ?? 0 },
      { key: 'EDAI', label: 'Əlavə dəyər artımı (ƏDAİ)', val: normalizePercent(values.EDAI) ?? 0 },
      { key: 'IDG', label: 'Davamlılıq göstəricisi (İDG)', val: normalizePercent(values.IDG) ?? 0 },
    ];
    return list.sort((a, b) => b.val - a.val).slice(0, 3);
  }, [values]);

  const adviceByKey: Record<string, string> = {
    IYIP: 'İnnovasiya yönümlü investisiya payını artırın; daxili Ar-Ge büdcəsi və xərcləri planlayın.',
    IKIQ: 'R&D/texnoloji kompetensiyalı işçilərin sayını təlim və ya işe alımla yüksəldin.',
    ETED: 'Universitet və tədqiqat mərkəzləri ilə uzunmüddətli müqavilələr və birgə layihələr qurun.',
    IMAI: 'Qrant proqramları, güzəştli kreditlər və dövlət dəstəyi alətlərindən yararlanma dərəcəsini artırın.',
    RIT: 'Texnopark, inkubator, laboratoriya və test mühitlərinə çıxış təmin edin və istifadəni sistemləşdirin.',
    PBM: 'Patent/müəlliflik və brend strategiyasını gücləndirin; IP portfelini aktiv idarə edin.',
    IYIMP: 'İxrac üçün uyğun sertifikatlar, paylayıcı şəbəkələr və bazar uyğunlaşdırması edin.',
    IIG: 'Layihə ROI izləməsini qurun; qısa dövrdə daha yüksək geri dönüşlü layihələrə prioritet verin.',
    IME: 'İnnovasiya ilə əlaqəli yeni peşələr yaradın, reskilling/upskilling proqramları tətbiq edin.',
    EDAI: 'Məhsul və proses innovasiyaları ilə marjanı və dəyər zəncirində payınızı artırın.',
    IDG: 'İnnovasiya idarəetməsi (funnel, komitə, KPI) qurun və davamlı layihə axınını təmin edin.',
  };

  const target = useMemo(() => parseFloat((targetEff || '0').replace(',', '.')) || 0, [targetEff]);
  const neededOutputs = useMemo(() => clamp(target * inputsIndex, 0, 100), [target, inputsIndex]);
  const deltaOutputs = useMemo(() => Math.max(0, neededOutputs - outputsIndex), [neededOutputs, outputsIndex]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-primary inline-flex items-center gap-2">
          <FiCpu className="w-6 h-6" />
          İnnovasiya Səmərəlilik İndeksi
        </h3>
        <div className="text-sm text-gray-600 inline-flex items-center gap-2">
          <FiInfo />
          Formula: Səmərəlilik = Nəticələr indeksi / Resurslar indeksi
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <div className={card}>
          <h4 className="font-semibold mb-3">A. İnnovasiya resursları (Inputs)</h4>
          <div className="space-y-3">
            <div>
              <label className={label}>IYİP — İnnovasiyaya yönələn investisiyalar (%)</label>
              <input inputMode="decimal" placeholder="0-100" className={inputCls} value={form.IYIP} onChange={set('IYIP')} />
            </div>
            <div>
              <label className={label}>İKİQ — R&D/texnoloji təhsilli əməkdaşlar (%)</label>
              <input inputMode="decimal" placeholder="0-100" className={inputCls} value={form.IKIQ} onChange={set('IKIQ')} />
            </div>
            <div>
              <label className={label}>ETƏD — Elmi-tədqiqat əməkdaşlıq (%)</label>
              <input inputMode="decimal" placeholder="0-100" className={inputCls} value={form.ETED} onChange={set('ETED')} />
            </div>
            <div>
              <label className={label}>İMAİ — İnnovasiya maliyyə əlçatanlığı (%)</label>
              <input inputMode="decimal" placeholder="0-100" className={inputCls} value={form.IMAI} onChange={set('IMAI')} />
            </div>
            <div>
              <label className={label}>RİT — İnnovasiya infrastrukturu təminatı (%)</label>
              <input inputMode="decimal" placeholder="0-100" className={inputCls} value={form.RIT} onChange={set('RIT')} />
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className={card}>
          <h4 className="font-semibold mb-3">B. İnnovasiya nəticələri (Outputs)</h4>
          <div className="space-y-3">
            <div>
              <label className={label}>PBM — Patent/brendli məhsullar (%)</label>
              <input inputMode="decimal" placeholder="0-100" className={inputCls} value={form.PBM} onChange={set('PBM')} />
            </div>
            <div>
              <label className={label}>İYİMP — İxrac yönümlü innovasiya məhsulları (%)</label>
              <input inputMode="decimal" placeholder="0-100" className={inputCls} value={form.IYIMP} onChange={set('IYIMP')} />
            </div>
            <div>
              <label className={label}>İİG — İnnovasiya-investisiya gəlirliliyi (dəfə)</label>
              <input inputMode="decimal" placeholder="məs: 0.0 - 5.0" className={inputCls} value={form.IIG} onChange={set('IIG')} />
              <p className="text-xs text-gray-500 mt-1">0–5x aralığı 0–100 bal kimi normallaşdırılır.</p>
            </div>
            <div>
              <label className={label}>İME — İnnovasiya məşğulluq effekti (%)</label>
              <input inputMode="decimal" placeholder="0-100" className={inputCls} value={form.IME} onChange={set('IME')} />
            </div>
            <div>
              <label className={label}>ƏDAİ — Əlavə dəyər artımı indeksi (%)</label>
              <input inputMode="decimal" placeholder="0-100" className={inputCls} value={form.EDAI} onChange={set('EDAI')} />
            </div>
            <div>
              <label className={label}>İDG — İnnovasiya davamlılıq göstəricisi (%)</label>
              <input inputMode="decimal" placeholder="0-100" className={inputCls} value={form.IDG} onChange={set('IDG')} />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className={card}>
          <h4 className="font-semibold mb-3">Nəticə</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-gray-700 inline-flex items-center gap-2"><FiBarChart2 /> Resurslar İndeksi</div>
              <div className="font-bold text-primary">{inputsIndex.toFixed(1)}/100</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-gray-700 inline-flex items-center gap-2"><FiBarChart2 /> Nəticələr İndeksi</div>
              <div className="font-bold text-primary">{outputsIndex.toFixed(1)}/100</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-gray-700 inline-flex items-center gap-2"><FiTrendingUp /> Səmərəlilik</div>
              <div className="font-bold text-primary">{efficiency.toFixed(2)}x</div>
            </div>
            <div className={`inline-flex items-center gap-2 px-2 py-1 rounded ${efficiencyClass.color}`}>
              {efficiency < 0.9 ? <FiAlertTriangle /> : <FiCheckCircle />}
              <span className="text-sm font-medium">{efficiencyClass.label}</span>
            </div>
            <p className="text-xs text-gray-500">
              Qeyd: Boş sahələr hesablamadan avtomatik çıxarılır. İİG 5x ilə məhdudlaşdırılaraq 0–100 balına çevrilir.
            </p>
          </div>
        </div>
      </div>

      {/* Analiz və Məsləhətlər */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className={card}>
          <h4 className="font-semibold mb-3 inline-flex items-center gap-2"><FiTarget /> Zəif həlqələr (Inputs)</h4>
          <ul className="space-y-2">
            {weakestInputs.map((w) => (
              <li key={w.key} className="text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{w.label}</span>
                  <span className="font-semibold text-primary">{w.val.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${w.val}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-1">{adviceByKey[w.key]}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={card}>
          <h4 className="font-semibold mb-3 inline-flex items-center gap-2"><FiCheckCircle /> Güclü tərəflər (Outputs)</h4>
          <ul className="space-y-2">
            {strongestOutputs.map((s) => (
              <li key={s.key} className="text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{s.label}</span>
                  <span className="font-semibold text-primary">{s.val.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${s.val}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={card}>
          <h4 className="font-semibold mb-3 inline-flex items-center gap-2"><FiSliders /> Hədəf ssenarisi (What‑if)</h4>
          <div className="space-y-3">
            <label className="text-sm text-gray-700">Hədəf Səmərəlilik (x)</label>
            <input
              inputMode="decimal"
              placeholder="məs: 1.20"
              className={inputCls}
              value={targetEff}
              onChange={(e) => setTargetEff(e.target.value)}
            />
            <div className="text-sm text-gray-700 flex items-center justify-between">
              <span>Tələb olunan Nəticələr indeksi</span>
              <span className="font-semibold text-primary">{neededOutputs.toFixed(1)}/100</span>
            </div>
            <div className="text-sm text-gray-700 flex items-center justify-between">
              <span>Lazım olan artım</span>
              <span className="font-semibold {deltaOutputs>0? 'text-red-600':'text-green-600'}">{deltaOutputs.toFixed(1)} bal</span>
            </div>
            <p className="text-xs text-gray-500">Qeyd: Alternativ olaraq, eyni hədəf üçün Resurslar indeksini {target>0? ( (outputsIndex/Math.max(target,0.0001)).toFixed(1)): '—' } səviyyəsinə endirmək kifayətdir.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationEfficiencyIndex;
