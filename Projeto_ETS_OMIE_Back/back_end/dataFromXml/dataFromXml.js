// const { log } = require("console");
// const fs = require("fs");
// const xml2js = require("xml2js");

// // Lê o arquivo XML
// const xml = fs.readFileSync(
//   "C:\\Users\\user\\Desktop\\ict_cost_model_1.xml",
//   "utf-8"
// );

// let info;

// // Converte o XML para um objeto JavaScript
// xml2js.parseString(xml, (err, result) => {
//   if (err) {
//     console.error(err);
//   } else {
//     // Processa os dados do objeto JavaScript
//     // const obj = { "ss:Type": "String" };
//     const rows = result.Workbook.Worksheet[0].Table[0].Row;
//     info = rows[1].Cell[0].Data[0]._;
//     // return info;
//     for (let i = 0; i < rows.length; i++) {
//       //   Pega um dado da linha 7, na segunda celula do arquivo
//       console.log(rows[7].Cell[3].Data[0]._);
//       //   for (let j = 0; j < cells.length; j++) {
//       //     const data = cells[j].Data[0];
//       //     console.log(data["_"]);
//       //   }
//       //   console.log(cells);
//     }
//   }
// });

// module.exports = info;
