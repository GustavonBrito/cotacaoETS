// // Pega as informações do array, joga ela uma rota e envia para o caominho app, o app envia a informação para index e o arquivo executa.

// let structureWithPrices = require("../routesOmie/treatDatasFromAPI");
const express = require("express");
const router = express.Router();
const task = require("./controller/profileController");

// rota que está no botão para baixar planilha

router.get("/downloadQuotation", task.getAll);

// rota que carrega informações do usuario sobre estrutura desejada a ser requisitada

router.post("/loadInfosFromUser", task.postInfos);

module.exports = router;
