const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const auth = req.cookies.token;
  console.log(auth)
  console.log(req.headers.authorization);
  if(!auth){
    return res.status(401).json({
      error: true,
      code: 130,
      message: "O token de autenticação não existe!"
    })
  }

  try {
    const decoded = jwt.verify(auth, process.env.SECRET);
    
    if(!decoded){
      return res.status(401).json({
        error: true,
        code: 130,
        message: "O token está expirado!"
      })
    } else {
      req.user_id = decoded.id;
      
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