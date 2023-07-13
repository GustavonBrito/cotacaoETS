let run = require("../../treatDatasToExcel/datasToExcel");
const XlsxPopulate = require("xlsx-populate");
// const bodyParser = require("body-parser");
// require("body-parser-xml")(bodyParser);
const dataToConsult = require("../../routesOmie/structureConsultAPI");
const multer = require("multer");
const XLSX = require("xlsx");
let readWorkbook = require("../../routesOmie/treatDatasFromAPI");
// let fs = require("fs");

const uploadIctcostmodel = async (req, res, next) => {
  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheet_name_list = workbook.SheetNames;

    if (sheet_name_list.length === 0) {
      return res.status(400).json({
        success: false,
        message: "XML sheet has no data",
      });
    }
    const sheetName = sheet_name_list[0];
    const sheet = workbook.Sheets[sheetName];
    const xmlData = XLSX.utils.sheet_to_json(sheet);

    // console.log(xmlData);
    // Process the XML data as needed
    readWorkbook.readWorkbook(xmlData);
    // console.log(xmlData);
    res.status(200).json({
      message: "XML data read successfully",
    });

    // manda o arquivo para a função sendo executada no arquivo "dataFromXml"
    // console.log(workbook);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
// XlsxPopulate.fromFileAsync("StructureAndPrizes.xlsx").then((response) => {
//   console.log(response._sharedStrings._stringArray);
// });
let postInfos = async (req, res, next) => {
  try {
    /* const infoProfile = */ await dataToConsult.sendData(req.body);
    // console.log(res.status(201).json({ message: infoProfile }));
    /* return infoProfile; */
  } catch (error) {
    // Se ocorrer algum erro, você pode passá-lo para o próximo middleware
    next(error);
  }
};
const getAll = async (req, res, next) => {
  try {
    // if (condition) {
    // } else {
    // }
    let workbook = await XlsxPopulate.fromFileAsync("StructureAndPrizes.xlsx");
    console.log(workbook._sharedStrings._stringArray);
    // console.log(workbook);

    // Realizar edições no workbook, se necessário.
    // workbook.sheet(0).cell("A1").value("foo");
    let bufferSize = 500;
    let data = await workbook.outputAsync();
    let totalChunks = Math.ceil(data.length / bufferSize);
    let chunks = [];
    for (let i = 0; i < totalChunks; i++) {
      const start = i * bufferSize;
      const end = start + bufferSize;
      const chunk = data.slice(start, end);
      chunks.push(chunk);
    }
    // console.log(chunks);
    // Definir o nome do arquivo de saída.
    await res.attachment("pivot.xlsx");

    // Enviar o workbook como resposta.
    await res.send(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { postInfos, getAll, uploadIctcostmodel, upload };
