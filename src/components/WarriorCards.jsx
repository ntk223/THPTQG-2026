import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Swords, Wind, Star, ChevronRight, X, Zap } from 'lucide-react';

const PRESET_CARDS = [
  {
    id: 'valedictorian',
    title: 'Thần Lực Thủ Khoa',
    mascot: 'Phượng Hoàng Lửa',
    emoji: '🔥',
    theme: 'amber',
    slogan: 'Khoa Bảng Đề Danh • Tự Tin Bứt Phá',
    gradient: 'from-amber-400 via-orange-400 to-amber-500',
    poem: 'Chúc bạn vững bước tựa Thái Sơn\nBút sắc văn thông, trí tuyệt vời\nSách đèn mười năm công mài giũa\nThành công vang dội, rạng muôn nơi!',
    stats: { will: 100, clarity: 98, luck: 95 },
    description: 'Năng lượng bứt phá cực đại dành cho sĩ tử quyết tâm chinh phục ngôi vị cao nhất, đạt điểm tuyệt đối.',
    boostType: 'will',
    icon: Crown,
    iconColor: 'text-amber-500 bg-amber-50 border-amber-100'
  },
  {
    id: 'zen',
    title: 'Tâm Trí Bất Biến',
    mascot: 'Rùa Thần Khải Huyền',
    emoji: '🐢',
    theme: 'emerald',
    slogan: 'Tâm Trí Tự Nhiên • Bình Tĩnh Chiến Thắng',
    gradient: 'from-emerald-400 via-teal-400 to-cyan-500',
    poem: 'Giữ lòng thanh thản tựa mây trôi\nÁp lực xua tan, nhẹ bước đời\nĐề khó, đề quen đều giải gọn\nMỉm cười chiến thắng nở trên môi!',
    stats: { will: 96, clarity: 100, luck: 97 },
    description: 'Năng lượng bình tâm, giải tỏa mọi căng thẳng. Giúp sĩ tử giữ được đầu óc minh mẫn nhất trước phòng thi.',
    boostType: 'clarity',
    icon: Star,
    iconColor: 'text-emerald-500 bg-emerald-50 border-emerald-100'
  },
  {
    id: 'luck',
    title: 'Cát Tường Vận Hội',
    mascot: 'Cá Chép Hóa Rồng',
    emoji: '🐉',
    theme: 'cyan',
    slogan: 'Vận May Hội Tụ • Thi Là Phải Đậu',
    gradient: 'from-cyan-400 via-blue-400 to-emerald-450',
    poem: 'Cá chép vượt sóng hóa rồng bay\nKho báu tri thức nắm trong tay\nVận may đưa lối, thần tài độ\nĐỗ đúng nguyện vọng, sướng mê say!',
    stats: { will: 97, clarity: 96, luck: 100 },
    description: 'Nhân đôi chỉ số may mắn. Phù hợp để sĩ tử khoanh lụi chuẩn xác, trúng tủ kiến thức và gặp nhiều thuận lợi.',
    boostType: 'luck',
    icon: Wind,
    iconColor: 'text-cyan-500 bg-cyan-50 border-cyan-100'
  },
  {
    id: 'miracle',
    title: 'Kỳ Tích Tỏa Sáng',
    mascot: 'Kỳ Lân Trí Tuệ',
    emoji: '✨',
    theme: 'purple',
    slogan: 'Vượt Mọi Giới Hạn • Tạo Nên Kỳ Tích',
    gradient: 'from-purple-400 via-pink-400 to-amber-400',
    poem: 'Kỳ lân dẫn lối bước vinh quang\nNăng lượng trào dâng, trí vững vàng\nMọi câu hỏi khó đều chinh phục\nTương lai rộng mở, bước thênh thang!',
    stats: { will: 99, clarity: 99, luck: 99 },
    description: 'Sự cân bằng hoàn hảo từ các linh vật cổ xưa, kích hoạt trạng thái thăng hoa cực hạn để làm bài xuất thần.',
    boostType: 'speed',
    icon: Swords,
    iconColor: 'text-purple-500 bg-purple-50 border-purple-100'
  }
];

export default function WarriorCards({ onApplyPreset }) {
  const [activeModalPreset, setActiveModalPreset] = useState(null);

  const handleApply = (preset) => {
    if (onApplyPreset) {
      onApplyPreset({
        mascot: preset.mascot,
        boostType: preset.boostType
      });
    }
    setActiveModalPreset(null);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 pb-4">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRESET_CARDS.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => setActiveModalPreset(card)}
              className="relative p-[1.5px] rounded-2xl bg-slate-200/80 hover:bg-gradient-to-r hover:from-amber-400 hover:to-orange-500 transition-all duration-300 hover:scale-[1.03] shadow-lg hover:shadow-2xl group overflow-hidden cursor-pointer"
            >
              {/* Card body wrapper */}
              <div className="w-full h-full p-6 rounded-2xl bg-white flex flex-col justify-between min-h-[340px] relative">
                {/* Visual gradient blob inside card */}
                <div className={`absolute -right-12 -top-12 w-24 h-24 rounded-full bg-gradient-to-br ${card.gradient} opacity-5 group-hover:scale-150 transition-transform duration-500`} />

                <div>
                  {/* Header info */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-3xl">{card.emoji}</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      {card.mascot}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-extrabold text-base text-slate-900 mb-1 group-hover:text-amber-500 transition-colors">
                    {card.title}
                  </h3>

                  {/* Slogan */}
                  <p className="text-[9px] font-extrabold tracking-wider uppercase text-slate-450 mb-3 leading-none">
                    {card.slogan}
                  </p>

                  {/* Text description */}
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-4">
                    {card.description}
                  </p>
                </div>

                {/* Card footer details */}
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="group-hover:translate-x-1 transition-transform">Lật xem bài thơ</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preset Details Modal */}
      <AnimatePresence>
        {activeModalPreset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalPreset(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-soft-xl border border-slate-100 z-10 p-6 flex flex-col"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveModalPreset(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Mascot Badge */}
              <div className="text-center mt-3">
                <span className="text-5xl block mb-3">{activeModalPreset.emoji}</span>
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 uppercase tracking-widest">
                  Linh vật: {activeModalPreset.mascot}
                </span>
                <h3 className="font-display font-black text-2xl text-slate-900 mt-3 mb-1">
                  {activeModalPreset.title}
                </h3>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-6">
                  {activeModalPreset.slogan}
                </p>
              </div>

              {/* Wish Poem */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6 text-center text-slate-700 shadow-inner">
                {activeModalPreset.poem.split('\n').map((line, idx) => (
                  <p key={idx} className="my-1.5 font-bold text-sm sm:text-base italic tracking-wide">
                    {line}
                  </p>
                ))}
              </div>

              {/* Attributes / Stats */}
              <div className="space-y-2.5 mb-6 text-xs px-2">
                <h4 className="font-extrabold text-[10px] uppercase tracking-wider text-slate-400 text-center mb-3">
                  Thuộc tính đặc trưng thẻ bài
                </h4>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-500">Quyết tâm & Ý chí:</span>
                  <span className="font-extrabold text-amber-500">{activeModalPreset.stats.will}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-500">Minh mẫn & Sáng suốt:</span>
                  <span className="font-extrabold text-emerald-500">{activeModalPreset.stats.clarity}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-500">May mắn & Thuận lợi:</span>
                  <span className="font-extrabold text-cyan-500">{activeModalPreset.stats.luck}%</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 mt-auto">
                <button
                  onClick={() => handleApply(activeModalPreset)}
                  className="w-full py-3 rounded-xl text-white font-bold bg-slate-900 hover:bg-slate-800 transition-all text-xs flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  Áp Dụng Cho Sĩ Tử Của Bạn
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `✨ Lời chúc Sĩ Tử 2026 - ${activeModalPreset.title}: \n\n"${activeModalPreset.poem}"\n\nChúc các sĩ tử vượt vũ môn xuất sắc!`
                    );
                    alert("Đã sao chép bài thơ lời chúc vào bộ nhớ tạm!");
                  }}
                  className="w-full py-3 rounded-xl font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all text-xs"
                >
                  Copy Bài Thơ Lời Chúc
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
