const jwt = require("jsonwebtoken");
const UserController = require('../Controller/UserController')
const { promisify } = require('util');

function verifyUserPermission(...requiredPermissions) {
  return async (req, res, next) => {
    try {
      const authToken = req.cookies.token;
      if (!authToken) {
        return res.status(401).json({
          error: true,
          code: 130,
          message: 'Token de autenticação ausente',
        });
      }

      const decodedToken = await promisify(jwt.verify)(authToken, process.env.SECRET);
      req.user_id = decodedToken.id;
      
      const user = await UserController.getUserById(req.user_id);
      req.data_user = user;
      if (!user) {
        return res.status(401).json({
          error: true,
          code: 130,
          message: 'Usuário não existe',
        });
      }


      if (requiredPermissions.includes(user.permission_type)) {
        
        next();
      } else {
        
       return res.redirect('/index/v/not-autorized')
       // res.status(403).json({ error: 'Acesso negado: Permissão insuficiente' });
      }
    } catch (error) {
      console.error(error);
      return res.redirect(`/index/v/not-autorized?user_id`);
    }
  };
}



function verifyStatus() {
  return async (req, res, next) => {
    try {

      if (req.data_user.dataValues.status =='ACTIVE') {
        next();
      } else {
        res.status(403).json({ error: 'Acesso negado: Conta desligada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao verificar permissões' });
    }
  };
}


module.exports = {
    verifyStatus,
    verifyUserPermission,
};
