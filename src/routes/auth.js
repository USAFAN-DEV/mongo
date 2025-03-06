const express = require("express");
const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const UserModel = require("../models/users.js");
const router = express.Router();
const { validatorRegister, validatorLogin } = require("../validators/auth");
const { tokenSign, verifyToken } = require("../utils/handleJWT.js");
// Posteriormente, llevaremos la lógica al controller
router.post("/register", validatorRegister, async (req, res) => {
  console.log(req.body);
  req = matchedData(req);
  console.log(req);
  const password = await encrypt(req.password);
  const body = { ...req, password }; // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
  const dataUser = await UserModel.create(body);
  dataUser.set("password", undefined, { strict: false });
  const data = {
    token: await tokenSign(dataUser),
    user: dataUser,
  };
  res.send(data);
});
//TODO router.post("/login", (req, res) => {}
module.exports = router;
