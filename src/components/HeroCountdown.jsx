import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AnimatedNumber({ value }) {
  return (
    <div className="relative overflow-hidden h-10 sm:h-14 lg:h-18 w-7 sm:w-9 lg:w-11 flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 35, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -35, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="absolute font-display font-black text-2xl sm:text-4xl lg:text-5xl text-slate-800"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function CountdownCard({ value, label }) {
  const paddedValue = value.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center p-2 sm:p-4 rounded-2xl bg-gradient-to-br from-white/95 via-amber-50/20 to-emerald-50/20 border border-emerald-200/50 shadow-soft w-18 sm:w-24 lg:w-28 relative">
      {/* Soft decorative shadow boundary */}
      <div className="flex justify-center">
        <AnimatedNumber value={paddedValue[0]} />
        <AnimatedNumber value={paddedValue[1]} />
      </div>
      <span className="text-[10px] sm:text-xs font-bold text-slate-400 mt-1.5 uppercase tracking-widest">{label}</span>
    </div>
  );
}

export default function HeroCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // THPTQG 2026 Date (Assume June 11, 2026 at 07:30:00 AM)
    const examDate = new Date('2026-06-11T07:30:00+07:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = examDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 sm:py-16 text-center max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        {/* Large Gradient Title */}
        <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-8">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 bg-clip-text text-transparent">
            KỶ NGUYÊN 2026: VƯỢT QUA GIỚI HẠN BẢN THÂN
          </span>
        </h1>

        {/* Countdown Grid */}
        <div className="flex justify-center items-center space-x-1.5 sm:space-x-3.5 mb-8">
          <CountdownCard value={timeLeft.days} label="Ngày" />
          <span className="font-display font-extrabold text-slate-300 text-lg sm:text-2xl">:</span>
          <CountdownCard value={timeLeft.hours} label="Giờ" />
          <span className="font-display font-extrabold text-slate-300 text-lg sm:text-2xl">:</span>
          <CountdownCard value={timeLeft.minutes} label="Phút" />
          <span className="font-display font-extrabold text-slate-300 text-lg sm:text-2xl">:</span>
          <CountdownCard value={timeLeft.seconds} label="Giây" />
        </div>

        {/* Quote */}
        <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-lg leading-relaxed italic">
          "Sự quyết thắng không chỉ là điểm số, mà là bản lĩnh chiến binh bước qua vùng an toàn."
        </p>
      </motion.div>
    </section>
  );
}
