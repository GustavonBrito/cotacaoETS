// let workbook = require("../src/controller/profileController");
// console.log(workbook.uploadIctcostmodel);
// const parser = require("xml2js").parseString;

// let readWorkbook = (sheet) => {
//   console.log(sheet);
//   //   parser(sheet, function (err, result) {
//   //     console.log(JSON.stringify(result));
//   //   });

//   //   let sla = JSON.stringify(sheet);
//   //   let sla2 = JSON.parse(sla);
//   //   let sheetFromUser = fs.readFileSync(sheet);
//   //   console.log(sheet);
//   //   parser.parseString(
//   //     sheetFromUser.substring(0, sheetFromUser.length),
//   //     function (err, result) {
//   //       var json = JSON.stringify(result);
//   //       console.log(json);
//   //     }
//   //   );

//   //   for (let i = 0; i < sla.length; i++) {
//   //     //   Pega um dado da linha 7, na segunda celula do arquivo
//   //     console.log(2);
//   //     console.log(rows[7].Cell[3].Data[0]._);
//   //     console.log(sla2.rows);
//   // for (let j = 0; j < cells.length; j++) {
//   //   const data = cells[j].Data[0];
//   //   console.log(data["_"]);
//   // }
//   // console.log(cells);
// };

// //   console.log("entrei em workbook");
// //   let sla = fs.readFileSync(sheet, { encoding: "utf-8", flag: "r" });
// //   xml2js.parseString(sla, (err, result) => {
// //     console.log(result);
// //   });
// //   console.log(sheet);
// //   xml2js.parseString(sheet, (err, result) => {
// //     if (err) {
// //       console.log("erroaqui");
// //       console.error(err);
// //     } else {
// //       // Processa os dados do objeto JavaScript
// //       // const obj = { "ss:Type": "String" };
// //       const rows = result.Workbook.Worksheet[0].Table[0].Row;
// //       info = rows[1].Cell[0].Data[0]._;
// //       // return info;
// //       for (let i = 0; i < rows.length; i++) {
// //         //   Pega um dado da linha 7, na segunda celula do arquivo
// //         // console.log(rows[7].Cell[3].Data[0]._)
// //         //   for (let j = 0; j < cells.length; j++) {
// //         //     const data = cells[j].Data[0];
// //         //     console.log(data["_"]);
// //         //   }
// //         //   console.log(cells);
// //       }
// //     }
// //   });

// // const { log } = require("console");

// // // Lê o arquivo XML
// // let sla = (body) => {
// //   let xml = fs.readFileSync(body, "utf-8");
// // };

// // let info;

// // // Converte o XML para um objeto JavaScript
// // xml2js.parseString(xml, (err, result) => {
// //   if (err) {
// //     console.error(err);
// //   } else {
// //     // Processa os dados do objeto JavaScript
// //     // const obj = { "ss:Type": "String" };
// //     const rows = result.Workbook.Worksheet[0].Table[0].Row;
// //     info = rows[1].Cell[0].Data[0]._;
// //     // return info;
// //     for (let i = 0; i < rows.length; i++) {
// //       //   Pega um dado da linha 7, na segunda celula do arquivo
// //       console.log(rows[7].Cell[3].Data[0]._);
// //       //   for (let j = 0; j < cells.length; j++) {
// //       //     const data = cells[j].Data[0];
// //       //     console.log(data["_"]);
// //       //   }
// //       //   console.log(cells);
// //     }
// //   }
// // });

// module.exports = { readWorkbook };
