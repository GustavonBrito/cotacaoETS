require("dotenv").config();

let authorization = {
  app_key: process.env.APP_KEY || "3415159251504",
  app_secret: process.env.APP_SECRET || "f24dcc76a354597ae5f1d3b429d80196",
};

module.exports = authorization;
