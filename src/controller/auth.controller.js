require("dotenv").config();
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let newErrors = errors.array().map(({ msg, param, location }) => {
      return {
        [param]: msg,
      };
    });
    return res.status(400).json({ errors: newErrors });
  }
  try {
    // check if mail already exists
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    // if exists then throw error
    if (user) {
      return res
        .status(400)
        .json({ message: "User Already Exists Plese login" });
    }

    user = await User.create(req.body);
    //we hashed the password as plain password is harmful
    //we will create a token
    const token = newToken(user);
    //return the user
    return res.status(201).json({ user, token });
  } catch (e) {
    return res.status(400).json({ message: e.message, status: "Failed" });
  }
};

const login = async (req, res) => {
  try {
    // if email is exists or not
    let user = await User.findOne({ email: req.body.email });
    // if not then throw error
    if (!user) {
      return res.status(400).json({ message: "User haven't register yet" });
    }
    // else we will match the password

    const match = await user.checkPassword(req.body.password);

    // if passowrd not matches throw error

    if (!match) {
      return res.status(400).json({ message: "Please provide valid password" });
    }
    // else send user and token
    const token = newToken(user);

    return res.status(201).json({ user, token });
  } catch (e) {
    return res.status(400).json({ message: e.message, status: "Failed" });
  }
};

module.exports = { register, login };
