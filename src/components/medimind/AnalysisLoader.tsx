"use client";

interface Props {
  elapsed: number;
  timeout: number;
}

export default function AnalysisLoader({ elapsed, timeout }: Props) {
  // Cap visual progress at 92% so it never looks "done" before completion
  const progress = Math.min((elapsed / timeout) * 100, 92);

  return (
    <div className="flex flex-col items-center gap-8 py-10">

      {/* Pulsing icon with orbit rings */}
      <div className="relative flex items-center justify-center">
        {/* Outer orbit */}
        <div
          className="absolute w-28 h-28 rounded-full border border-[var(--gold-primary)]/10"
          style={{ animation: "spin 7s linear infinite reverse" }}
        />
        {/* Inner orbit */}
        <div
          className="absolute w-20 h-20 rounded-full border border-[var(--gold-primary)]/15"
          style={{ animation: "spin 4s linear infinite" }}
        />
        {/* Core */}
        <div className="w-16 h-16 rounded-full bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/25 flex items-center justify-center animate-pulse">
          <span className="text-2xl select-none">🧠</span>
        </div>
      </div>

      {/* Text */}
      <div className="text-center space-y-2">
        <h3 className="text-base font-semibold text-white">Analyzing Your Report</h3>
        <p className="text-xs text-gray-500 max-w-[260px] leading-relaxed">
          MediMind AI is scanning and diagnosing your medical document. This may take a moment.
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-56 h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--gold-primary)] transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Bouncing dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)]/60 animate-bounce"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  );
}
