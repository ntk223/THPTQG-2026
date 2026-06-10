import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const FORTUNES = [
  {
    type: "Đại Cát",
    title: "Bảng Vàng Ghi Danh",
    poem: [
      "Đăng khoa bảng nhãn rỡ môn phong,",
      "Chữ chí mài sâu sắt hóa kim.",
      "Bút sắt đề danh trang giấy trắng,",
      "Tự hào thủ khoa thỏa ước mong!"
    ],
    text: "Trực giác sắc bén, ngòi bút thông tuệ. Kỳ thi này chính là thời điểm bạn tỏa sáng rực rỡ và ghi danh bảng vàng!"
  },
  {
    type: "Thượng Cát",
    title: "Trí Tuệ Tựa Khuê Văn",
    poem: [
      "Khuê Văn Các tỏ ánh sao mai,",
      "Đèn sách bao năm chí khí dài.",
      "Lòng tĩnh tự tin đề mở lối,",
      "Bút hoa hạ chữ định tương lai."
    ],
    text: "Tâm trí bình tĩnh, minh mẫn vô song. Đứng trước đề thi, bạn nhìn thấu suốt mọi nút thắt để đưa ra câu trả lời chuẩn nhất."
  },
  {
    type: "Cát Tường",
    title: "Mưa Thuận Gió Hòa",
    poem: [
      "Thuận buồm xuôi gió nước triều dâng,",
      "Vượt sóng vươn khơi chí chẳng ngần.",
      "Giám thị ôn hòa cười rạng rỡ,",
      "Đồng môn trợ sức vạn phần thân."
    ],
    text: "Môi trường thi cử cực kỳ thuận lợi, thầy cô coi thi nhẹ nhàng, thân thiện giúp bạn giải tỏa hết áp lực để làm bài thoải mái."
  },
  {
    type: "Đại Cát",
    title: "Tinh Hoa Hội Tụ",
    poem: [
      "Chữ nghĩa tuôn trào tựa nước sa,",
      "Văn chương bay bổng ý thơ hòa.",
      "Toán lý rõ ràng từng nét mực,",
      "Thủ khoa hiển hách vang danh xa."
    ],
    text: "Toán giải như gió cuốn, văn viết trôi chảy dạt dào cảm xúc. Từng câu chữ đều toát lên kiến thức vững chắc."
  },
  {
    type: "Thượng Cát",
    title: "Thời Cơ Chín Muồi",
    poem: [
      "Thời cơ đã đến bứt phá nhanh,",
      "Đường rộng thênh thang rộng mở xanh.",
      "Nguyện vọng hằng mong nay vẫy gọi,",
      "Cánh cổng trường mơ đón bước anh."
    ],
    text: "Cánh cổng trường đại học mơ ước đã mở hé chờ đón bạn. Mọi nỗ lực học tập đêm ngày sắp sửa đơm quả ngọt xịn nhất."
  },
  {
    type: "Cát Tường",
    title: "Thần Hộ Mệnh Đồng Hành",
    poem: [
      "Linh vật hộ thân ở cạnh bên,",
      "Vận may gõ cửa chí vững bền.",
      "Khoanh bừa đáp án đều trúng đích,",
      "Thắng thế vẻ vang tựa bước lên."
    ],
    text: "Linh vật hộ mệnh đang tiếp thêm 100% may mắn. Khi gặp câu hỏi khó ngoài tầm hiểu biết, trực giác nhạy bén sẽ dẫn lối bạn chọn đúng."
  },
  {
    type: "Đại Cát",
    title: "Khổ Luyện Thành Tài",
    poem: [
      "Mười năm đèn sách mài nghiên bút,",
      "Chí cả vượt qua vạn dặm đường.",
      "Nay bước phòng thi lòng tự tại,",
      "Bảng vàng chói lọi ánh hào quang."
    ],
    text: "Bao nhiêu đêm thức khuya dậy sớm sẽ được đền đáp xứng đáng. Sự tự tin của bạn hôm nay là bệ phóng cho vinh quang ngày mai."
  },
  {
    type: "Thượng Cát",
    title: "Tâm Trí Bất Biến",
    poem: [
      "Tâm bất biến giữa dòng đề biến,",
      "Trí hanh thông vững bước đi lên.",
      "Khó khăn lùi bước nhường chiến thắng,",
      "Đỉnh cao vinh quang gọi tên bạn."
    ],
    text: "Trước những câu hỏi lắt léo hay đề thi lạ, bạn vẫn luôn vững vàng, đầu óc tỉnh táo và kiên trì tìm ra đáp án chính xác nhất."
  }
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
    <div className="w-full p-6 rounded-2xl bg-gradient-to-br from-white/95 via-amber-50/20 to-orange-50/20 border border-amber-100/50 shadow-soft flex flex-col items-center">
      <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-6">
        Quẻ Bói Cát Tường Sĩ Tử
      </h3>

      <div className="h-[290px] flex items-center justify-center relative w-full mb-5">
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
              className="text-center px-2 flex flex-col items-center justify-center"
            >
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-100 text-amber-800 uppercase tracking-widest">
                Quẻ: {drawnFortune.type}
              </span>
              
              <h4 className="font-display font-black text-slate-800 text-base mt-2 mb-1">
                {drawnFortune.title}
              </h4>

              {/* Boxed Poem styling */}
              <div className="my-2 py-2 px-4 rounded-xl bg-amber-50/60 border border-amber-100/50 text-center inline-block max-w-[270px]">
                {drawnFortune.poem.map((line, idx) => (
                  <p key={idx} className="italic text-[10px] font-semibold text-amber-900/80 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed max-w-[270px] mt-1">
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
