// @ts-check
import BetterSQLite from "better-sqlite3";

const TABELA_VERSAO = "versao";
const COLUNA_ID_VERSAO = "idVersao";
const COLUNA_NOME_VERSAO = "nomeVersao";
const COLUNA_DOWNLOAD_VERSAO = "downloadVersao";
const COLUNA_VERSAO_VERSAO = "versaoVersao";

class Database {
  /** @type {BetterSQLite.Database} */
  static _db;

  constructor() {}

  db() {
    if (this._db) return this._db;

    this._db = BetterSQLite("database.db");
    this._db.pragma("journal_mode = WAL");
    this._db.exec(`CREATE TABLE IF NOT EXISTS ${TABELA_VERSAO} (
        ${COLUNA_ID_VERSAO} INTEGER PRIMARY KEY AUTOINCREMENT,
        ${COLUNA_NOME_VERSAO} TEXT,
        ${COLUNA_VERSAO_VERSAO} DECIMAL(5,3) NOT NULL,
        ${COLUNA_DOWNLOAD_VERSAO} TEXT NOT NULL
    )`);
    return this._db;
  }

  /**
   * @param {string} query
   * @returns {(import("../tipos/versao").Versao)[]} */
  adquirirVersoes(query) {
    const db = this.db();

    const likeQuery = `%${query}%`;

    /** @type {any} */
    const res = db
      .prepare(
        `SELECT * FROM ${TABELA_VERSAO} WHERE ${COLUNA_NOME_VERSAO} LIKE ? OR ${COLUNA_DOWNLOAD_VERSAO} LIKE ? OR ${COLUNA_VERSAO_VERSAO} = ? ORDER BY ${COLUNA_VERSAO_VERSAO} DESC`
      )
      .all(likeQuery, likeQuery, query);

    /** @type {import("../tipos/versao").Versao[]} */
    const versoes = res.map((res) => this.parseVersaoDb(res));
    return versoes;
  }

  parseVersaoDb(res) {
    if (!res) return;
    /** @type {import("../tipos/versao").Versao} */
    const resultado = {
      download: res[COLUNA_DOWNLOAD_VERSAO],
      id: res[COLUNA_ID_VERSAO],
      versao: res[COLUNA_VERSAO_VERSAO],
      nome: res[COLUNA_NOME_VERSAO],
    };
    return resultado;
  }

  /** @param {Omit<import("../tipos/versao").Versao, "id">} versao  */
  inserirVersao(versao) {
    const db = this.db();

    const stmt = db.prepare(
      `INSERT INTO ${TABELA_VERSAO} (${COLUNA_NOME_VERSAO}, ${COLUNA_DOWNLOAD_VERSAO}, ${COLUNA_VERSAO_VERSAO}) VALUES (?, ?, ?)`
    );
    const info = stmt.run(
      versao.nome ? versao.nome : "",
      versao.download,
      versao.versao
    );
    return info.changes;
  }

  /** @param {import("../tipos/versao").Versao} versao  */
  atualizarVersao(versao) {
    const db = this.db();
    const stmt = db.prepare(
      `UPDATE ${TABELA_VERSAO} SET ${COLUNA_NOME_VERSAO} = ?, ${COLUNA_DOWNLOAD_VERSAO} = ?, ${COLUNA_VERSAO_VERSAO} = ? WHERE ${COLUNA_ID_VERSAO} = ?`
    );

    const info = stmt.run(
      versao.nome,
      versao.download,
      versao.versao,
      versao.id
    );
    return info;
  }

  /** @param {number} id  */
  deletarVersao(id) {
    const db = this.db();
    const stmt = db.prepare(
      `DELETE FROM ${TABELA_VERSAO} WHERE ${COLUNA_ID_VERSAO} = ?`
    );
    return stmt.run(id);
  }
  adquirirUltimaVersao() {
    const db = this.db();

    /** @type {any} */
    const res = db
      .prepare(
        `SELECT * FROM ${TABELA_VERSAO} ORDER BY ${COLUNA_VERSAO_VERSAO} DESC LIMIT 1`
      )
      .all();
    return this.parseVersaoDb(res[0]);
  }
}
const db = new Database();
export default db;
