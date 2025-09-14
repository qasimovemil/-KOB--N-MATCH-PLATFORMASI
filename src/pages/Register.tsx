
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"KOS" | "Investor" | "">("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Şifrələr uyğun gəlmir!");
      return;
    }
    // İstifadəçi siyahısını localStorage-dan götür
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      users = [];
    }
    // Eyni email varsa qeydiyyata icazə vermə
    if (users.some((u: any) => u.email === email)) {
      alert("Bu email ilə artıq qeydiyyat var!");
      return;
    }
    // Yeni istifadəçini əlavə et
    const newUser = { email, password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Qeydiyyat uğurla tamamlandı!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative" style={{ background: 'linear-gradient(135deg, rgba(155, 130, 63, 0.2) 0%, rgba(155, 130, 63, 0.05) 100%)' }}>
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl relative z-10" style={{ borderColor: 'rgba(155, 130, 63, 0.2)', borderWidth: '1px' }}>
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-custom rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15 12C17.21 12 19 10.21 19 8C19 5.79 17.21 4 15 4C12.79 4 11 5.79 11 8C11 10.21 12.79 12 15 12ZM6 10V7H4V10H1V12H4V15H6V12H9V10H6ZM15 14C12.33 14 7 15.34 7 18V20H23V18C23 15.34 17.67 14 15 14Z"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-primary-custom">Qeydiyyat</h2>
          <p className="text-gray-600 mt-2">Yeni hesab yaradın</p>
        </div>
  <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-primary-custom mb-2">👤 Rol seçin</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "KOS" | "Investor")}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all bg-white border-primary-custom focus:ring-2"
              style={{ borderColor: 'rgba(155, 130, 63, 0.3)' }}
              required
            >
              <option value="">Rol Seçin</option>
              <option value="KOS">🏢 KOS</option>
              <option value="Investor">💼 İnvestor</option>
            </select>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-primary-custom mb-2">
              📧 E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all border-primary-custom focus:ring-2"
              style={{ borderColor: 'rgba(155, 130, 63, 0.3)' }}
              placeholder="E-mailinizi daxil edin"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-primary-custom mb-2">
              🔒 Şifrə
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all border-primary-custom focus:ring-2"
              style={{ borderColor: 'rgba(155, 130, 63, 0.3)' }}
              placeholder="Şifrəni daxil edin"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-bold text-primary-custom mb-2">
              🔐 Şifrəni Təkrarla
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all border-primary-custom focus:ring-2"
              style={{ borderColor: 'rgba(155, 130, 63, 0.3)' }}
              placeholder="Şifrəni təkrarlayın"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white py-3 rounded-lg transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{ backgroundColor: 'var(--primary-color)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(155, 130, 63, 0.9)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-color)'}
          >
            ✨ Qeydiyyatdan Keç
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Hesabınız var?{" "}
            <a href="/login" className="text-primary-custom hover:text-primary/80 font-bold underline">
              Giriş edin
            </a>
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-custom-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-primary-custom-20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-primary-custom-10 rounded-full animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default Register;
