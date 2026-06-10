import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Zap, Shield, Sparkles, User, Hash, School, Award, Download, Share2 } from 'lucide-react';

const MASCOTS = {
  'Phượng Hoàng Lửa': { emoji: '🔥', textColor: 'text-amber-500', stats: { will: 100, clarity: 95, luck: 90 } },
  'Rùa Thần Khải Huyền': { emoji: '🐢', textColor: 'text-emerald-500', stats: { will: 95, clarity: 100, luck: 95 } },
  'Cá Chép Hóa Rồng': { emoji: '🐉', textColor: 'text-cyan-500', stats: { will: 90, clarity: 95, luck: 100 } },
  'Kỳ Lân Trí Tuệ': { emoji: '✨', textColor: 'text-purple-500', stats: { will: 99, clarity: 99, luck: 99 } }
};

const WISHES = {
  will: {
    title: "Bản Lĩnh",
    text: "Hãy bước vào phòng thi với tâm thế của một người chiến thắng. Kiến thức đã có, bản lĩnh đã vững, giờ chỉ còn chờ kết quả 'xịn' thôi. Quyết chiến, quyết thắng!",
    icon: Shield,
    color: "text-amber-500"
  },
  victory: {
    title: "Quyết Thắng",
    text: "Chiến đấu hết mình vì mục tiêu tuổi 18 nhé! Chúc cậu có một kỳ thi an toàn, chất lượng và chiến thắng rực rỡ!",
    icon: Sparkles,
    color: "text-emerald-500"
  },
  speed: {
    title: "Tốc Độ",
    text: "Đề khó không nản, đề ngắn không kiêu. Chúc bạn tôi làm bài 'nhanh - gọn - chính xác' và ghi tên mình vào danh sách thủ khoa!",
    icon: Zap,
    color: "text-cyan-500"
  }
};

export default function EnergyCore({ presetToApply }) {
  const [name, setName] = useState('');
  const [sbd, setSbd] = useState('');
  const [nv1, setNv1] = useState('');
  const [selectedMascot, setSelectedMascot] = useState('Phượng Hoàng Lửa');
  const [selectedKey, setSelectedKey] = useState(null); // 'will', 'victory', 'speed'
  const [activatedCard, setActivatedCard] = useState(null);

  const nameInputRef = useRef(null);

  // Auto-fill from preset cards clicked in WarriorCards
  useEffect(() => {
    if (presetToApply) {
      setSelectedMascot(presetToApply.mascot);
      if (presetToApply.boostType) {
        setSelectedKey(presetToApply.boostType);
      }
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }
  }, [presetToApply]);

  // Synthesize custom arpeggio sound
  const playActivationSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;

      // Ascending major arpeggio chime
      const freqs = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = index % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.15);

        gain.gain.setValueAtTime(0.15, now + index * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.15 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + index * 0.15);
        osc.stop(now + index * 0.15 + 0.65);
      });
    } catch (e) {
      console.warn("Audio Context blocked or unsupported:", e);
    }
  };

  const handleActivate = (key) => {
    if (!name.trim()) {
      alert("Vui lòng nhập tên sĩ tử để kích hoạt thẻ bài!");
      if (nameInputRef.current) nameInputRef.current.focus();
      return;
    }

    setSelectedKey(key);
    playActivationSound();

    // Confetti burst
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#34d399', '#f472b6', '#22d3ee']
    });

    // Save activated card data
    const mascotInfo = MASCOTS[selectedMascot];
    setActivatedCard({
      name: name.trim().toUpperCase(),
      sbd: sbd.trim() || '2026-THT',
      nv1: nv1.trim() || 'ĐẠI HỌC MƠ ƯỚC',
      mascot: selectedMascot,
      emoji: mascotInfo.emoji,
      stats: { ...mascotInfo.stats },
      wishType: key
    });
  };

  // Canvas Exporter Code
  const downloadCardImage = () => {
    if (!activatedCard) return;

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    // Gradient background based on boost type
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 600);
    if (activatedCard.wishType === 'will') {
      bgGrad.addColorStop(0, '#fef3c7'); // amber 100
      bgGrad.addColorStop(1, '#f59e0b'); // amber 500
    } else if (activatedCard.wishType === 'victory') {
      bgGrad.addColorStop(0, '#ecfdf5'); // emerald 50
      bgGrad.addColorStop(1, '#10b981'); // emerald 500
    } else {
      bgGrad.addColorStop(0, '#ecfeff'); // cyan 50
      bgGrad.addColorStop(1, '#06b6d4'); // cyan 500
    }

    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 400, 600);

    // Decorative cyber grid background
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 400; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 600);
      ctx.stroke();
    }
    for (let j = 0; j < 600; j += 40) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(400, j);
      ctx.stroke();
    }

    // Outer card border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, 380, 580);

    // Inner Glass Card
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.beginPath();
    ctx.roundRect(25, 25, 350, 550, 24);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw header ribbon
    ctx.fillStyle = '#1e293b'; // slate 800
    ctx.beginPath();
    ctx.roundRect(40, 40, 320, 45, 12);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('CORE HỘ MỆNH CHIẾN BINH 2026', 200, 67);

    // Mascot Emoji Area
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(200, 155, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.font = '45px Arial';
    ctx.fillText(activatedCard.emoji, 200, 172);

    // Mascot Name Label
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(activatedCard.mascot, 200, 222);

    // Divider
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, 238);
    ctx.lineTo(350, 238);
    ctx.stroke();

    // Candidate Info Labels
    ctx.textAlign = 'left';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#64748b'; // slate 500
    ctx.fillText('SĨ TỬ CHIẾN BINH', 50, 262);
    ctx.fillText('SỐ BÁO DANH', 50, 317);
    ctx.fillText('NGUYỆN VỌNG 1', 50, 372);

    // Candidate Info Values
    ctx.fillStyle = '#0f172a'; // slate 900
    ctx.font = 'black 22px sans-serif';
    // Draw Name
    ctx.fillText(activatedCard.name, 50, 287);
    ctx.font = 'bold 14px monospace';
    // Draw SBD
    ctx.fillText(activatedCard.sbd, 50, 340);
    // Draw NV1
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(activatedCard.nv1, 50, 395);

    // Divider before stats
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.beginPath();
    ctx.moveTo(50, 415);
    ctx.lineTo(350, 415);
    ctx.stroke();

    // Stats Bar drawing helper
    const drawStatBar = (label, value, yPos, barColor) => {
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(label, 50, yPos);
      ctx.textAlign = 'right';
      ctx.fillText(`${value}%`, 350, yPos);
      ctx.textAlign = 'left';

      // Bar container
      ctx.fillStyle = '#f1f5f9';
      ctx.beginPath();
      ctx.roundRect(50, yPos + 6, 300, 7, 4);
      ctx.fill();

      // Filled bar
      ctx.fillStyle = barColor;
      ctx.beginPath();
      ctx.roundRect(50, yPos + 6, (value / 100) * 300, 7, 4);
      ctx.fill();
    };

    drawStatBar('QUYẾT TÂM & Ý CHÍ', activatedCard.stats.will, 442, '#f59e0b');
    drawStatBar('MINH MẪN & SÁNG SUỐT', activatedCard.stats.clarity, 477, '#10b981');
    drawStatBar('MAY MẮN & THUẬN LỢI', activatedCard.stats.luck, 512, '#06b6d4');

    // Footer signature / Credit
    ctx.fillStyle = '#94a3b8'; // slate 400
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('TÁC GIẢ: NGUYỄN TRUNG KIÊN VNU - UET', 200, 555);

    // Trigger PNG Download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `TheBaiHomenh_${activatedCard.name}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* Left Column: Form & Selection */}
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100/80 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="font-display font-extrabold text-base text-slate-800 uppercase tracking-wider">
              Cấu hình năng lượng hộ mệnh
            </h2>
          </div>

          <div className="space-y-4">
            {/* Input Name */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase mb-2">
                <User className="w-3.5 h-3.5" />
                Tên Sĩ Tử (Bắt buộc)
              </label>
              <input
                id="candidate-name"
                ref={nameInputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập họ và tên..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all bg-slate-50/50"
              />
            </div>

            {/* Grid for SBD and NV1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase mb-2">
                  <Hash className="w-3.5 h-3.5" />
                  Số Báo Danh (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={sbd}
                  onChange={(e) => setSbd(e.target.value)}
                  placeholder="Ví dụ: 2026-THT08"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all bg-slate-50/50"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase mb-2">
                  <School className="w-3.5 h-3.5" />
                  Nguyện Vọng 1 (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={nv1}
                  onChange={(e) => setNv1(e.target.value)}
                  placeholder="Ví dụ: ĐH Quốc Gia HN"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all bg-slate-50/50"
                />
              </div>
            </div>

            {/* Mascot Choice */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase block mb-2">
                Chọn linh vật hộ mệnh chiến hữu
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {Object.keys(MASCOTS).map((mascotName) => (
                  <button
                    key={mascotName}
                    type="button"
                    onClick={() => setSelectedMascot(mascotName)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all duration-200 ${selectedMascot === mascotName
                        ? 'border-amber-400 bg-amber-50/50 ring-2 ring-amber-100'
                        : 'border-slate-100 hover:border-slate-200 bg-slate-50/20'
                      }`}
                  >
                    <span className="text-xs font-bold text-slate-700">{mascotName}</span>
                    <span className="text-2xl">{MASCOTS[mascotName].emoji}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Activation Buttons */}
          <div className="pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-500 uppercase block mb-3">
              Kích hoạt trạng thái lời chúc quyết thắng
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleActivate('will')}
                className={`py-3 px-4 rounded-xl border font-bold text-xs tracking-wider transition-all duration-300 border-amber-350 hover:bg-amber-500 hover:text-white ${selectedKey === 'will' ? 'bg-amber-500 text-white border-amber-500 shadow-glow-amber' : 'bg-white text-slate-700'
                  }`}
              >
                KÍCH HOẠT BẢN LĨNH
              </button>
              <button
                type="button"
                onClick={() => handleActivate('victory')}
                className={`py-3 px-4 rounded-xl border font-bold text-xs tracking-wider transition-all duration-300 border-emerald-300 hover:bg-emerald-400 hover:text-white ${selectedKey === 'victory' ? 'bg-emerald-400 text-white border-emerald-400 shadow-glow-emerald' : 'bg-white text-slate-700'
                  }`}
              >
                KÍCH HOẠT QUYẾT THẮNG
              </button>
              <button
                type="button"
                onClick={() => handleActivate('speed')}
                className={`py-3 px-4 rounded-xl border font-bold text-xs tracking-wider transition-all duration-300 border-cyan-400 hover:bg-cyan-500 hover:text-white ${selectedKey === 'speed' ? 'bg-cyan-500 text-white border-cyan-500 shadow-glow-cyan' : 'bg-white text-slate-700'
                  }`}
              >
                KÍCH HOẠT TỐC ĐỘ
              </button>
            </div>
          </div>

          {/* Wish content show inside Glassmorphic panel */}
          <div className="relative min-h-[90px] rounded-2xl glass-thick p-4 border border-white/60 shadow-soft flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-500" />
            <AnimatePresence mode="wait">
              {selectedKey ? (
                <motion.div
                  key={selectedKey}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center max-w-md"
                >
                  <p className="text-slate-700 font-semibold text-xs sm:text-sm leading-relaxed italic">
                    “ {WISHES[selectedKey].text} ”
                  </p>
                </motion.div>
              ) : (
                <div className="text-slate-400 text-xs font-semibold text-center italic">
                  Nhập thông tin rồi nhấn kích hoạt một trong ba luồng sức mạnh phía trên!
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Holographic Warrior Card Render */}
        <div className="flex flex-col items-center justify-center h-full min-h-[460px]">
          <AnimatePresence mode="wait">
            {activatedCard ? (
              <motion.div
                key="card"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-full max-w-sm flex flex-col items-center"
              >
                {/* Physical Card Mockup UI */}
                <div
                  className={`relative w-full aspect-[2/3] rounded-3xl p-5 border-4 border-white shadow-soft-xl overflow-hidden flex flex-col justify-between select-none ${activatedCard.wishType === 'will'
                      ? 'bg-gradient-to-b from-amber-100 to-amber-500'
                      : activatedCard.wishType === 'victory'
                        ? 'bg-gradient-to-b from-emerald-100 to-emerald-500'
                        : 'bg-gradient-to-b from-cyan-100 to-cyan-500'
                    }`}
                >
                  {/* Cyber Grid background */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />

                  {/* Inner card content glass body */}
                  <div className="w-full h-full bg-white/75 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between border border-white/80 relative z-10">

                    {/* Header Ribbon */}
                    <div className="w-full py-1.5 px-3 bg-slate-900 rounded-lg text-center">
                      <span className="font-mono text-[9px] font-bold text-white tracking-widest">
                        CORE HỘ MỆNH CHIẾN BINH 2026
                      </span>
                    </div>

                    {/* Mascot Area */}
                    <div className="flex flex-col items-center mt-3">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md text-3xl">
                        {activatedCard.emoji}
                      </div>
                      <span className="text-xs font-bold text-slate-800 mt-2">
                        {activatedCard.mascot}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] bg-slate-200/60 my-2" />

                    {/* Candidate values */}
                    <div className="space-y-2.5">
                      <div>
                        <span className="text-[9px] font-bold text-slate-450 uppercase block">Sĩ tử chiến binh</span>
                        <span className="font-display font-extrabold text-lg sm:text-xl text-slate-800 tracking-tight leading-tight uppercase truncate block">
                          {activatedCard.name}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[9px] font-bold text-slate-450 uppercase block">SBD</span>
                          <span className="text-xs font-bold text-slate-800 font-mono truncate block">
                            {activatedCard.sbd}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-450 uppercase block">Nguyện vọng 1</span>
                          <span className="text-xs font-bold text-slate-800 truncate block">
                            {activatedCard.nv1}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] bg-slate-200/60 my-2" />

                    {/* Stat Progress Bars */}
                    <div className="space-y-1.5 text-[10px]">
                      <div>
                        <div className="flex justify-between font-bold text-slate-600">
                          <span>Ý chí</span>
                          <span>{activatedCard.stats.will}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-0.5">
                          <div className="h-full bg-amber-500" style={{ width: `${activatedCard.stats.will}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between font-bold text-slate-600">
                          <span>Minh mẫn</span>
                          <span>{activatedCard.stats.clarity}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-0.5">
                          <div className="h-full bg-emerald-500" style={{ width: `${activatedCard.stats.clarity}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between font-bold text-slate-600">
                          <span>May mắn</span>
                          <span>{activatedCard.stats.luck}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-0.5">
                          <div className="h-full bg-cyan-500" style={{ width: `${activatedCard.stats.luck}%` }} />
                        </div>
                      </div>
                    </div>

                    {/* Signature */}
                    <div className="text-center pt-2 mt-1 border-t border-slate-100">
                      <span className="text-[8px] font-mono text-slate-400 font-semibold tracking-wider">
                        NTK
                      </span>
                    </div>

                  </div>
                </div>

                {/* Exporter actions */}
                <div className="flex gap-3 mt-4 w-full">
                  <button
                    onClick={downloadCardImage}
                    className="flex-1 py-3 px-4 rounded-xl text-white font-bold bg-amber-500 hover:bg-amber-600 transition-all text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    Tải Ảnh Thẻ Bài
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `✨ Tớ vừa kích hoạt Thẻ Bài Hộ Mệnh THPTQG 2026 cho sĩ tử ${activatedCard.name} với Linh Vật ${activatedCard.mascot}. Chúc tất cả các chiến binh tuổi 18 quyết chiến quyết thắng!`
                      );
                      alert("Đã sao chép link chia sẻ lời chúc!");
                    }}
                    className="py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5"
                  >
                    <Share2 className="w-4 h-4 text-slate-400" />
                    Chia Sẻ
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-sm aspect-[2/3] rounded-3xl bg-slate-100 border border-dashed border-slate-350 flex flex-col items-center justify-center p-6 text-center text-slate-400 shadow-inner"
              >
                <div className="w-14 h-14 rounded-full bg-slate-200/50 flex items-center justify-center text-slate-400 mb-3 animate-pulse">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-sm text-slate-600 mb-1">
                  Đang Chờ Năng Lượng
                </h3>
                <p className="text-xs max-w-xs leading-relaxed">
                  Nhập thông tin sĩ tử bên trái và click chọn nút kích hoạt luồng sức mạnh để đúc Thẻ Bài Hộ Mệnh độc quyền!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
