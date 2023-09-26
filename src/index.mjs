// @ts-check
import Express, { json } from "express";
import router from "./rotas/versao.mjs";
const app = Express();
const port = 8080;

app.use(json());
app.use("/versao", router);

app.listen(port, () => {
  console.log("Server running");
});
