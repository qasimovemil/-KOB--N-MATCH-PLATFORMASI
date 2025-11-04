// src/components/Header.tsx

import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState<{ name?: string; email: string; role: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [kosOpen, setKosOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const getInitial = () => {
    if (!user) return "";
    if (user.name && user.name.length > 0) return user.name[0].toUpperCase();
    if (user.email && user.email.length > 0) return user.email[0].toUpperCase();
    return "U";
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <motion.header
      className="backdrop-blur shadow-md sticky top-0 z-50"
      style={{ backgroundColor: 'var(--primary-color)' }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, type: "spring" }}
    >
      <div className="max-w-8xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Link
            to={"/"}
            className="flex items-center"
          >
            {/* Ana loqo - ağ arxa fonla */}
            <div className="bg-white rounded-xl p-3 shadow-lg mr-3 border-2 border-white/20">
              <img className="w-18 h-auto" src="https://smb.gov.az/img/logo-az.svg" alt="SMB Logo" />
            </div>

            {/* Ehtiyat loqo - əgər yuxarıdakı işləməzsə */}
            {/* <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
           <svg className="w-8 h-8 text-white mr-2" fill="currentColor" viewBox="0 0 24 24">
             <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
           </svg>
           <span className="text-white font-bold text-lg">SMB</span>
         </div> */}
          </Link>
          <span className="hidden sm:block text-xl md:text-2xl font-bold text-white drop-shadow-lg">
            KOB-İN MATCH PLATFORMASI
          </span>
        </motion.div>

        {/* Navigation */}
  <nav className="flex gap-2 md:gap-4 items-center">
          {/* <Link to="/" className="font-bold text-base md:text-lg text-white hover:text-white/80">Ana Səhifə</Link> */}
          <div
            className="relative"
            onMouseEnter={() => setKosOpen(true)}
            onMouseLeave={() => setKosOpen(false)}
          >
            <Link to="/kos" className="text-white font-medium hover:underline hover:text-white/80">
              KOS-lar
            </Link>
            {/* Hover dropdown (no gap, anchored to bottom of trigger) */}
            <div
              className={`${kosOpen ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-150 absolute left-0 top-full w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50`}
            >
              <Link to="/kos" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">KOS Siyahısı</Link>
              <Link to="/kos/risk-calculator" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Risk Hesablayıcısı</Link>
              <Link to="/kos/investment-index" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">İnvestisiya İndeksi</Link>
              <Link to="/kos/innovation-efficiency" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">İnnovasiya Səmərəlilik İndeksi</Link>
            </div>
          </div>
          <Link to="/investor" className="text-white font-medium hover:underline hover:text-white/80">İnvestorlar</Link>
          <Link to="/match" className="text-white font-medium hover:underline hover:text-white/80">Uyğunlaşdırma</Link>
          <Link to="/documents" className="text-white/90 font-medium hover:underline hover:text-white">Sənədlər</Link>
          <Link to="/regional-risk" className="text-white/90 font-medium hover:underline hover:text-white">Risk Analizi</Link>
          <Link to="/admin" className="text-white/90 font-medium hover:underline hover:text-white">Admin</Link>
          <Link to="/resources" className="text-white/90 font-medium hover:underline hover:text-white">Resurslar</Link>
          <Link to="/profile" className="text-white/90 font-medium hover:underline hover:text-white">Profil</Link>
          {user ? (
            <div className="relative ml-4">
              {/* User Avatar Button */}
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-full transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-white text-primary flex items-center justify-center font-bold text-sm shadow">
                  {getInitial()}
                </div>
                <span className="hidden md:block font-medium text-white">{user.name || user.email.split('@')[0]}</span>
                <svg className={`w-4 h-4 text-white transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                        {getInitial()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name || 'İstifadəçi'}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full mt-1">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profil
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Çıxış
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 bg-white text-primary rounded-full hover:bg-gray-100 ml-2 font-bold transition-colors">Giriş</Link>
              <Link to="/register" className="ml-2 px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 font-bold transition-colors border border-white/30">Qeydiyyat</Link>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
