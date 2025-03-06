const express = require("express");
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();
app.use(cors()); //Amdmitemos peticiones de cualquier origen
app.use(express.json()); //Para poder recibir datos en formato JSON
app.use(express.static("src/storage")); //http://localhost:3000/file.jpg

const dbConnect = require("./config/mongo");
dbConnect();

const router = require("./routes/index.js");
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
