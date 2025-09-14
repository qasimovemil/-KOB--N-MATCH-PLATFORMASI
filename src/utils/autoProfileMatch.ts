// İstifadəçi profilini demo match üçün avtomatik doldurur
export function setAutoProfileMatch(role: 'KOS' | 'Investor') {
  let user = null;
  try { user = JSON.parse(localStorage.getItem('user') || 'null'); } catch { user = null; }
  if (!user) return;
  if (role === 'KOS') {
    user.sector = 'İT';
    user.projectRisk = 'Orta';
  } else {
    user.sectorInterest = 'İT';
    user.riskTolerance = 'Orta';
  }
  localStorage.setItem('user', JSON.stringify(user));
}
