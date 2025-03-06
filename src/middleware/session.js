const { verifyToken } = require("../utils/handleJWT");
const UserModel = require("../models/users.js");
const mongoose = require("mongoose");

const authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    console.log("Error, no hay authorization");
  } else {
    const token = req.headers.authorization.match(/Bearer\s(\S+)/)[1];
    const data = verifyToken(token);
    if (data) {
      const user = await UserModel.findById(data._id);
      req.user = user;
      console.log("Token correcto");
      next();
    } else {
      console.log("Token incorrecto");
    }
  }
};

module.exports = authMiddleware;
