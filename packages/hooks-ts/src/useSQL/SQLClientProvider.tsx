"use client";
import * as React from "react";
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

export const SQLClientContext = React.createContext<
  SQLClientContextType | undefined
>(undefined);

export const useSQLClient = () => {
  const sqlClient = React.useContext(SQLClientContext);
  if (sqlClient === undefined) {
    throw new Error(
      "No SQLClientContext set, use SQLClientProvider to set one"
    );
  }
  return sqlClient;
};

type SQLClientProviderProps = {
  children?: React.ReactNode;
};

export const SQLClientProvider = ({ children }: SQLClientProviderProps) => {
  const [SQL, setSQL] = React.useState<SqlJsStatic | null>(null);
  const [db, setDb] = React.useState<Database | null>(null);

  React.useEffect(() => {
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
