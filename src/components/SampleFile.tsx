import { useState } from "react";


type FormatKey = "parquet" | "csv" | "json" | "ndjson";


type TextSample = {
  kind: "text";
  label: string;
  ext: string;
  mime: string;
  content: string;
};


type BinarySample = {
  kind: "binary";
  label: string;
  ext: string;
  mime: string;
  downloadUrl: string;
  schema: { column: string; type: string }[];
  note: string;
};


const CSV_CONTENT = [
  "id,name,age,city,salary",
  "1,Alice,29,Berlin,52000",
  "2,Bob,34,Toronto,61500.50",
  "3,Carla,41,Lisbon,",
  "4,Dan,,Sydney,48000",
  "5,Eve,27,Berlin,55250.75",
].join("\n");


const JSON_CONTENT = [
  "[",
  '  { "id": 1, "name": "Alice", "age": 29,   "city": "Berlin",  "salary": 52000 },',
  '  { "id": 2, "name": "Bob",   "age": 34,   "city": "Toronto", "salary": 61500.50 },',
  '  { "id": 3, "name": "Carla", "age": 41,   "city": "Lisbon",  "salary": null },',
  '  { "id": 4, "name": "Dan",   "age": null, "city": "Sydney",  "salary": 48000 },',
  '  { "id": 5, "name": "Eve",   "age": 27,   "city": "Berlin",  "salary": 55250.75 }',
  "]",
].join("\n");


const NDJSON_CONTENT = [
  '{"id":1,"name":"Alice","age":29,"city":"Berlin","salary":52000}',
  '{"id":2,"name":"Bob","age":34,"city":"Toronto","salary":61500.50}',
  '{"id":3,"name":"Carla","age":41,"city":"Lisbon","salary":null}',
  '{"id":4,"name":"Dan","age":null,"city":"Sydney","salary":48000}',
  '{"id":5,"name":"Eve","age":27,"city":"Berlin","salary":55250.75}',
].join("\n");


const SAMPLES: Record<FormatKey, TextSample | BinarySample> = {
  parquet: {
    kind: "binary",
    label: "Parquet",
    ext: ".parquet",
    mime: "application/vnd.apache.parquet",
    downloadUrl: `${import.meta.env.BASE_URL}sample.parquet`,
    schema: [
      { column: "id", type: "INT64" },
      { column: "name", type: "BYTE_ARRAY (UTF8)" },
      { column: "age", type: "INT32 (nullable)" },
      { column: "city", type: "BYTE_ARRAY (UTF8)" },
      { column: "salary", type: "DOUBLE (nullable)" },
    ],
    note: "Parquet is a binary columnar format — it doesn't render as text. Download the sample and drop it into the upload box above.",
  },
  csv: {
    kind: "text",
    label: "CSV",
    ext: ".csv",
    mime: "text/csv",
    content: CSV_CONTENT,
  },
  json: {
    kind: "text",
    label: "JSON",
    ext: ".json",
    mime: "application/json",
    content: JSON_CONTENT,
  },
  ndjson: {
    kind: "text",
    label: "NDJSON",
    ext: ".ndjson",
    mime: "application/x-ndjson",
    content: NDJSON_CONTENT,
  },
};


export default function SampleFile() {
  const [active, setActive] = useState<FormatKey>("parquet");
  const [copied, setCopied] = useState(false);

  const sample = SAMPLES[active];

  async function handleCopy() {
    if (sample.kind !== "text") return;
    try {
      await navigator.clipboard.writeText(sample.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }


  function handleDownload() {
    if (sample.kind === "binary") {
      const a = document.createElement("a");
      a.href = sample.downloadUrl;
      a.download = `sample${sample.ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }

    const blob = new Blob([sample.content], { type: sample.mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sample${sample.ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    
  }

  return (
    <section
      id="samples"
      className="mx-auto max-w-5xl px-6 py-20 text-slate-700"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-indigo-600">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
        Samples
      </div>

      <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        What a valid file{" "}
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          looks like
        </span>
      </h2>

      <p className="mt-4 max-w-2xl leading-relaxed">
        Same five rows, four formats. Copy a sample, save it locally, then drop
        it into the upload box above to see the analyzer in action.
      </p>

      <div className="mt-8 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-xl shadow-indigo-500/10">
        <div className="rounded-2xl bg-white/95 p-5 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-medium">
              {(Object.keys(SAMPLES) as FormatKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={
                    "rounded-md px-3 py-1.5 transition " +
                    (active === key
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700")
                  }
                >
                  {SAMPLES[key].label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {sample.kind === "text" && (
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:cursor-pointer hover:border-indigo-300 hover:text-indigo-600"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              )}
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:cursor-pointer hover:bg-slate-800"
              >
                Download sample{sample.ext}
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600">
              sample{sample.ext}
            </span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600">
              {sample.mime}
            </span>
          </div>

          {sample.kind === "text" ? (
            <pre className="mt-3 max-h-80 overflow-auto rounded-xl bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
              {sample.content}
            </pre>
          ) : (
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60">
              <div className="border-b border-slate-200 bg-white px-4 py-3 text-xs text-slate-600">
                {sample.note}
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-2">Column</th>
                    <th className="px-4 py-2">Parquet type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {sample.schema.map((row) => (
                    <tr key={row.column} className="hover:bg-white/60">
                      <td className="px-4 py-2 font-medium text-slate-900">
                        {row.column}
                      </td>
                      <td className="px-4 py-2 font-mono text-xs text-slate-600">
                        {row.type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
