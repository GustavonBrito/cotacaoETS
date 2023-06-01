require("../../treatDatasToExcel/datasToExcel");
const XlsxPopulate = require("xlsx-populate");
const bodyParser = require("body-parser");
require("body-parser-xml")(bodyParser);
const dataToConsult = require("../../routesOmie/structureConsultAPI");

// Transforma o arquivos teste.xlsx em um arquivo baixável
const getAll = async (req, res, next) => {
  XlsxPopulate.fromFileAsync("teste.xlsx")
    .then((workbook) => {
      // Make edits.
      //   workbook.sheet(0).cell("A1").value("foo");
      // Get the output
      // console.log(workbook.outputAsync());
      return workbook.outputAsync();
    })
    .then((data) => {
      // Set the output file name.
      // console.log(res.attachment());
      res.attachment("pivot.xlsx");

      // Send the workbook.
      res.send(data);
    })
    .catch(next);
};

const postInfos = async (req, res, next) => {
  try {
    const infoProfile = await dataToConsult.sendData(req.body);
    // console.log(res.status(201).json({ message: infoProfile }));
    return infoProfile;
  } catch (error) {
    // Se ocorrer algum erro, você pode passá-lo para o próximo middleware
    next(error);
  }
};

module.exports = { getAll, postInfos };
