const AVAILABLE_NOW = [
   {
    title: "Multi-format ingestion",
    body: "Profile CSV, Parquet, JSON, and NDJSON through dedicated endpoints - one API, four common data-engineering formats.",
  },
  {
    title: "Data quality checks",
    body: "Null and missing values per column, invalid entries, and format validation.",
  },
  {
    title: "Descriptive statistics",
    body: "Minimum, maximum, mean, median, standard deviation, totals, and counts.",
  },
  {
    title: "Distribution analysis",
    body: "Percentiles (P25 / P50 / P75 / P90 / P95 / P99) across every numeric column.",
  },
  {
    title: "Column-level insights",
    body: "Unique value counts and automatic numeric vs. non-numeric type detection.",
  },
];

const COMING_SOON = [
  {
    title: "JSON file upload",
    body: "Profile JSON and NDJSON directly — useful for API exports and event logs.",
  },
  {
    title: "Skewness & kurtosis",
    body: "Shape-of-distribution metrics on top of the existing percentile breakdown.",
  },
  {
    title: "Correlation matrices",
    body: "Pairwise correlation across all numeric columns for relationship analysis.",
  },
];

export default function Article() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 text-slate-700">
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-indigo-600">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
        About
      </div>

      <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        What this application{" "}
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          actually does
        </span>
      </h2>

      <p className="mt-5 max-w-3xl text-lg leading-relaxed">
        <span className="font-semibold text-slate-900">Analytics Engine</span>{" "}
        turns uploaded files into structured insights. It validates input,
        processes datasets up to{" "}
        <span className="font-semibold">5&nbsp;MB</span> /{" "}
        <span className="font-semibold">1Million cells</span>, and returns
        detailed statistical results in real time - through calling a dedicated
        back end Spring Boot analysis API service.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Card
          label="Input"
          value=" PARQUET · JSON · NDJSON · CSV"
          hint="text/csv or text/plain bodies, up to 5 MB"
        />
        <Card
          label="Output"
          value="JSON"
          hint="Per-column stats, downloadable as analysis.json"
        />
      </div>

      <h3 className="mt-16 flex items-center gap-3 text-2xl font-semibold text-slate-900">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
        Available now
      </h3>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {AVAILABLE_NOW.map(({ title, body }) => (
          <FeatureItem key={title} title={title} body={body} />
        ))}
      </ul>

      <h3 className="mt-16 flex items-center gap-3 text-2xl font-semibold text-slate-900">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-amber-100 text-amber-700">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        </span>
        Coming soon
      </h3>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {COMING_SOON.map(({ title, body }) => (
          <FeatureItem key={title} title={title} body={body} muted />
        ))}
      </ul>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <article>
          <h3 className="text-xl font-semibold text-slate-900">
            Processing &amp; results
          </h3>
          <p className="mt-3 leading-relaxed">
            While analysis is running, the UI displays progress and status
            updates. Once complete, you can review the result inline or download
            the full JSON report. You can also delete the analysis which
            completely removes all data from the database.
          </p>
        </article>

        <article>
          <h3 className="text-xl font-semibold text-slate-900">
            Error handling
          </h3>
          <p className="mt-3 leading-relaxed">
            If a file fails validation or the API rejects the request, the app
            surfaces the server's response verbatim — pretty-printed when it's
            JSON — so you can see exactly what went wrong.
          </p>
        </article>
      </div>
    </section>
  );
}

function Card({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/60 p-5 backdrop-blur-sm">
      <div className="text-xs font-medium uppercase tracking-widest text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-xl font-semibold text-slate-900">{value}</div>
      <div className="mt-2 text-sm text-slate-500">{hint}</div>
    </div>
  );
}

function FeatureItem({
  title,
  body,
  muted = false,
}: {
  title: string;
  body: string;
  muted?: boolean;
}) {
  return (
    <li
      className={
        "group flex gap-3 rounded-lg border p-4 transition " +
        (muted
          ? "border-dashed border-slate-200 bg-slate-50/60 text-slate-600"
          : "border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm")
      }
    >
      <span
        className={
          "mt-1 inline-block h-2 w-2 shrink-0 rounded-full " +
          (muted ? "bg-amber-400" : "bg-emerald-500")
        }
      />
      <div>
        <div className="font-semibold text-slate-900">{title}</div>
        <p className="mt-1 text-sm leading-relaxed">{body}</p>
      </div>
    </li>
  );
}
