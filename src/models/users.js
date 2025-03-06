const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const UserSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    email: {
      type: String,
      unique: true,
    },
    password: String, //TODO Guardaremos el HASH
    role: {
      type: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("users", UserSchema);
