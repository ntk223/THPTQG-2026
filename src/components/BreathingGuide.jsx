import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, Eye } from 'lucide-react';

export default function BreathingGuide() {
  const [breathState, setBreathState] = useState('idle'); // 'idle', 'inhale', 'hold', 'exhale'
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (breathState === 'idle') return;

    let timer;
    if (secondsLeft > 0) {
      timer = setTimeout(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else {
      // Transition states
      if (breathState === 'inhale') {
        setBreathState('hold');
        setSecondsLeft(7);
      } else if (breathState === 'hold') {
        setBreathState('exhale');
        setSecondsLeft(8);
      } else if (breathState === 'exhale') {
        setBreathState('inhale');
        setSecondsLeft(4);
      }
    }

    return () => clearTimeout(timer);
  }, [breathState, secondsLeft]);

  const startBreathing = () => {
    setBreathState('inhale');
    setSecondsLeft(4);
  };

  const stopBreathing = () => {
    setBreathState('idle');
    setSecondsLeft(0);
  };

  const getStatusConfig = () => {
    switch (breathState) {
      case 'inhale':
        return { text: 'Hít Vào Chậm Rãi (Bằng Mũi)...', scale: 1.4, color: 'bg-emerald-400 border-emerald-300 shadow-glow-emerald', duration: 4 };
      case 'hold':
        return { text: 'Nín Thở & Giữ Tâm Trí Bình Tĩnh...', scale: 1.4, color: 'bg-amber-400 border-amber-300 shadow-glow-amber', duration: 7 };
      case 'exhale':
        return { text: 'Thở Ra Từ Từ (Bằng Miệng)...', scale: 1.0, color: 'bg-cyan-400 border-cyan-300 shadow-glow-cyan', duration: 8 };
      default:
        return { text: 'Sẵn sàng điều hòa hơi thở chiến binh', scale: 1.0, color: 'bg-slate-100 border-slate-200', duration: 0 };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="w-full p-6 rounded-2xl bg-white border border-slate-100 shadow-soft flex flex-col items-center">
      <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-6">
        Phương Pháp Thở Cân Bằng 4-7-8
      </h3>

      {/* Breathing Guide Ring */}
      <div className="h-40 flex items-center justify-center relative w-full mb-6">
        <motion.div
          animate={{
            scale: config.scale,
          }}
          transition={{
            duration: breathState === 'idle' ? 0.5 : config.duration,
            ease: "easeInOut"
          }}
          className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center transition-colors duration-500 relative ${config.color}`}
        >
          {/* Inner ring */}
          <div className="absolute inset-1.5 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
            {breathState !== 'idle' ? (
              <span className="font-display font-black text-xl text-slate-800 animate-pulse">
                {secondsLeft}s
              </span>
            ) : (
              <Eye className="w-6 h-6 text-slate-350" />
            )}
          </div>
        </motion.div>
      </div>

      {/* Action Text */}
      <div className="text-center h-6 mb-5">
        <p className="text-xs font-bold text-slate-700">
          {config.text}
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        {breathState === 'idle' ? (
          <button
            onClick={startBreathing}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-white font-bold bg-slate-900 hover:bg-slate-800 transition-all text-[11px] shadow-sm"
          >
            <Play className="w-3.5 h-3.5" />
            Bắt đầu tập thở
          </button>
        ) : (
          <button
            onClick={stopBreathing}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-slate-700 font-bold bg-slate-100 hover:bg-slate-200 transition-all text-[11px]"
          >
            <Square className="w-3.5 h-3.5 text-slate-500" />
            Dừng tập
          </button>
        )}
      </div>
    </div>
  );
}
