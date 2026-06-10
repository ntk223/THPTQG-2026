import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Pin } from 'lucide-react';

const INITIAL_WISHES = [
  { id: 1, author: "Nguyễn Trung Kiên", text: "Chúc toàn thể các sĩ tử tham gia kỳ thi THPT Quốc Gia 2026 tự tin vững bước, làm bài bình tĩnh và đạt kết quả thật rực rỡ!" },
];

export default function WishingWall() {
  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem('situ_wishes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.some(w => w.author === "Nguyễn Trung Kiên")) {
          return INITIAL_WISHES;
        }
        return parsed;
      }
      return INITIAL_WISHES;
    } catch (e) {
      return INITIAL_WISHES;
    }
  });
  const [newWish, setNewWish] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('situ_wishes', JSON.stringify(wishes));
    } catch (e) {
      console.warn("localStorage quota full or disabled:", e);
    }
  }, [wishes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newWish.trim() || !author.trim()) return;

    const wishObj = {
      id: Date.now(),
      author: author.trim(),
      text: newWish.trim()
    };

    setWishes([wishObj, ...wishes]);
    setNewWish('');
    setAuthor('');
  };

  return (
    <section className="py-12 max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Input Sticky Form */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft h-fit">
          <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 mb-4">
            <Pin className="w-4 h-4 text-amber-500" />
            <h3 className="font-display font-extrabold text-sm tracking-wider uppercase text-slate-800">
              Gửi lời chúc lên bảng vàng
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                Tên của bạn / Mối quan hệ
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ví dụ: Bố Hải, Bạn Thân,..."
                maxLength={25}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                Lời chúc gửi sĩ tử
              </label>
              <textarea
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                placeholder="Nhập lời khích lệ, cổ động..."
                maxLength={140}
                required
                rows={3}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 bg-slate-50/50 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-white font-bold bg-slate-900 hover:bg-slate-800 transition-all text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Ghim Lên Bảng Vàng
            </button>
          </form>
        </div>

        {/* Right: Wishing Sticky Wall */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-1">
            <AnimatePresence>
              {wishes.map((w) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="p-5 rounded-2xl border border-white/60 glass-thick shadow-soft flex flex-col justify-between min-h-[110px] relative overflow-hidden"
                >
                  {/* Subtle color indicator strip on left */}
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-amber-400" />

                  <p className="text-slate-700 text-xs leading-relaxed italic mb-4 font-semibold">
                    “ {w.text} ”
                  </p>
                  <div className="flex justify-between items-center text-[9px] font-extrabold text-slate-400 border-t border-slate-100/50 pt-2 uppercase">
                    <span>Người gửi: {w.author}</span>
                    <span className="text-amber-500">◆ 2026</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
