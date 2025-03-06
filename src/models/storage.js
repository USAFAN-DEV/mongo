const mongoose = require("mongoose");

const StorageScheme = new mongoose.Schema(
  {
    url: String,
    filename: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("storage", StorageScheme);
