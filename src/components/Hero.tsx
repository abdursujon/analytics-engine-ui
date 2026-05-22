export default function Hero() {
  function scrollToUpload() {
    document
      .querySelector("input[type=file]")
      ?.closest("div")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-16 text-center sm:pt-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/70 via-purple-50/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-200/30 blur-3xl"
      />

      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/70 px-3 py-1 text-xs font-medium text-indigo-700 shadow-sm backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Free · No signup · Results in seconds
      </div>

      <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
        Transform raw data into{" "}
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          instant insights
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
        Upload a PARQUET || JSON || NDJSON || CSV file and get accurate column-level statistics, distributions,
        and quality checks without having to do manual inspection.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={scrollToUpload}
          className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-xl hover:shadow-indigo-500/40 hover:cursor-pointer"
        >
          Upload a file
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 transition group-hover:translate-y-0.5"
          >
            <path d="M12 5v14" />
            <path d="M19 12l-7 7-7-7" />
          </svg>
        </button>

        <a
          href="#features"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-700 backdrop-blur-sm transition hover:border-slate-300 hover:bg-white"
        >
          See what it does
        </a>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
        <span>Supported:</span>
        <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 font-medium text-slate-700">
          .parquet
        </span>
        <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 font-medium text-slate-700">
          .json 
        </span>
        <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 font-medium text-slate-700">
          .ndjson 
        </span>
        <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 font-medium text-slate-700">
          .csv
        </span>
        <span className="text-slate-400">·</span>
        <span>up to 5&nbsp;MB</span>
      </div>

      <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 text-left sm:grid-cols-4">
        <Stat label="Validation" value="Instant" />
        <Stat label="Stats per column" value="11+" />
        <Stat label="Percentiles" value="P25–P99" />
        <Stat label="Output" value="JSON" />
      </dl>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white px-5 py-4">
      <dt className="text-xs font-medium uppercase tracking-widest text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 text-lg font-semibold text-slate-900">{value}</dd>
    </div>
  );
}
