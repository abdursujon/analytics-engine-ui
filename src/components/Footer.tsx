export default function Footer() {
  return (
    <footer className="relative w-full border-t border-slate-200 bg-slate-50">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/60 to-transparent"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:gap-4">
        <span className="inline-flex items-center gap-1.5">
          <span className="text-slate-400">©&nbsp;2026</span>
          <span className="font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Analytics Engine
          </span>
        </span>

        <span aria-hidden className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />

        <span className="inline-flex items-center gap-1.5">
          <span className="text-slate-400">Developed by</span>
          <a
            href="https://github.com/abdursujon"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1 font-medium text-slate-700 transition hover:text-indigo-600"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-slate-400 transition group-hover:text-indigo-600">
              <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.84 1.31 3.54 1 .11-.78.42-1.31.77-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.39 1.24-3.23-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5z" />
            </svg>
            <span className="group-hover:underline">Abdur Rahim Sujon</span>
          </a>
        </span>

        <span aria-hidden className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />

        <a
          href="https://sujons.com"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600 hover:shadow-sm"
        >
          <span>View other work</span>
          <span className="text-slate-400 transition group-hover:text-indigo-600">sujons.com</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo-600">
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
