// @ts-check
import Express, { json } from "express";
import router from "./rotas/versao.mjs";
import cors from "cors";
const app = Express();
const port = 8080;

app.use(json());
app.use(cors());
app.use("/versao", router);
app.get("/gui", async (req, res) => {
  const caminho = process.cwd() + "/src/static/gui.html";
  console.log(caminho);
  res.sendFile(caminho);
});

app.listen(port, () => {
  console.log("Server running");
});
