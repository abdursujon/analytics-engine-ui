import { useState, type ChangeEvent, type DragEvent } from 'react'

const API_BASE_URL = 'http://localhost:8080'

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<any | null>(null)
  const [analysisId, setAnalysisId] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [view, setView] = useState<'summary' | 'raw'>('summary')

  function acceptFile(f: File | null | undefined) {
    if (!f) return
    const name = f.name.toLowerCase()
    if (!name.endsWith('.csv') && !name.endsWith('.txt')) {
      setError('Only CSV and TXT files are supported by this endpoint.')
      setFile(null)
      setFileName(null)
      setAnalysis(null)
      return
    }
    setError(null)
    setFile(f)
    setFileName(f.name)
    setAnalysis(null)
    setAnalysisId(null)
  }

  function handleSelect(e: ChangeEvent<HTMLInputElement>) {
    acceptFile(e.target.files?.[0])
  }

  function handleDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault()
    setIsDragging(false)
    acceptFile(e.dataTransfer.files?.[0])
  }

  async function handleUpload() {
    if (!file) return
    setLoading(true)
    setError(null)

    try {
      const text = await file.text()

      const name = file.name.toLowerCase()
      const contentType =
        name.endsWith('.csv') ? 'text/csv' :
          name.endsWith('.txt') ? 'text/plain' :
            ''

      const res = await fetch(`${API_BASE_URL}/analytics-engine/ingestCsv`, {
        method: 'POST',
        headers: { 'Content-Type': contentType },
        body: text,
      })

      const resText = await res.text()

      if (!res.ok) {
        const frontendHint = !text.trim()
          ? 'The file is empty.'
          : 'The file content is invalid.'

        let formatted = resText
        try {
          formatted = JSON.stringify(JSON.parse(resText), null, 2)
        } catch { }

        setError(
          frontendHint +
          '\n\nAPI response:\n' +
          (formatted || `${res.status} ${res.statusText}`)
        )
        return
      }

      let json
      try {
        json = JSON.parse(resText)
      } catch {
        setError(
          'Response could not be parsed as JSON.\n\nAPI response:\n' +
          resText
        )
        return
      }

      setAnalysis(json)
      setAnalysisId(json.id)
      setView('summary')
    } catch {
      setError('Network or server error')
    } finally {
      setLoading(false)
    }
  }

  async function handleDownload() {
    if (!analysisId) return
    setDownloading(true)
    try {
      const res = await fetch(
        `${API_BASE_URL}/analytics-engine/${analysisId}/download.json`
      )
      if (!res.ok) {
        setError('Download failed')
        return
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'analysis.json'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch {
      setError('Download error')
    } finally {
      setDownloading(false)
    }
  }

  async function handleDelete() {
    if (!analysisId) return
    if (!confirm('Delete this analysis? This cannot be undone.')) return

    setDeleting(true)
    setError(null)
    try {
      const res = await fetch(
        `${API_BASE_URL}/analytics-engine/${analysisId}`,
        { method: 'DELETE' }
      )

      if (!res.ok && res.status !== 204) {
        setError(res.status === 404 ? 'Analysis no longer exists.' : 'Delete failed')
        return
      }

      setAnalysis(null)
      setAnalysisId(null)
      setFile(null)
      setFileName(null)
    } catch {
      setError('Delete error')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div id="upload" className="flex flex-col items-center gap-8 px-6 pb-10">
      <div className="w-full max-w-xl">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-xl shadow-indigo-500/10">
          <div className="rounded-2xl bg-white/95 p-6 backdrop-blur-sm">
            <label
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={
                'group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition ' +
                (isDragging
                  ? 'border-indigo-500 bg-indigo-50/70'
                  : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50/60')
              }
            >
              <input
                type="file"
                accept=".csv, .txt"
                onChange={handleSelect}
                className="hidden"
              />

              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-pink-100 text-indigo-600 transition group-hover:scale-110">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </span>

              {file ? (
                <div className="flex flex-col items-center gap-1">
                  <div className="text-base font-semibold text-slate-900">{fileName}</div>
                  <div className="text-xs text-slate-500">
                    {formatBytes(file.size)} · ready to analyze
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <div className="text-base font-semibold text-slate-700">
                    Drop a file here, or <span className="text-indigo-600">browse</span>
                  </div>
                  <div className="text-xs text-slate-500">CSV or TXT · up to 5&nbsp;MB</div>
                </div>
              )}
            </label>

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:cursor-pointer hover:shadow-xl hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              {loading ? (
                <>
                  <Spinner /> Analyzing…
                </>
              ) : (
                <>
                  Upload &amp; Analyze
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>

            {loading && (
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-1/3 animate-[shimmer_1.4s_infinite] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50/70 p-3">
                <p className="whitespace-pre-wrap break-words text-left text-sm text-red-700">
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {analysis && (
        <div className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-slate-900">Analysis #{analysis.id}</h2>
              {analysis.alreadyExists && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> cached
                </span>
              )}
            </div>

            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-medium">
              <button
                onClick={() => setView('summary')}
                className={
                  'rounded-md px-3 py-1.5 transition ' +
                  (view === 'summary' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700')
                }
              >
                Summary
              </button>
              <button
                onClick={() => setView('raw')}
                className={
                  'rounded-md px-3 py-1.5 transition ' +
                  (view === 'raw' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700')
                }
              >
                Raw JSON
              </button>
            </div>
          </div>

          {view === 'summary' ? (
            <>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat label="Rows" value={analysis.numberOfRows?.toLocaleString() ?? '—'} />
                <Stat label="Columns" value={analysis.numberOfColumns?.toLocaleString() ?? '—'} />
                <Stat label="Characters" value={analysis.totalCharacters?.toLocaleString() ?? '—'} />
                <Stat label="Numeric cols" value={String(analysis.columnStatistics?.filter((c: any) => c.isNumeric).length ?? 0)} />
              </div>

              {Array.isArray(analysis.columnStatistics) && analysis.columnStatistics.length > 0 && (
                <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="px-4 py-2">Column</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Nulls</th>
                        <th className="px-4 py-2">Unique</th>
                        <th className="px-4 py-2">Min</th>
                        <th className="px-4 py-2">Max</th>
                        <th className="px-4 py-2">Mean</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {analysis.columnStatistics.map((c: any, i: number) => (
                        <tr key={i} className="hover:bg-slate-50/60">
                          <td className="px-4 py-2 font-medium text-slate-900">{c.columnName}</td>
                          <td className="px-4 py-2">
                            <span className={
                              'inline-flex rounded-full px-2 py-0.5 text-xs font-medium ' +
                              (c.isNumeric ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600')
                            }>
                              {c.isNumeric ? 'numeric' : 'text'}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-slate-600">{c.nullCount}</td>
                          <td className="px-4 py-2 text-slate-600">{c.uniqueCount}</td>
                          <td className="px-4 py-2 text-slate-600">{fmtNum(c.min)}</td>
                          <td className="px-4 py-2 text-slate-600">{fmtNum(c.max)}</td>
                          <td className="px-4 py-2 text-slate-600">{fmtNum(c.mean)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <pre className="mt-5 max-h-96 overflow-auto rounded-xl bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
              {JSON.stringify(analysis, null, 2)}
            </pre>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:cursor-pointer hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {downloading ? 'Downloading…' : 'Download JSON'}
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:cursor-pointer hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
              </svg>
              {deleting ? 'Deleting…' : 'Delete'}
            </button>
          </div>

          {downloading && (
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-1/3 animate-[shimmer_1.4s_infinite] rounded-full bg-emerald-500" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
      <div className="text-xs font-medium uppercase tracking-widest text-slate-400">{label}</div>
      <div className="mt-1 text-lg font-semibold text-slate-900">{value}</div>
    </div>
  )
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 animate-spin">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function fmtNum(v: any) {
  if (v === null || v === undefined) return '—'
  if (typeof v !== 'number') return String(v)
  if (Number.isInteger(v)) return v.toLocaleString()
  return v.toFixed(3)
}
