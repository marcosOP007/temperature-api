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

      if(req.params.id != req.user_id){
         return res.status(401).json({
           error: true,
           code: 130,
           message: "Acesso negado!"
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