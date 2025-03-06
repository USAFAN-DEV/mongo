require("dotenv").config();

const customHeader = (req, res, next) => {
  try {
    const api_key = req.headers.api_key;
    console.log(api_key);
    if (api_key == process.env.API_KEY) {
      next();
    } else {
      res
        .status(403)
        .send("La api_key es incorrecta. Por favor, vuelva a intentarlo");
    }
  } catch (err) {
    res.status(403).send({ errors: err });
  }
};

module.exports = customHeader;
