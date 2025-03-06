const StorageModel = require("../models/storage.js");
const mongoose = require("mongoose");
const uploadToPinata = require("../utils/handleUploadIPFS.js");

const createItem = async (req, res) => {
  try {
    const { body, file } = req;
    if (!file) {
      return res.status(400).json({ error: "No se ha subido ningún archivo" });
    }

    const fileData = {
      filename: file.filename,
      url: process.env.PUBLIC_URL + "/" + file.filename,
    };

    const data = await StorageModel.create(fileData);
    res.send(data);
  } catch (error) {
    console.error("Storage-Post. Error del servidor\n", error);
    res.status(500).send("Error del servidor");
  }
};

const uploadImage = async (req, res) => {
  try {
    const id = req.params.id;
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const pinataResponse = await uploadToPinata(fileBuffer, fileName);
    const ipfsFile = pinataResponse.IpfsHash;
    const ipfs = `https://${process.env.PINATA_GATEWAY_URL}/ipfs/${ipfsFile}`;
    const data = await StorageModel.create({
      url: ipfs,
      filename: fileName,
      new: true,
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("ERROR_UPLOAD_COMPANY_IMAGE");
    //handleHttpError(res, "ERROR_UPLOAD_COMPANY_IMAGE")
  }
};

const getItems = async (req, res) => {
  try {
    const result = await StorageModel.find(); //.exec()?
    console.log("Recurso encontrado\n", result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Storage-Get. Error del servidor\n", error);
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

    const result = await StorageModel.findById(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Storage-Get-Id. Error del servidor\n", error);
    res.status(500).send("Error del servidor");
  }
};

const replaceUser = async (req, res) => {
  // PUT
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID no válido" });
    }
    const result = await StorageModel.findOneAndReplace({ _id: id }, req.body, {
      returnDocument: "after",
    }); //returnDocument: 'after' para que devuelva el documento actualizado
    if (!result) {
      return res.status(404).json({ error: "Documento no encontrado" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Storage-Put. Error del servidor\n", error);
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
    const result = await StorageModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }); //new: true para que devuelva el documento actualizado y runValidators: true para que valide los campos
    res.status(200).json(result);
  } catch (error) {
    console.error("Storage-Put. Error del servidor\n", error);
    res.status(500).send("Error del servidor");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID no válido" });
    }
    const result = await StorageModel.findByIdAndDelete(id);
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
  uploadImage,
};
