const UserModel = require("../models/users.js");
const mongoose = require("mongoose");
const { matchedData } = require("express-validator");

const createItem = async (req, res) => {
  try {
    console.log(req);
    const body = matchedData(req);
    const result = await UserModel.create(body);
    console.log("Recurso creado\n", result);
    res.status(201).json(result);
  } catch (error) {
    if (error.code === 11000) {
      console.error("User-Post. Email repetido\n", error);
      res
        .status(400)
        .send(
          "El email introducido ya existe. Por favor, introduzca otro email"
        );
    } else {
      console.error("User-Post. Error del servidor\n", error);
      res.status(500).send("Error del servidor");
    }
  }
};

const getItems = async (req, res) => {
  try {
    const result = await UserModel.find(); //.exec()?
    console.log("Recurso encontrado\n", result);
    res.status(200).json(result);
  } catch (error) {
    console.error("User-Get. Error del servidor\n", error);
    res.status(500).send("Error del servidor");
  }
};

const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    // Verificar si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID no válido" });
    }

    const result = await UserModel.findById(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("User-Get-Id. Error del servidor\n", error);
    res.status(500).send("Error del servidor");
  }
};

const replaceUser = async (req, res) => {
  // PUT
  try {
    const email = req.params.email;
    console.log(email);
    const result = await UserModel.findOneAndReplace({ email }, req.body, {
      returnDocument: "after", // !Necesario
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("User-Put. Error del servidor\n", error);
    res.status(500).send("Error del servidor");
  }
};

const updateUser = async (req, res) => {
  // PATCH
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID no válido" });
    }
    const result = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }); //new: true para que devuelva el documento actualizado y runValidators: true para que valide los campos
    res.status(200).json(result);
  } catch (error) {
    console.error("User-Put. Error del servidor\n", error);
    res.status(500).send("Error del servidor");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID no válido" });
    }
    const result = await UserModel.delete({ _id: id }); // UserModel.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("User-Delete. Error del servidor\n", error);
    res.status(500).send("Error del servidor");
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  replaceUser,
  updateUser,
  deleteUser,
};
