const jwt = require("jsonwebtoken");
const UserController = require('../Controller/UserController')


const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const auth = req.cookies.token;

  if(!auth){
    return res.status(401).json({
      error: true,
      code: 130,
      message: "O token de autenticação não existe!"
    })
  }

  const [, token] = auth.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(auth, process.env.SECRET);

    if(!decoded){
      return res.status(401).json({
        error: true,
        code: 130,
        message: "O token está expirado!"
      })
    } else {
      req.user_id = decoded.id;

      user = await UserController.getUserById(req.user_id);

      if(!user){
        return res.status(401).json({
            error: true,
            code: 130,
            message: "Usuario não existe! "
        })
      }
   
      if(user.permission_type === "USER"){
        return res.status(401).json({
            error: true,
            code: 130,
            message: "Usuario não tem permissão necessaria! "
        })
      }
      
      next();
    }
    
  } catch {
    return res.status(401).json({
      error: true,
      code: 130,
      message: "O token está inválido!"
    })
  }

}