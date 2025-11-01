// src/pages/Login.tsx

import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"KOS" | "Investor" | "">(""); // Yeni state əlavə etdik
  // const navigate = useNavigate();

  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Bütün istifadəçiləri localStorage-dan götür
  //   type User = { email: string; password: string; role: "KOS" | "Investor" };
  //   let users: User[] = [];
  //   try {
  //     users = JSON.parse(localStorage.getItem("users") || "[]");
  //   } catch {
  //     users = [];
  //   }
  //   // Email və şifrəni yoxla
  //   const found = users.find((u) => u.email === email && u.password === password && u.role === role);
  //   if (found) {
  //     localStorage.setItem("user", JSON.stringify(found));
  //     navigate("/profile");
  //   } else {
  //     alert("Yanlış istifadəçi adı, şifrə və ya rol!");
  //   }
  // };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative" style={{ background: 'linear-gradient(135deg, rgba(155, 130, 63, 0.2) 0%, rgba(155, 130, 63, 0.05) 100%)' }}>
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl relative z-10" style={{ borderColor: 'rgba(155, 130, 63, 0.2)', borderWidth: '1px' }}>
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-custom rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L9 7V9C9 10.1 9.9 11 11 11V16L7.5 15.5C6.7 15.3 6.2 14.6 6 13.8L4.4 8.2C4.1 7.1 4.7 6 5.8 5.7C6.9 5.4 8 6 8.3 7.1L9.5 11.5L11 11V9C11 7.9 11.9 7 13 7H15C16.1 7 17 7.9 17 9V11L18.5 11.5L19.7 7.1C20 6 21.1 5.4 22.2 5.7C23.3 6 23.9 7.1 23.6 8.2L22 13.8C21.8 14.6 21.3 15.3 20.5 15.5L17 16V11C17 9.9 16.1 9 15 9H21Z"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-primary-custom">Giriş</h2>
          <p className="text-gray-600 mt-2">Hesabınıza daxil olun</p>
        </div>
        <form 
        // onSubmit={handleLogin} 
        className="space-y-6">
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
              placeholder="Şifrənizi daxil edin"
              required
            />
          </div>

          {/* Rol seçimi əlavə etdik */}
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

          <button
            type="submit"
            className="w-full text-white py-3 rounded-lg transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{ backgroundColor: 'var(--primary-color)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(155, 130, 63, 0.9)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-color)'}
          >
            🚀 Giriş Et
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Hesabınız yoxdur?{" "}
            <a href="/register" className="text-primary hover:text-primary/80 font-bold underline">
              Qeydiyyatdan keçin
            </a>
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-primary/20 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Login;
