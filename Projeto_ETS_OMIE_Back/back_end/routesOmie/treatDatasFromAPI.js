const priceConsult = require("./priceConsultAPI");
const transferDatatoTreat = require("../treatDatasToExcel/datasToExcel");
let test;
// // const structureConsult = require("./structureConsultAPI");
let readWorkbook = (sheet) => {
  // sheet.forEach((number, index, array) => {
  //   // console.log("Index: " + index + " Value: " + number);
  //   console.log(array);
  // });
  test = sheet;
  return test;
  // addStructurePrices(sheet[2].__EMPTY_5);
};

let catchPostStructure = async (structure) => {
  await treatAllDatas(structure);
};

async function treatAllDatas(structure) {
  let receiveArrayStructPrices;
  let treatPricesandStructure = async () => {
    let pricesInfo = await priceConsult;
    let structureInfo = await structure;
    // console.log(structureInfo);
    toObjectArray(pricesInfo, structureInfo);
  };

  let toObjectArray = (priceProducts, productStructure) => {
    let arrayPrices = priceProducts.produto_servico_cadastro.map((price) => {
      return {
        PartNumber: price.codigo,
        Preco: price.valor_unitario.toString(),
      };
    });
    let arrayStructure = productStructure.itens.map((product) => {
      return {
        PartNumber: product.codProdMalha,
        Qtd: product.quantProdMalha,
        Preco: null,
      };
    });
    return addStructurePrices(arrayStructure, arrayPrices);
  };

  let addStructurePrices = (arrayStructure, arrayPrices) => {
    for (let i = 0; i < arrayStructure.length; i++) {
      let matchingPrice = arrayPrices.find(
        (price) => price.PartNumber === arrayStructure[i].PartNumber
      );
      if (arrayStructure[i].Qtd == 0.1) {
        arrayStructure[i].Qtd = test[2].__EMPTY_5;
      }
      if (matchingPrice) {
        arrayStructure[i].Preco =
          parseFloat(matchingPrice.Preco) * 3 * arrayStructure[i].Qtd;
      }
    }

    arrayStructure.forEach((structure) => {
      structure.Preco = parseFloat(structure.Preco.toFixed(2));
    });
    receiveArrayStructPrices = arrayStructure;
    // console.log(receiveArrayStructPrices);
    return receiveArrayStructPrices;
  };
  // let exportData = (arrayStructPrices) => {
  //   return arrayStructPrices;
  // };
  await treatPricesandStructure();
  transferDatatoTreat.postInfoFromTreatDatas(receiveArrayStructPrices);
}
module.exports = { treatAllDatas, catchPostStructure, readWorkbook };
