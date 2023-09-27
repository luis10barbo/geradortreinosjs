//@ts-check
import { Router } from "express";
import db from "../db/database.mjs";

const router = Router();

router.get("/", async (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q : "";
  const versoes = db.adquirirVersoes(query);
  res.json(versoes);
});

router.get("/ultima", async (req, res) => {
  const versao = await db.adquirirUltimaVersao();
  res.json(versao);
});

router.post("/", async (req, res) => {
  if (req.body.id) {
    // Modificar
    const dif = db.atualizarVersao({
      id: req.body.id,
      nome: req.body.nome,
      download: req.body.download,
      versao: req.body.versao,
    });
    return res.json(dif);
  }
  // Criar
  const dif = db.inserirVersao({
    nome: req.body.nome,
    download: req.body.download,
    versao: req.body.versao,
  });
  return res.json(dif);
});

router.delete("/", (req, res) => {
  if (!req.body.id) return res.json(new Error("No id provided"));
  res.json(db.deletarVersao(req.body.id));
});

export default router;
