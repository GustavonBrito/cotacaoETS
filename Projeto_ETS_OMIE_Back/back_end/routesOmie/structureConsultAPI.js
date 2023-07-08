require("isomorphic-fetch");

require("../config/authorization.js");

let catchPostStructure = require("./treatDatasFromAPI.js");

let baseURL = require("../baseURL/baseURL");

const authorization = require("../config/authorization.js");

let sendData = async (req) => {
  let body = {
    app_key: authorization.app_key,
    app_secret: authorization.app_secret,
    call: "ConsultarEstrutura",
    param: [
      {
        codProduto: req.profile,
      },
    ],
  };
  structureConsult(body);
};
async function structureConsult(body) {
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    let apiResponse = await fetch(`${baseURL}/geral/malha/`, request);

    if (apiResponse.status == 200) {
      let finalResponse = await apiResponse.json();
      catchPostStructure.catchPostStructure(finalResponse);
    } else {
      throw Error("Error in searching structure");
    }
  } catch (error) {
    console.log(error);
  }
}

// Exporta para "treatDatasFromAPI"
module.exports = { sendData, structureConsult };
