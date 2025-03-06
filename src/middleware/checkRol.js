const checkRol = (roles) => (req, res, next) => {
  // Doble argumento
  try {
    const { user } = req;
    const userRol = user.role;
    const checkValueRol = roles.some((roles) => userRol.includes(roles)); //Comprobamos que el rol del usuario esté en roles
    if (!checkValueRol) {
      console.log("Acceso no permitido");
      return;
    }
    next();
  } catch (err) {
    console.log("Error:" + err);
  }
};
module.exports = checkRol;
