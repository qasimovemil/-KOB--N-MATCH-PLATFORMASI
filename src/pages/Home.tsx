
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
// React Icons
import { FaHandshake } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { HiShieldCheck, HiChevronLeft, HiChevronRight, HiArrowNarrowRight, HiLockClosed } from "react-icons/hi";
import { BsBullseye } from "react-icons/bs";
import { FiZap, FiMap, FiInfo, FiBarChart2 } from "react-icons/fi";
import AzerbaijanAdm1Map from "../components/AzerbaijanAdm1Map";


const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCluster, setSelectedCluster] = useState<string>("Bakı");
  
  const slides = [
    {
      title: "İnvestor • KOS",
      subtitle: "Matching Platforması",
      description: "KOS-lar və investorlar arasında uyğunluq tapın",
      description2: "İnvestisiya fürsətləri yaradın",
      image: "https://smb.gov.az/storage/3707/kobaner-(1).png",
      icon: (<FaHandshake className="w-10 h-10" />)
    },
    {
      title: "AI Əsaslı",
      subtitle: "Uyğunlaşdırma Sistemi",
      description: "Süni intellekt ilə ən uyğun partnyoru tapın",
      description2: "Dəqiq analiz və tövsiyələr",
      image: "https://smb.gov.az/storage/2747/ESAS-VERİSYA-2-(1).jpg",
      icon: (<RiRobot2Line className="w-10 h-10" />)
    },
    {
      title: "Güvənli və",
      subtitle: "Sürətli Platform",
      description: "Tam təhlükəsiz və məxfi məlumat mübadiləsi",
      description2: "Sürətli və effektiv əlaqələndirmə",
      image: "https://smb.gov.az/storage/6768/satis-sayt.png",
      icon: (<HiShieldCheck className="w-10 h-10" />)
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <main className="flex-1">
        <motion.section
          className="py-20 bg-primary text-black shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-black/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-black/30 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-20 w-16 h-16 bg-black/25 rounded-full animate-bounce"></div>
            <div className="absolute bottom-1/3 left-20 w-12 h-12 bg-black/15 rounded-full animate-pulse delay-500"></div>
          </div>
          
          {/* Slider Content */}
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="text-center lg:text-left">
                <motion.div
                  key={currentSlide}
                  className="mb-6"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-white/40 rounded-full mb-6 shadow-2xl border-2 border-white/30">
                    {slides[currentSlide].icon}
                  </div>
                </motion.div>
            
                
                <motion.h1
                  key={`title-${currentSlide}`}
                  className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl mb-4"
                  style={{ textShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(255,255,255,0.3)' }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, type: "spring" }}
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.div
                  key={`subtitle-${currentSlide}`}
                  className="text-3xl md:text-4xl font-bold mb-8"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  <span className="bg-white/80 text-primary px-6 py-3 rounded-full shadow-xl backdrop-blur-sm font-black border-2 border-white">{slides[currentSlide].subtitle}</span>
                </motion.div>

                <motion.p
                  key={`desc-${currentSlide}`}
                  className="mt-8 text-2xl md:text-3xl font-bold text-white"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(255,255,255,0.2)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  {slides[currentSlide].description}
                  <br />
                  {slides[currentSlide].description2}
                </motion.p>
                
                {/* Action Buttons - only show on first slide */}
                {currentSlide === 0 && (
                  <motion.div
                    className="mt-10 flex flex-col md:flex-row gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                  >
                    <motion.a
                      href="/kos"
                      className="inline-flex items-center justify-center bg-white text-primary py-4 px-8 rounded-full text-lg font-black shadow-2xl hover:bg-gray-50 hover:scale-110 transition-all duration-300 group border-2 border-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="mr-2 text-xl"></span>
                      KOS-lar üçün Başla
                      <HiArrowNarrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </motion.a>
                    
                    <motion.a
                      href="/investor"
                      className="inline-flex items-center justify-center bg-white text-primary py-4 px-8 rounded-full text-lg font-black shadow-2xl hover:bg-gray-50 hover:scale-110 transition-all duration-300 group border-2 border-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="mr-2 text-xl"></span>
                      İnvestorlar üçün Başla
                      <HiArrowNarrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </motion.a>
                  </motion.div>
                )}
              </div>
              
              {/* Image Content */}
              <div className="flex justify-center lg:justify-end">
                <motion.div
                  key={`image-${currentSlide}`}
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-black/20 backdrop-blur-sm p-2 border border-white/30">
                    <img
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title}
                      className="w-full h-80 md:h-96 object-contain rounded-2xl bg-white"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Im0xNzUgMTc1IDMwIDMwIDc1LTc1IDEyMCA5MFYxMDBIMTAwdjc1WiIgZmlsbD0iI0Q1RDhEQyIvPgo8L3N2Zz4K';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl pointer-events-none"></div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Slider Controls */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                onClick={prevSlide}
                className="p-4 bg-black/30 rounded-full hover:bg-black/50 transition-colors shadow-xl border border-white/40 hover:scale-110 transform"
              >
                <HiChevronLeft className="w-6 h-6 text-black" />
              </button>
              
              <div className="flex gap-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 shadow-lg ${
                      index === currentSlide 
                        ? 'bg-white scale-125 border-2 border-white/80' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="p-4 bg-black/30 rounded-full hover:bg-black/50 transition-colors shadow-xl border border-white/40 hover:scale-110 transform"
              >
                <HiChevronRight className="w-6 h-6 text-black" />
              </button>
            </div>
            
            {/* Stats section */}
            <motion.div
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
                <div className="mb-2"><BsBullseye className="mx-auto text-4xl" /></div>
                <div className="text-2xl font-black mt-2 text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>AI Match</div>
                <div className="text-lg font-bold text-black/90">Ağıllı Uyğunlaşdırma</div>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
                <div className="mb-2"><FiZap className="mx-auto text-4xl" /></div>
                <div className="text-2xl font-black mt-2 text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Sürətli</div>
                <div className="text-lg font-bold text-black/90">Tez və Effektiv</div>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
                <div className="mb-2"><HiLockClosed className="mx-auto text-4xl" /></div>
                <div className="text-2xl font-black mt-2 text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Güvənli</div>
                <div className="text-lg font-bold text-black/90">Təhlükəsiz Platform</div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Risk Analizi (İnteraktiv Xəritə) */}
        <motion.section
          className="py-14 bg-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-6 flex items-center gap-2">
              <FiMap className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Risk Analizi</h2>
            </div>
            <p className="text-gray-600 mb-8 flex items-start gap-2">
              <FiInfo className="w-5 h-5 mt-0.5 text-primary" />
              Xəritədən bir bölgəyə klikləyin və seçilmiş region üzrə qısa xülasəyə baxın. Ətraflı analiz üçün Regional Risk səhifəsinə keçid edin.
            </p>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Xəritə */}
              <div className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
                <AzerbaijanAdm1Map
                  width={900}
                  height={460}
                  selectedName={selectedCluster}
                  onRegionClick={(name) => setSelectedCluster(name)}
                />
              </div>

              {/* Seçilmiş Region Kartı */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Seçilmiş Region</h3>
                  <span className="inline-flex items-center gap-1 text-sm text-primary">
                    <FiBarChart2 />
                    Qısa baxış
                  </span>
                </div>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary">{selectedCluster}</div>
                  <p className="text-sm text-gray-600 mt-1">Xəritədən başqa region seçərək dəyişə bilərsiniz.</p>
                </div>
                <div className="mt-6">
                  <a
                    href="/regional-risk"
                    className="inline-flex items-center justify-center w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:opacity-95 transition"
                  >
                    Regional Risk Analizi
                    <HiArrowNarrowRight className="w-5 h-5 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="py-16 bg-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-8">Platforma Üzərindəki Əsas Xüsusiyyətlər</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "KOS-lar üçün Modul",
                  desc: "KOS-ların şirkət profilləri, layihə yükləmə və innovasiya göstəriciləri.",
                  color: "from-primary/20 to-primary/10"
                },
                {
                  title: "İnvestorlar üçün Modul",
                  desc: "İnvestorların maraq sahələri, sərmayə həcmi, və risk profilini göstərən modul.",
                  color: "from-primary/30 to-primary/15"
                },
                {
                  title: "AI Əsaslı Uyğunlaşdırma",
                  desc: "Süni intellekt vasitəsilə investor və KOS-ların uyğunluq balını hesablayan sistem.",
                  color: "from-primary/25 to-primary/5"
                }
              ].map((f, i) => (
                <motion.div
                  key={f.title}
                  className={`p-6 rounded-xl shadow-xl bg-gradient-to-br ${f.color} hover:scale-105 transition-all duration-300`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.2 + i * 0.2, duration: 0.7, type: "spring" }}
                >
                  <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                  <p className="text-lg text-gray-700">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
    </div>
  );
  
};

export default Home;
