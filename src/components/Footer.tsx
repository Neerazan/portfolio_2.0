import { Socials } from './Social';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/5 bg-[#0a0a0a] py-6">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-2 font-mono text-xs text-gray-500">
          <span className="text-green-500">➜</span>
          <span>© {new Date().getFullYear()} Nirajan Dhakal</span>
          <span className="hidden sm:inline text-gray-700">|</span>
          <span className="hidden sm:inline text-gray-600">running v2.0.0</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Reusing Socials but passing style to them if possible, or just wrapping them */}
          <div className="scale-90 opacity-80 hover:opacity-100 transition-opacity">
            <Socials />
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer