const express = require("express");
const storageRouter = express.Router();
const {
  uploadMiddleware,
  uploadMiddlewareMemory,
} = require("../utils/handleStorage.js");
const {
  createItem,
  getItems,
  getItemById,
  replaceUser,
  updateUser,
  deleteUser,
  uploadImage,
} = require("../controllers/storage.js");

// Rutas
storageRouter.get("/", getItems);
storageRouter.get("/:id", getItemById);

// Middleware de subida con control de errores
storageRouter.post(
  "/",
  (req, res, next) => {
    uploadMiddleware.single("file")(req, res, function (err) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ error: "El archivo es demasiado grande (máx: 5MB)" });
        }
        return res
          .status(500)
          .json({ error: "Error en la subida del archivo" });
      }
      next();
    });
  },
  createItem
);

storageRouter.post(
  "/dd",
  (req, res, next) => {
    uploadMiddlewareMemory.single("file")(req, res, function (err) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ error: "El archivo es demasiado grande (máx: 5MB)" });
        }
        return res
          .status(500)
          .json({ error: "Error en la subida del archivo" });
      }
      next();
    });
  },
  uploadImage
);

storageRouter.put("/:id", replaceUser);
storageRouter.patch("/:id", updateUser);
storageRouter.delete("/:id", deleteUser);

module.exports = storageRouter;
