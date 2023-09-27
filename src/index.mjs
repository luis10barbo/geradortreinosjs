// @ts-check
import Express, { json } from "express";
import router from "./rotas/versao.mjs";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = Express();
const port = 8080;

app.use(json());
app.use(cors());
app.use("/versao", router);
app.get("/", async (req, res) => {
  const caminho = process.cwd() + "/src/static/gui.html";
  res.sendFile(caminho);
});

app.listen(port, () => {
  console.log("Server running");
});
