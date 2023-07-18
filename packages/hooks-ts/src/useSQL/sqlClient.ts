import initSqlJs from "sql.js";

const initClient = async () => {
  const SQL = await initSqlJs({
    locateFile: (file: string) => `../${file}`,
  });
  return SQL;
}

export default initClient;
