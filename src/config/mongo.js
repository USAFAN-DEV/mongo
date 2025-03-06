const mongoose = require("mongoose");

const dbConnect = () => {
  const db_uri = process.env.DB_URI;
  mongoose.set("strictQuery", false); //Desabilitamos el modo estricto en las consultas
  try {
    mongoose.connect(db_uri);
  } catch (error) {
    console.err("Error conectando a la BBDD:", error);
  }

  //Listen events
  mongoose.connection.on("connected", () => {
    console.log("Connected to database");
  });
};

module.exports = dbConnect;
