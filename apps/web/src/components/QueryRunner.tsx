'use client'
import { useSQLClient } from "hooks-ts";
import { useEffect, useState } from "react";

export default function QueryRunner() {
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const sqlClient = useSQLClient();
  const { db } = sqlClient;

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

  useEffect(() => {
    exec("select sqlite_version()");
  }, [sqlClient]);

  return (
    <div>
      {results.map(({ columns, values }, i) => {
        return <ResultsTable key={i} columns={columns} values={values} />;
      })}
    </div>
  );
}

/**
 * Renders a single value of the array returned by db.exec(...) as a table
 * @param {import("sql.js").QueryExecResult} props
 */
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
