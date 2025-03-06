const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const validatorCreateItem = [
  check("name").exists().notEmpty(), //.isLength(min:5, max:90)
  check("email").exists().notEmpty(),
  check("age").optional(),
  check("password").exists().notEmpty(),
  check("role").optional(),
  (req, res, next) => validateResults(req, res, next),
];
module.exports = validatorCreateItem;
