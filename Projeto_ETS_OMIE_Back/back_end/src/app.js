const router = require("./router");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://127.0.0.1:5500", // ou a origem desejada
  })
);

// app.use((req, res, next) => {
//   res.setHeader(
//     "Cache-Control",
//     "no-store, no-cache, must-revalidate, private"
//   );
//   next();
// });

app.use(express.json());
app.use(router);

module.exports = app;
