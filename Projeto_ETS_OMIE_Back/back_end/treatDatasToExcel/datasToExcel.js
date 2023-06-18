const XlsxPopulate = require("xlsx-populate");

// let infoFromXml = require("../dataFromXml/dataFromXml");
// const workbook = require("excel4node/distribution/lib/workbook");

let postInfoFromTreatDatas = async (structure) => {
  await run(structure);
};

// Alterar nome de função
let run = (structure) => {
  async function getTreatDatasFromAPI() {
    let structureToExcel = await structure;
    await excelPopulate(structureToExcel);
    return structureToExcel;
  }

  let excelPopulate = async (arrayStructureforExcel) => {
    return XlsxPopulate.fromBlankAsync().then((workbook) => {
      // adiciona uma nova aba na planilha
      // let new_sheet = sheet.addSheet("Nova Sheet");

      // Nomeia uma aba da planilha como Planilha1

      const sheet = workbook.sheet(0);
      sheet.name("planilha");
      sheet.row(1).cell(1).value("Part Numbers");
      sheet.row(1).cell(2).value("Quantidade");
      sheet.row(1).cell(3).value("Preços com Fator 3");
      // Arrays que recebem posições das celulas no excel
      let cellColumnA = [];
      let cellColumnB = [];
      let cellColumnC = [];

      for (let i = 2; i <= arrayStructureforExcel.length + 1; i++) {
        cellColumnA.push(`A${i}`);
        cellColumnB.push(`B${i}`);
        cellColumnC.push(`C${i}`);
      }
      sum = 0;
      for (let i = 0; i < cellColumnA.length; i++) {
        sheet.cell(cellColumnA[i]).value(arrayStructureforExcel[i].PartNumber);
        sheet.cell(cellColumnB[i]).value(arrayStructureforExcel[i].Qtd);
        sheet.cell(cellColumnC[i]).value(arrayStructureforExcel[i].Preco);
        sheet
          .row(cellColumnC.length + 2)
          .cell(3)
          .value("Total: " + (sum += arrayStructureforExcel[i].Preco));
      }
      // console.log(
      //   sheet.cell(cellColumnB[i]).value(arrayStructureforExcel[i].Qtd)
      // );
      // console.log(workbook);
      // return workbook;
      // Salva o arquivo pelo backend direto
      return workbook.toFileAsync("StructureAndPrizes.xlsx");
    });
  };
  return getTreatDatasFromAPI();
};

module.exports = { run, postInfoFromTreatDatas };
