import { memo } from "react";

export const TerminalDots = memo(() => (
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10" />
    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10" />
    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/10" />
  </div>
));
TerminalDots.displayName = 'TerminalDots';

export const ScanlineEffect = memo(() => (
  <>
    <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.03]">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-400 to-transparent animate-scan" />
    </div>
    <style jsx>{`
      @keyframes scan {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
      }
      .animate-scan {
        animation: scan 10s linear infinite;
        will-change: transform;
      }
    `}</style>
  </>
));
ScanlineEffect.displayName = 'ScanlineEffect';

export const GridOverlay = memo(() => (
  <div
    className="absolute inset-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage: 'linear-gradient(#8b949e 1px, transparent 1px), linear-gradient(90deg, #8b949e 1px, transparent 1px)',
      backgroundSize: '40px 40px'
    }}
  />
));
GridOverlay.displayName = 'GridOverlay';
