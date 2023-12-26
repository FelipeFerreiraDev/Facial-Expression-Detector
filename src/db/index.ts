import { Database } from "bun:sqlite";

// Inicia o banco de dados caso não exista
const db = new Database("mydb.sqlite", { create: true });

// Cria a tabela de expressões caso não exista
db.run("CREATE TABLE IF NOT EXISTS expressions (timestamp REAL, neutral REAL, happy REAL, sad REAL, angry REAL, fearful REAL, disgusted REAL, surprised REAL);");

// Limpa a tabela de expressões
// db.run("DELETE FROM expressions;");

export default db;
