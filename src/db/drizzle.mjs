// // @ts-check
// import Database from "better-sqlite3";
// import { drizzle } from "drizzle-orm/better-sqlite3";
// import { desc, eq } from "drizzle-orm";
// import { tabelaVersoes } from "./schema.mjs";

// const sqlite = new Database("database.db");

// /** @typedef {Pick<import("./schema.mjs").Versao, "id">} DeletarVersao */
// /** @typedef {Omit<import("./schema.mjs").Versao, "id">} InserirVersao */
// class GeradorTreinoDb {
//   /** @type {import("drizzle-orm/better-sqlite3").BetterSQLite3Database<Record<string, never>>} */
//   static _db;
//   constructor() {}

//   db() {
//     if (this._db === null) this._db = drizzle(sqlite);
//     console.log(sqlite, this._db);
//     return this._db;
//   }
//   /** @param {InserirVersao} versao  */
//   async inserirVersao(versao) {
//     const db = this.db();
//     console.log(db);
//     if (!db) return;

//     const res = await db
//       .insert(tabelaVersoes)
//       .values({
//         download: versao.download,
//         nome: versao.nome,
//         id: 0,
//         versao: versao.versao,
//       })
//       .returning();
//     return res[0];
//   }

//   /** @param {import("./schema.mjs").Versao} versao */
//   async editarVersao(versao) {
//     const db = this.db();
//     if (!db) return;

//     const res = await db
//       .update(tabelaVersoes)
//       .set(versao)
//       .where(eq(tabelaVersoes.id, versao.id))
//       .returning();
//     return res[0];
//   }

//   /**
//    *
//    * @param {DeletarVersao} versao
//    */
//   async deletarVersao(versao) {
//     const db = this.db();
//     if (!db) return;

//     const res = await db
//       .delete(tabelaVersoes)
//       .where(eq(tabelaVersoes.id, versao.id))
//       .returning();
//     return res[0];
//   }

//   async adquirirVersoes() {
//     const db = this.db();
//     if (!db) return;

//     const res = await db
//       .select()
//       .from(tabelaVersoes)
//       .orderBy(desc(tabelaVersoes.versao));
//     return res;
//   }

//   async adquirirUltimaVersao() {
//     const db = this.db();
//     if (!db) return;

//     const res = await db
//       .select()
//       .from(tabelaVersoes)
//       .orderBy(desc(tabelaVersoes.versao))
//       .limit(1);
//     return res[0];
//   }
// }

// export default new GeradorTreinoDb();
