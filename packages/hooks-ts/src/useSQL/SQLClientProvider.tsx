import { useEffect, useState, createContext } from "react";
import { SqlJsStatic, Database } from "sql.js";
import initSqlJs from "sql.js";

const initClient = async () => {
  const SQL = await initSqlJs({
    locateFile: (file: string) => `../${file}`,
  });
  return SQL;
};

type SQLClientContextType = {
  SQL: SqlJsStatic | null;
  db: Database | null;
};

export const SQLClientContext = createContext<SQLClientContextType | null>(
  null
);

type SQLClientProviderProps = {
  children: React.ReactNode;
};

export const SQLClientProvider = ({ children }: SQLClientProviderProps) => {
  const [SQL, setSQL] = useState<SqlJsStatic | null>(null);
  const [db, setDb] = useState<Database | null>(null);

  useEffect(() => {
    async function init() {
      const client = await initClient();
      setSQL(client);
      setDb(new client.Database());
    }

    init();
  }, []);

  return (
    <SQLClientContext.Provider value={{ SQL, db }}>
      {children}
    </SQLClientContext.Provider>
  );
};
