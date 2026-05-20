export default function Header() {
  return (
    <header className="w-full h-16 flex items-center justify-between px-6 border-b border-slate-200/60 bg-white/70 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-3">
        
        <span
          className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500
          to-pink-500 shadow-lg shadow-indigo-500/30">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M4 19V5" />
            <path d="M4 19h16" />
            <path d="M8 16V11" />
            <path d="M12 16V7" />
            <path d="M16 16v-3" />
          </svg>
          <span className="absolute inset-0 rounded-xl bg-white/10 animate-pulse" />
        </span>

        <div className="flex flex-col leading-tight">
          <h1 className="text-lg font-semibold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Analytics Engine
          </h1>
          <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400 font-medium">
            UPLOAD · ANALYSE · VISUALISE
          </span>
        </div>

      </div>
      
      <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span>Engine online</span>
      </div>
      
    </header>
  );
}
