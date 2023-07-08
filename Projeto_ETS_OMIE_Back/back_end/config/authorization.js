require("dotenv").config();

let authorization = {
  app_key: process.env.APP_KEY || "3574395758934",
  app_secret: process.env.APP_SECRET || "44328628dde7ea844002fbcaab0a22af",
};

module.exports = authorization;
