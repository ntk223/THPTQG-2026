import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AmbientPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const sourcesRef = useRef([]);

  const togglePlayback = () => {
    if (isPlaying) {
      // Stop all sounds
      sourcesRef.current.forEach(source => {
        try { source.stop(); } catch(e){}
      });
      sourcesRef.current = [];
      setIsPlaying(false);
    } else {
      // Start sounds
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // 1. Binaural Alpha Beats (Left 200Hz, Right 208Hz -> 8Hz difference stimulates focus)
        const merger = ctx.createChannelMerger(2);
        
        const oscL = ctx.createOscillator();
        const gainL = ctx.createGain();
        oscL.frequency.setValueAtTime(200, ctx.currentTime);
        oscL.connect(gainL);
        gainL.connect(merger, 0, 0); // left channel
        
        const oscR = ctx.createOscillator();
        const gainR = ctx.createGain();
        oscR.frequency.setValueAtTime(208, ctx.currentTime);
        oscR.connect(gainR);
        gainR.connect(merger, 0, 1); // right channel
        
        gainL.gain.setValueAtTime(0.08, ctx.currentTime);
        gainR.gain.setValueAtTime(0.08, ctx.currentTime);

        // 2. Brown Noise for Ambient Wind/Rain effect
        const bufferSize = 4 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5; 
        }
        
        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = noiseBuffer;
        noiseNode.loop = true;
        
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.05, ctx.currentTime);
        noiseNode.connect(noiseGain);

        // Master output
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.6, ctx.currentTime);

        merger.connect(masterGain);
        noiseGain.connect(masterGain);
        masterGain.connect(ctx.destination);

        oscL.start();
        oscR.start();
        noiseNode.start();

        sourcesRef.current = [oscL, oscR, noiseNode];
        setIsPlaying(true);
      } catch (error) {
        console.error("Failed to play Alpha Wave audio:", error);
      }
    }
  };

  useEffect(() => {
    return () => {
      // Auto cleanup
      sourcesRef.current.forEach(source => {
        try { source.stop(); } catch(e){}
      });
    };
  }, []);

  return (
    <button
      onClick={togglePlayback}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-300 shadow-soft ${
        isPlaying
          ? 'bg-emerald-500 text-white border-emerald-500 animate-pulse'
          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-350'
      }`}
      title={isPlaying ? "Tắt sóng tập trung" : "Bật sóng não tập trung Alpha"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 animate-bounce" />
          <span>Sóng Alpha [ON]</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
          <span>Sóng Alpha [OFF]</span>
        </>
      )}
    </button>
  );
}
