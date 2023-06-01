let appWaiter = require("./app");
require("dotenv").config();

const PORT = process.env.PORT;

let waitApp = async () => {
  let app = await appWaiter;
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
};

waitApp();
