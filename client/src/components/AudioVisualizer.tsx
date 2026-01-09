import { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  isPlaying: boolean;
  color?: string;
}

export default function AudioVisualizer({ isPlaying, color = "#22c55e" }: AudioVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsCount = 20;

  return (
    <div 
      ref={containerRef}
      className="flex items-center gap-[2px] h-8 w-24 px-2"
    >
      {[...Array(barsCount)].map((_, i) => (
        <div
          key={i}
          className="w-[3px] bg-current rounded-full transition-all duration-300"
          style={{
            color: color,
            height: isPlaying 
              ? `${Math.max(20, Math.random() * 100)}%` 
              : "20%",
            animation: isPlaying 
              ? `waveform 0.5s ease-in-out infinite alternate ${i * 0.05}s` 
              : "none",
          }}
        />
      ))}
      <style>{`
        @keyframes waveform {
          0% { height: 20%; }
          100% { height: 100%; }
        }
      `}</style>
    </div>
  );
}
