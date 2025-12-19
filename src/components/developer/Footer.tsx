
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 py-8 font-mono text-sm">
      <div className="max-w-7xl mx-auto px-6">
        {/* Terminal Status Bar Style */}
        <div className="bg-[#0d1117] border border-gray-800 rounded px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: System Info */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>System Online</span>
            </div>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Build v2.0.0</span>
          </div>

          {/* Center: Copyright */}
          <div className="text-gray-400 text-xs">
            <span className="text-blue-400">©</span> {currentYear} <span className="text-white">Nirajan Dhakal</span>. All rights reserved.
          </div>

          {/* Right: Status */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="text-green-400">UTC+5:45</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline text-orange-400">Kathmandu, Nepal</span>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-4 text-center text-xs text-gray-600">
          <span className="text-gray-700">#</span> Built with <span className="text-blue-400">Next.js</span>, <span className="text-blue-400">TypeScript</span> & <span className="text-orange-400">passion</span>
        </div>
      </div>
    </footer>
  );
}