# hooks-ts

Personal collection of React hooks

```bash
npm i sql.js @nanotome/hooks-ts
```

<div align="center">
  <sub>Created by <a href="https://github.com/nanotome">Ifeanyi Oraelosi</a></sub>
</div>

## 📖 Summary

<!-- HOOKS:START -->

### SQLClientProvider, useSQLClient

A React hook wrapper around [sql.js](https://sql.js.org/#/)

**Usage**

```tsx
import { SQLClientProvider, useSQLClient } from "@nanotome/hooks-ts";

function ResultsTable({ columns, values }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((columnName, i) => (
            <td key={i}>{columnName}</td>
          ))}
        </tr>
      </thead>

      <tbody>
        {values.map((row, i) => (
          <tr key={i}>
            {row.map((value, i) => (
              <td key={i}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function QueryRunner() {
  const [results, setResults] = useState([]);
  const { db, saveDB, loadDB } = useSQLClient();

  function exec(sql: string) {
    try {
      setResults(db.exec(sql));
      setError(null);
    } catch (err) {
      setError(err);
      setResults([]);
    }
  }

  return (
    <div>
      {results.map(({ columns, values }, i) => {
        return <ResultsTable key={i} columns={columns} values={values} />;
      })}
    </div>
  );
}

function App() {
  // The provider uses the default wasm file hosted on sql.js' CDN
  return (
    <SQLClientProvider>
      <QueryRunner />
    </SQLClientProvider>
  );
}
```

<!-- HOOKS:END -->
