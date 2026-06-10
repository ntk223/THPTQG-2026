import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const FORTUNES = [
  { type: "Đại Cát", title: "Ôn Gì Trúng Nấy", text: "Trực giác chiến binh đang ở mức tối đa. Hôm nay mở trang sách nào ôn tập, đề thi ngày mai sẽ rơi trúng ngay câu đó. Đỉnh của chóp!" },
  { type: "Thượng Cát", title: "Giám Thị Siêu Dễ Thương", text: "Quẻ bói nói rằng phòng thi của bạn sẽ tràn ngập năng lượng ôn hòa. Thầy cô coi thi cực kỳ vui vẻ, tạo tâm lý thoải mái nhất cho bạn." },
  { type: "Cát Tường", title: "Khoanh Bừa Trúng Lớn", text: "Khi gặp câu khó ngoài tầm hiểu biết, thần may mắn sẽ mượn tay bạn để khoanh trúng đáp án chính xác. Hãy tin vào cảm giác đầu tiên!" },
  { type: "Đại Cát", title: "Đề Cực Ngắn - Làm Cực Nhanh", text: "Đề thi sẽ tinh gọn, rõ ràng, không đánh đố lắt léo. Bạn giải toán như gió cuốn, viết văn tuôn trào cảm xúc!" },
  { type: "Thượng Cát", title: "Nguyện Vọng 1 Vẫy Gọi", text: "Cánh cổng trường đại học hằng mơ ước đã mở hé đón chờ bạn. Mọi sự nỗ lực của bạn sắp gặt hái quả ngọt xịn nhất." },
  { type: "Cát Tường", title: "Chiến Hữu Đồng Lòng", text: "Bạn sẽ nhận được sự ủng hộ và những lời khích lệ ấm áp từ gia đình và bạn bè, tạo nên bệ đỡ vững chắc vượt qua thử thách." }
];

export default function FortuneDrawing() {
  const [isShaking, setIsShaking] = useState(false);
  const [drawnFortune, setDrawnFortune] = useState(null);

  const drawFortune = () => {
    setIsShaking(true);
    setDrawnFortune(null);

    setTimeout(() => {
      setIsShaking(false);
      const randomIdx = Math.floor(Math.random() * FORTUNES.length);
      setDrawnFortune(FORTUNES[randomIdx]);

      // Fire celebratory confetti
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.75 },
        colors: ['#fbbf24', '#34d399', '#f472b6']
      });
    }, 1200); // Shake duration
  };

  return (
    <div className="w-full p-6 rounded-2xl bg-white border border-slate-100 shadow-soft flex flex-col items-center">
      <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-6">
        Quẻ Bói Cát Tường Sĩ Tử
      </h3>

      <div className="h-40 flex items-center justify-center relative w-full mb-5">
        <AnimatePresence mode="wait">
          {isShaking ? (
            <motion.div
              key="shaking"
              animate={{
                rotate: [-18, 18, -18, 18, -18, 18, -18, 0],
                y: [0, -10, 0, -10, 0, -10, 0]
              }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="text-5xl cursor-default"
            >
              🏮
            </motion.div>
          ) : drawnFortune ? (
            <motion.div
              key="fortune"
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -15 }}
              className="text-center px-2"
            >
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-100 text-amber-800 uppercase tracking-widest">
                Quẻ: {drawnFortune.type}
              </span>
              <h4 className="font-display font-black text-slate-800 text-base mt-2 mb-1.5">
                {drawnFortune.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[270px]">
                {drawnFortune.text}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center text-slate-400 text-center"
            >
              <span className="text-5xl mb-2">🎋</span>
              <span className="text-[11px] font-semibold text-slate-450">Ống quẻ may mắn đang chờ bạn</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={drawFortune}
        disabled={isShaking}
        className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-white font-bold bg-slate-900 hover:bg-slate-800 disabled:bg-slate-350 transition-all text-[11px]"
      >
        {drawnFortune ? <RefreshCw className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
        {isShaking ? "Đang lắc ống..." : drawnFortune ? "Bốc quẻ khác" : "Bốc quẻ cát tường"}
      </button>
    </div>
  );
}
