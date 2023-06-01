require("isomorphic-fetch");

let baseURL = require("../baseURL/baseURL");

const authorization = require("../config/authorization.js");

const body = {
  app_key: authorization.app_key,
  app_secret: authorization.app_secret,
  call: "ListarProdutos",
  param: [
    {
      pagina: 1,
      registros_por_pagina: 50,
      apenas_importado_api: "N",
      filtrar_apenas_omiepdv: "N",
    },
  ],
};

async function priceConsult() {
  try {
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    let apiResponse = await fetch(`${baseURL}/geral/produtos/`, request);

    if (apiResponse.status == 200) {
      let finalResponse = await apiResponse.json();
      return finalResponse;
    } else {
      throw Error("Error searching products");
    }
  } catch (error) {
    console.log(error);
  }
}
priceConsult();

module.exports = priceConsult();
