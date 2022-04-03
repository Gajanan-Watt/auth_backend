const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = (token) => {
  return new Promise((res, rej) => {
    jwt.verify(token, process.env.JWT_ACCESS_KEY, function (err, token) {
      if (err) return rej(err);
      return res(token);
    });
  });
};

module.exports = async (req, res, next) => {
  // if we received token in the header
  const bearerToken = req.headers.authorization;
  // console.log(bearerToken);

  // if not bearer token

  if (!bearerToken)
    return res.status(400).json({ message: "Please provide valid token" });

  //else we will try to get the user from the token

  const token = bearerToken.split(" ")[1];
  // console.log("token", token);

  let user;
  try {
    user = await verifyToken(token);
  } catch (e) {
    res.status(400).json({ message: "Please provide valid token" });
  }

  if (!user) {
    return res.status(400).json({ message: "Please provide valid token" });
  }

  req.user = user;

  return next();
};
