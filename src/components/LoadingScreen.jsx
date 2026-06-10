import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; // 3 seconds total
    const intervalTime = 30; // 30ms interval
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const delay = setTimeout(() => {
        if (onComplete) onComplete();
      }, 500); // Small pause at 100% to let the user see the final state
      return () => clearTimeout(delay);
    }
  }, [progress, onComplete]);

  // Status text based on percentage
  const getStatusText = () => {
    const p = Math.round(progress);
    if (p <= 30) return "Đang nạp năng lượng tích cực...";
    if (p <= 70) return "Kích hoạt tư duy minh mẫn...";
    if (p < 100) return "Sẵn sàng bứt phá giới hạn...";
    return "HỆ THỐNG ĐÃ SẴN SÀNG!";
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{ 
        opacity: 0, 
        y: -100,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50"
    >
      <div className="flex flex-col items-center w-full max-w-sm px-6 text-center">
        {/* Pulsing & Orbiting Lightning Icon */}
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: 360
          }}
          transition={{ 
            scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: 12, ease: "linear" }
          }}
          className="mb-8 text-amber-500"
        >
          <Zap className="w-16 h-16 fill-amber-400 stroke-amber-500 filter drop-shadow-[0_0_15px_rgba(245,158,11,0.55)]" />
        </motion.div>

        {/* Progress Bar (Emerald/Mint Green) */}
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden mb-4 border border-slate-300/20">
          <div 
            className="h-full bg-emerald-400 transition-all duration-100 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress text and percentage status */}
        <div className="flex justify-between w-full mb-3 text-[11px] font-mono font-bold text-slate-400">
          <span>{getStatusText()}</span>
          <span className="text-emerald-500 font-bold">{Math.min(Math.round(progress), 100)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
