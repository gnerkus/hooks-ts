import { SqlJsStatic, Database } from "sql.js";

export type SQLClientContextType = {
  SQL: SqlJsStatic | null;
  db: Database | null;
};

export type SQLDownloadOptions = {
  context?: React.Context<SQLClientContextType | undefined>;
}
