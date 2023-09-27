// @ts-check
import bcrypt from "bcrypt";

/**
 * @returns {boolean}
 * @param {import("qs").ParsedQs[0]} senhaQuery  */
export function naoTemAcesso(senhaQuery) {
  if (typeof senhaQuery !== "string") return true;
  if (!process.env.HASH) {
    console.error("PROCESS HASH MISSING");
    return true;
  }
  return !bcrypt.compareSync(senhaQuery, process.env.HASH);
}
