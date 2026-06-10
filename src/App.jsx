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
    <div className="relative min-h-screen font-sans bg-slate-50 overflow-x-hidden text-slate-800 flex flex-col justify-between">
      
      {/* Moving Futuristic Ambient Energy Fields */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-15%] w-[50vw] h-[50vw] rounded-full bg-amber-200/20 blur-[120px] animate-float-1" />
        <div className="absolute bottom-[-10%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-emerald-200/20 blur-[130px] animate-float-2" />
        <div className="absolute top-[35%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-cyan-200/20 blur-[110px] animate-float-3" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </div>

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main App Container */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col min-h-screen"
        >
          {/* Header */}
          <header className="sticky top-0 z-30 glass backdrop-blur-md border-b border-slate-200/50 shadow-sm">
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
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono hidden sm:block">
                  THPT QUỐC GIA 2026
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Sections */}
          <main className="flex-grow">
            {/* Hero Countdown Section */}
            <HeroCountdown />

            {/* Interactive Energy Core Section */}
            <section className="py-12 bg-white/40 border-y border-slate-200/40">
              <div className="max-w-3xl mx-auto text-center px-4 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-700 tracking-wider uppercase">
                  TRẠM KÍCH HOẠT NIỀM TIN
                </span>
                <p className="text-slate-500 text-xs sm:text-sm mt-2 font-medium">
                  Nhấn kích hoạt các trạng thái năng lượng phía dưới để xoa dịu áp lực, tiếp thêm bản lĩnh chiến đấu!
                </p>
              </div>
              <EnergyCore presetToApply={presetToApply} />
            </section>

            {/* Mental Health Breathing & Fortune Drawing Section */}
            <section className="py-12 bg-slate-50/30 border-b border-slate-200/40">
              <div className="max-w-3xl mx-auto text-center px-4 mb-8">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-cyan-100 text-cyan-700 tracking-wider uppercase">
                  Tâm Lý Phòng Thi • Cát Tường Khởi Sắc
                </span>
                <p className="text-slate-500 text-xs sm:text-sm mt-2 font-medium">
                  Điều hòa nhịp thở giải tỏa lo âu và bốc quẻ cát tường để tích lũy năng lượng tích cực trước giờ G.
                </p>
              </div>
              <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                <BreathingGuide />
                <FortuneDrawing />
              </div>
            </section>

            {/* Warrior Cards Section */}
            <section className="py-16 bg-slate-50/50">
              <div className="max-w-3xl mx-auto text-center px-4 mb-6">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-700 tracking-wider uppercase">
                  HÀNH TRANG CHIẾN BINH
                </span>
                <p className="text-slate-500 text-xs sm:text-sm mt-2 font-medium">
                  Bộ thẻ bài lời chúc mang thuộc tính đặc biệt đồng hành cùng sĩ tử vượt qua mọi giới hạn.
                </p>
              </div>
              <WarriorCards onApplyPreset={(preset) => setPresetToApply(preset)} />
            </section>

            {/* Wishing Wall Section */}
            <section className="py-16 bg-white/40 border-t border-slate-200/40">
              <div className="max-w-3xl mx-auto text-center px-4 mb-6">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-850 tracking-wider uppercase">
                  Bảng Vàng Ước Nguyện
                </span>
                <p className="text-slate-500 text-xs sm:text-sm mt-2 font-medium">
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
