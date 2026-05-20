# Analytics Engine UI
 The web UI for the [Analytics Engine](https://github.com/abdursujon/analytics-engine) — a Spring Boot service that profiles CSV data. Upload a CSV, see the column-level statistics it computes, download the result as JSON.


## Live demo
https://abdursujon.github.io/analytics-engine/


## Tech stack
- **React** + **Vite** + **TypeScript**
- **Tailwind CSS** 
- Static deploy via **GitHub Pages**


## What it does

- Upload a CSV file through a simple form
- Sends the file to the Analytics Engine API
- Renders the per-column statistics returned by the backend
- Shows clear error messages when validation fails (invalid CSV, oversized file, malformed rows)
- Lets you download the analysis result as JSON


## What the backend computes

For each column in the uploaded CSV:
  
- **Always:** column name, null count, unique value count, numeric flag
- **Numeric columns only:** min, max, mean, median, standard deviation, and percentiles

Repeated uploads of identical content are detected via SHA-256 hashing on the backend and return the cached analysis instead of recomputing.

## How to use
  
1. Open https://abdursujon.github.io/analytics-engine/
2. Upload a CSV file (max 5 MB, max 1,000,000 cells)
3. View the per-column statistics
4. (Optional) Download the analysis as JSON

## Run locally

```bash
  git clone https://github.com/abdursujon/analytics-engine-ui.git
  cd to the project directory
  npm install
  npm run dev
```
  
  Vite serves the app at `http://localhost:5173`. By default it talks to the live Cloud Run backend. To point it at a locally-running Analytics Engine instead, update the API base URL in your env config (see `.env` or
  `src/config`).

  ## Limitations

  Matches the backend's scope deliberately:

  - **CSV only.** No XLSX or JSON inputs.
  - **5 MB file size cap, 1,000,000-cell cap.**
  - **No authentication.** Public demo only.
  - **No progress streaming.** The backend processes the file synchronously and returns one response — the UI shows a spinner during the request.
  - **No history.** Each upload is independent. Backend stores results in-memory and does not preserve them across deploys.


