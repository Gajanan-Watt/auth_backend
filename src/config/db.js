const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://Bintix:Bintix12345@cluster0.yqglw.mongodb.net/test"
  );
};
