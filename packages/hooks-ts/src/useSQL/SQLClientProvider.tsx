"use client";
import {
  useCallback,
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { SqlJsStatic, Database } from "sql.js";
import initSqlJs from "sql.js";
import { SQLClientContextType } from "../types";
import { saveAs } from "file-saver";

const initClient = async (wasmFileLocation?: string): Promise<SqlJsStatic> => {
  const SQL = await initSqlJs({
    locateFile: (file: string) =>
      wasmFileLocation || `https://sql.js.org/dist/${file}`,
  });
  return SQL;
};

export const SQLClientContext = createContext<SQLClientContextType | undefined>(
  undefined
);

export const useSQLClient = (): SQLClientContextType => {
  const sqlClient = useContext(SQLClientContext);
  if (sqlClient === undefined) {
    throw new Error(
      "No SQLClientContext set, use SQLClientProvider to set one"
    );
  }
  return sqlClient;
};

type SQLClientProviderProps = {
  wasmFile?: any;
  children?: ReactNode;
  existingDb?: ArrayLike<number> | Buffer | null;
};

export const SQLClientProvider = ({
  wasmFile,
  children,
  existingDb,
}: SQLClientProviderProps) => {
  const [SQL, setSQL] = useState<SqlJsStatic | null>(null);
  const [db, setDb] = useState<Database | null>(null);

  useEffect(() => {
    async function init() {
      const client = await initClient(wasmFile);
      setSQL(client);
      setDb(new client.Database(existingDb));
    }

    init();
  }, []);

  /**
   * Loads a database from a file
   */
  const loadDB = useCallback(
    (file: File) => {
      if (!SQL) {
        throw new Error("SQL client has not bee initialized");
      }

      const reader = new FileReader();
      reader.onload = () => {
        const uInt8Array = new Uint8Array(reader.result as ArrayBuffer);
        setDb(new SQL.Database(uInt8Array));
      };
      reader.readAsArrayBuffer(file);
    },
    [SQL]
  );

  /**
   * Saves the database to a file
   */
  const saveDB = useCallback(
    (filename: string) => {
      if (!db) {
        throw new Error(
          "NO db has been initialized. Please initialize the db in the SQLClientProvider component."
        );
      }
      const dbBitArray = db.export();
      saveAs(new Blob([dbBitArray]), filename || "db.sqlite");
    },
    [db]
  );

  return (
    <SQLClientContext.Provider value={{ db, loadDB, saveDB }}>
      {children}
    </SQLClientContext.Provider>
  );
};
