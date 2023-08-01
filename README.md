# hooks-ts
Personal collection of React hooks

```bash
npm i @nanotome/hooks-ts
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
import { SQLClientProvider, useSQLClient } from '@nanotome/hooks-ts';

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
        {
          // values is an array of arrays representing the results of the query
          values.map((row, i) => (
            <tr key={i}>
              {row.map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

function QueryRunner() {
  const [results, setResults] = useState([]);
  const { db, saveDB, loadDB } = useSQLClient();

  function exec(sql: string) {
    try {
      // The sql is executed synchronously on the UI thread.
      // You may want to use a web worker here instead
      setResults(db.exec(sql)); // an array of objects is returned
      setError(null);
    } catch (err) {
      // exec throws an error when the SQL statement is invalid
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
  return (
    <SQLClientProvider>
      <QueryRunner />
    </SQLClientProvider>
  );
}
```

<!-- HOOKS:END -->