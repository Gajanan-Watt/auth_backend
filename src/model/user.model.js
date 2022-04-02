const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Name: { type: "String", required: true },
    Email: { type: "String", required: true },
    Password: { type: "String", required: true },
    PhoneNumber: { type: "Number", required: true },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
