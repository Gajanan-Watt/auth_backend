const app = require("./index");

const connect = require("./config/db");

const port = process.env.PORT || 3456;

app.listen(port, async (req, res) => {
  await connect();
  console.log("Server connected");
});
