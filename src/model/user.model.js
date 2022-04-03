const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: "String", required: false },
    email: { type: "String", required: true },
    password: { type: "String", required: true },
    phoneNumber: {
      type: "Number",
      required: false,
      min: 1000000000,
      max: 9999999999,
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  return next();
});

userSchema.methods.checkPassword = function (password) {
  return new Promise((res, rej) => {
    bcrypt.compare(password, this.password, function (err, same) {
      if (err) return rej(err);

      return res(same);
    });
  });
};

module.exports = mongoose.model("user", userSchema);
