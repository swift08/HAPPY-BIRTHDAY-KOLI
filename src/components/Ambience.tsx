import { useMemo } from "react";

export function Ambience({ density = 18 }: { density?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: density }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 12,
        size: 10 + Math.random() * 18,
        opacity: 0.35 + Math.random() * 0.5,
      })),
    [density],
  );
  const sparkles = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        size: 2 + Math.random() * 3,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* soft blobs */}
      <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-[oklch(0.9_0.1_15/0.5)] blur-3xl" />
      <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.88_0.12_20/0.4)] blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-[oklch(0.94_0.06_10/0.5)] blur-3xl" />

      {sparkles.map((s) => (
        <span
          key={`s-${s.id}`}
          className="twinkle absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            boxShadow: "0 0 8px rgba(255,255,255,0.9), 0 0 16px oklch(0.85 0.14 15 / 0.7)",
          }}
        />
      ))}

      {hearts.map((h) => (
        <svg
          key={`h-${h.id}`}
          viewBox="0 0 24 24"
          className="floating-heart absolute"
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            opacity: h.opacity,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            filter: "drop-shadow(0 0 6px oklch(0.8 0.16 15 / 0.7))",
          }}
        >
          <path
            fill="oklch(0.78 0.16 12)"
            d="M12 21s-7-4.35-9.5-8.5C.9 9.7 2.2 6 5.5 6c2 0 3.5 1.2 4.5 2.6C11 7.2 12.5 6 14.5 6 17.8 6 19.1 9.7 17.5 12.5 19 16.65 12 21 12 21z"
          />
        </svg>
      ))}
    </div>
  );
}
