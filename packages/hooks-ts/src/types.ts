import { SqlJsStatic, Database } from "sql.js";

export type SQLClientContextType = {
  db: Database | null;
  loadDB: (file: File) => void;
  saveDB: (filename: string) => void;
};
