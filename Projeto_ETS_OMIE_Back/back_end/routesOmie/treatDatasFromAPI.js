const priceConsult = require("./priceConsultAPI");
const testefinal = require("../treatDatasToExcel/datasToExcel");

// const structureConsult = require("./structureConsultAPI");

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
      // if (arrayStructure[i].Qtd == 0.00001) {
      //   arrayStructure[i].Qtd = 2;
      // }
      if (matchingPrice) {
        arrayStructure[i].Preco =
          parseFloat(matchingPrice.Preco) * 3 * arrayStructure[i].Qtd;
      }
      console.log(arrayStructure[i].Qtd);
    }

    arrayStructure.forEach((structure) => {
      structure.Preco = parseFloat(structure.Preco.toFixed(2));
    });
    receiveArrayStructPrices = arrayStructure;
    console.log(receiveArrayStructPrices);
    return receiveArrayStructPrices;
  };
  // let exportData = (arrayStructPrices) => {
  //   return arrayStructPrices;
  // };
  await treatPricesandStructure();
  testefinal.teste(receiveArrayStructPrices);
}
module.exports = { treatAllDatas, catchPostStructure };
