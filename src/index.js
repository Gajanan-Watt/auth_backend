const express = require("express");
const { body } = require("express-validator");
const app = express();
const protect = require("./middleware/authenticate");

app.use(express.json());

const cors = require("cors");
app.use(cors());

const { register, login } = require("./controller/auth.controller");

// const userController = require("./controller/user.controller");

// app.use("/profile", userController);

app.post(
  "/register",
  body("email").custom(async (value) => {
    // value = a@a.com
    const isEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(value);
    // console.log(isEmail, value);
    if (!isEmail) {
      throw new Error("Please enter a proper email address!");
    }
    // const productByEmail = await User.findOne({ email: value }).lean().exec();
    // if (productByEmail) {
    //   throw new Error("Please try with a different email address");
    // }
    return true;
  }),
  body("phoneNumber")
    .isInt({ gt: 999999999, lt: 9999999999 })
    .withMessage("Please provide valid Phone Number!"),
  register
);
app.post("/login", protect, login);

module.exports = app;
