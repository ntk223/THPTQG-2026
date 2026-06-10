import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import HeroCountdown from './components/HeroCountdown';
import EnergyCore from './components/EnergyCore';
import WarriorCards from './components/WarriorCards';
import AmbientPlayer from './components/AmbientPlayer';
import BreathingGuide from './components/BreathingGuide';
import FortuneDrawing from './components/FortuneDrawing';
import WishingWall from './components/WishingWall';
import { Sparkles } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [presetToApply, setPresetToApply] = useState(null);

  return (
    <div className="relative min-h-screen font-sans bg-gradient-to-br from-sky-50 via-amber-50 to-emerald-50 text-slate-800 flex flex-col justify-between">
      
      {/* Moving Futuristic Ambient Energy Fields & Rich Side Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-5%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-300/25 blur-[130px] animate-float-1" />
        <div className="absolute bottom-[-10%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-emerald-300/30 blur-[140px] animate-float-2" />
        <div className="absolute top-[30%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-cyan-300/25 blur-[120px] animate-float-3" />
        
        {/* Colorful decorative blur spheres to enrich the side areas */}
        <div className="absolute top-[12%] right-[-5%] w-[30vw] h-[30vw] rounded-full bg-amber-400/20 blur-[100px]" />
        <div className="absolute top-[55%] left-[-12%] w-[35vw] h-[35vw] rounded-full bg-cyan-400/25 blur-[110px]" />
        <div className="absolute top-[75%] right-[5%] w-[32vw] h-[32vw] rounded-full bg-pink-300/15 blur-[120px]" />
        
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      </div>

      {/* Floating 3D-feeling side margin decorations to prevent empty or pale sides */}
      <div className="hidden xl:block absolute left-8 top-[480px] pointer-events-none z-10">
        <motion.div 
          animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }} 
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }} 
          className="text-4xl filter drop-shadow opacity-45 select-none"
        >
          ✨
        </motion.div>
      </div>
      <div className="hidden xl:block absolute right-10 top-[880px] pointer-events-none z-10">
        <motion.div 
          animate={{ y: [0, 18, 0], rotate: [0, -8, 0] }} 
          transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut" }} 
          className="text-4xl filter drop-shadow opacity-50 select-none"
        >
          🛡️
        </motion.div>
      </div>
      <div className="hidden xl:block absolute left-10 top-[1350px] pointer-events-none z-10">
        <motion.div 
          animate={{ y: [0, -22, 0], rotate: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} 
          className="text-4xl filter drop-shadow opacity-45 select-none"
        >
          🎓
        </motion.div>
      </div>
      <div className="hidden xl:block absolute right-12 top-[1750px] pointer-events-none z-10">
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} 
          className="text-4xl filter drop-shadow opacity-40 select-none"
        >
          📚
        </motion.div>
      </div>
      <div className="hidden xl:block absolute left-10 top-[2250px] pointer-events-none z-10">
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }} 
          className="text-4xl filter drop-shadow opacity-50 select-none"
        >
          ☀️
        </motion.div>
      </div>
      <div className="hidden xl:block absolute right-8 top-[2750px] pointer-events-none z-10">
        <motion.div 
          animate={{ y: [0, 16, 0], rotate: [0, -7, 0] }} 
          transition={{ repeat: Infinity, duration: 5.6, ease: "easeInOut" }} 
          className="text-4xl filter drop-shadow opacity-45 select-none"
        >
          🔥
        </motion.div>
      </div>

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main App Content */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col min-h-screen"
        >
          {/* Main Sticky Header */}
          <header className="sticky top-0 z-35 bg-white/80 backdrop-blur-md border-b border-slate-200/55 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 to-emerald-450 flex items-center justify-center text-white shadow-soft">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-display font-extrabold text-lg tracking-tight text-slate-800">
                  SĨ TỬ <span className="text-amber-500">2026</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <AmbientPlayer />
                <div className="text-xs font-bold text-slate-405 uppercase tracking-wider font-mono hidden sm:block">
                  THPT QUỐC GIA 2026
                </div>
              </div>
            </div>
          </header>

          {/* Sticky Quick-Navigation Tab Bar */}
          <div className="sticky top-16 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200/50 shadow-soft-sm py-2">
            <div className="max-w-3xl mx-auto px-4 flex justify-between sm:justify-center gap-2 sm:gap-6 overflow-x-auto scrollbar-none py-1.5">
              <a
                href="#energy-station"
                className="px-4 py-1.5 rounded-full text-xs font-extrabold text-slate-655 bg-slate-50 border border-slate-100 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600 transition-all whitespace-nowrap flex items-center gap-1 shadow-sm"
              >
                ⚡️ Trạm Niềm Tin
              </a>
              <a
                href="#mental-health"
                className="px-4 py-1.5 rounded-full text-xs font-extrabold text-slate-655 bg-slate-50 border border-slate-100 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-600 transition-all whitespace-nowrap flex items-center gap-1 shadow-sm"
              >
                🧘 Giải Tỏa Tâm Lý
              </a>
              <a
                href="#warrior-cards"
                className="px-4 py-1.5 rounded-full text-xs font-extrabold text-slate-655 bg-slate-50 border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 transition-all whitespace-nowrap flex items-center gap-1 shadow-sm"
              >
                🛡️ Thẻ Bài Presets
              </a>
              <a
                href="#wishing-wall"
                className="px-4 py-1.5 rounded-full text-xs font-extrabold text-slate-655 bg-slate-50 border border-slate-100 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800 transition-all whitespace-nowrap flex items-center gap-1 shadow-sm"
              >
                📝 Bảng Ước Nguyện
              </a>
            </div>
          </div>

          {/* Main Content Sections */}
          <main className="flex-grow">
            {/* Hero Countdown Section - Sun rising sky gradient */}
            <div className="bg-gradient-to-b from-sky-100/50 via-amber-50/50 to-transparent border-b border-slate-200/20">
              <HeroCountdown />
            </div>

            {/* Interactive Energy Core Section - Amber gold board theme */}
            <section id="energy-station" className="py-10 bg-gradient-to-b from-amber-50/70 via-white/80 to-emerald-50/60 border-y border-amber-200/30 shadow-sm scroll-mt-28">
              <div className="max-w-3xl mx-auto text-center px-4 mb-6">
                <span className="px-3 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-100 text-amber-700 tracking-wider uppercase mb-1.5 inline-block">
                  Trạm Đúc Thẻ Bài Hộ Mệnh
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight uppercase tracking-tight">
                  TRẠM KÍCH HOẠT NIỀM TIN
                </h2>
                <p className="text-slate-550 text-xs sm:text-sm mt-2 font-medium">
                  Nhập thông tin sĩ tử bên trái và click chọn nút kích hoạt luồng sức mạnh để đúc Thẻ Bài Hộ Mệnh độc quyền!
                </p>
              </div>
              <EnergyCore presetToApply={presetToApply} />
            </section>

            {/* Mental Health Breathing & Fortune Drawing Section - Calm mint/cyan theme */}
            <section id="mental-health" className="py-10 bg-gradient-to-b from-emerald-50/50 via-cyan-50/40 to-blue-50/30 border-b border-cyan-200/20 scroll-mt-28">
              <div className="max-w-3xl mx-auto text-center px-4 mb-6">
                <span className="px-3 py-0.5 rounded-full text-[9px] font-extrabold bg-cyan-100 text-cyan-700 tracking-wider uppercase mb-1.5 inline-block">
                  Tâm Lý Phòng Thi & Quẻ May Mắn
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight uppercase tracking-tight">
                  CÁT TƯỜNG KHỞI SẮC • THƯ GIÃN GIỜ G
                </h2>
                <p className="text-slate-550 text-xs sm:text-sm mt-2 font-medium">
                  Điều hòa nhịp thở giải tỏa lo âu và bốc quẻ cát tường để tích lũy năng lượng tích cực trước giờ G.
                </p>
              </div>
              <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                <BreathingGuide />
                <FortuneDrawing />
              </div>
            </section>

            {/* Warrior Cards Section - Emerald to violet victory preset theme */}
            <section id="warrior-cards" className="py-12 bg-gradient-to-b from-blue-50/50 via-purple-50/30 to-amber-50/50 border-b border-indigo-100/20 scroll-mt-28">
              <div className="max-w-3xl mx-auto text-center px-4 mb-8">
                <span className="px-3 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 text-emerald-700 tracking-wider uppercase mb-1.5 inline-block">
                  Hành Trang Chiến Binh 2026
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight uppercase tracking-tight">
                  BỘ TẢI PRESETS LINH VẬT HỘ MỆNH
                </h2>
                <p className="text-slate-550 text-xs sm:text-sm mt-2 font-medium">
                  Bộ thẻ bài lời chúc mang thuộc tính đặc biệt đồng hành cùng sĩ tử vượt qua mọi giới hạn.
                </p>
              </div>
              <WarriorCards onApplyPreset={(preset) => setPresetToApply(preset)} />
            </section>

            {/* Wishing Wall Section - Gold boards scroll theme */}
            <section id="wishing-wall" className="py-12 bg-gradient-to-b from-amber-50/50 via-white/80 to-cyan-50/50 border-t border-amber-200/20 scroll-mt-28">
              <div className="max-w-3xl mx-auto text-center px-4 mb-8">
                <span className="px-3 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-100 text-amber-850 tracking-wider uppercase mb-1.5 inline-block">
                  Lưu Giữ Kỷ Niệm Thi Cử
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight uppercase tracking-tight">
                  BẢNG VÀNG ƯỚC NGUYỆN 2026
                </h2>
                <p className="text-slate-550 text-xs sm:text-sm mt-2 font-medium">
                  Gửi những lời cầu chúc ý nghĩa nhất từ trái tim tới các chiến binh chuẩn bị vượt vũ môn.
                </p>
              </div>
              <WishingWall />
            </section>
          </main>

          {/* Footer with credit */}
          <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-center">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded bg-gradient-to-tr from-amber-400 to-emerald-400 flex items-center justify-center text-white text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="font-display font-extrabold text-xs text-white tracking-widest uppercase">
                  Sĩ Tử 2026
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                © 2026 Cổng Năng Lượng Hộ Mệnh THPTQG.<br />
                Tác giả: <span className="text-amber-500 font-bold">Nguyễn Trung Kiên VNU - UET</span>
              </p>
            </div>
          </footer>

        </motion.div>
      )}

    </div>
  );
}

export default App;
