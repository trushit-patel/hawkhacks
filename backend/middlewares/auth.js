const jwt = require("jsonwebtoken");
const { User } = require("../models/user.js");

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send("Unauthorized Access");
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(404).send("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send(error?.message || "Invalid Access");
  }
};

module.exports = [
    verifyJWT,
]