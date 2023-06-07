require("dotenv").config();

let authorization = {
  app_key: process.env.APP_KEY || "3511973821356",
  app_secret: process.env.APP_SECRET || "6d46b0e6de33eb390fc790b822cf179b",
};

module.exports = authorization;
