const express = require("express");
const userRouter = express.Router();
const customHeader = require("../middleware/customHeader.js");
const validatorCreateItem = require("../validators/users.js");
const authMiddleware = require("../middleware/session.js");
const checkRol = require("../middleware/checkRol.js");
const {
  createItem,
  getItems,
  getItemById,
  replaceUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.js");

userRouter.get(
  "/",
  customHeader,
  authMiddleware,
  checkRol(["admin"]),
  getItems
);
userRouter.get("/:id", customHeader, getItemById);
userRouter.post("/", validatorCreateItem, customHeader, createItem);
userRouter.put("/:email", customHeader, replaceUser);
userRouter.patch("/:id", customHeader, updateUser);
userRouter.delete("/:id", customHeader, deleteUser);

module.exports = userRouter;
