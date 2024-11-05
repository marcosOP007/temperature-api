const {Router} = require('express');
const express = require('express');
const app = express();
const path = require('path');
const router = Router();
const UserController = require('../Controller/UserController')
const ChannelController = require('../Controller/ChannelController')
const SensorController = require('../Controller/SensorController');
const AuthMiddle = require('../MiddleWares/AuthMiddle');
const AuthorizationMiddle = require('../MiddleWares/AuthorizationMiddle');
const Authcation = require('../MiddleWares/AuthId')
const permissionCheck = require('../MiddleWares/permissionCheck');



 router.get('/login', async (req, res) =>{
    console.log("pagina pegada com sucesso")

    res.render(path.join(__dirname, '../views/html/public/login.ejs'))
})
    
router.get('/registro', async (req, res) =>{
    console.log(await (UserController.getAllModerator()))
    res.render(path.join(__dirname, '../views/html/public/registro.ejs'));
    
})


router.get('/channel/:id/edit_view',permissionCheck.verifyUserPermission('MODERATOR','ADMIN'),permissionCheck.verifyStatus(), async (req,res) => {
    if(isNaN(req.params.id)) return;
    channel = await ChannelController.getChannelById(req.params.id);
    
    if(!channel){
        return res.send("canal não existe ")
    }
    res.render(path.join(__dirname, '../views/html/moderator/adm-editchannel.ejs'), {
        dadosSensoresADM: channel.Sensores,
        channelId: req.params.id,
        userId: req.user_id,
        permission: req.data_user.dataValues.permission_type,
    });
})


router.get('/sensors/:id/edit_view', permissionCheck.verifyUserPermission('MODERATOR','ADMIN'),permissionCheck.verifyStatus(), async (req, res) => {
    if(isNaN(req.params.id)) return;
    try{
        user = UserController.getUserById(req.user_id)
        if(user.permission_type == "ADMIN"){
            return res.redirect('/index/adm/')
        }
        res.render(path.join(__dirname, '../views/html/moderator/edit_sensor.ejs'), {channelId: req.query.channelId,userId: req.user_id, dadoSensor: await SensorController.getSensorById(req.params.id)});
    }catch(err){
        console.log(err)
    }
    

})

router.get('/users',permissionCheck.verifyUserPermission('ADMIN'),permissionCheck.verifyStatus(), async (req,res) => {
    const channels = await UserController.getAllUsers();
    res.render(path.join(__dirname, '../views/html/admin/mod_users.ejs'), {
        dados: channels,
        permision: 'ADMIN',
        userId:req.user_id,
       
    });
})


router.get('/sensors/:id',permissionCheck.verifyUserPermission('ADMIN','MODERATOR','USER'),permissionCheck.verifyStatus(), AuthMiddle, async (req, res) => {
    if(isNaN(req.params.id)) return;
    try{
        
        user = UserController.getUserById(req.user_id)
        
        res.render(path.join(__dirname, '../views/html/user/charts.ejs'), {userId: req.user_id,dadosSensores: await ChannelController.getAllSensors(req.params.id), perm: req.data_user.dataValues.permission_type});
    }catch(err){
        console.log(err)
    }
    
})

router.get('/sensor/create/:id', permissionCheck.verifyUserPermission('MODERATOR'),permissionCheck.verifyStatus(), async (req, res) => {
    if(isNaN(req.params.id)) return;
    res.render(path.join(__dirname, '../views/html/moderator/createSensor.ejs'), {channelId: req.params.id,userId: req.user_id}) 
})



router.get('/channel/create', permissionCheck.verifyUserPermission('MODERATOR'),permissionCheck.verifyStatus(), async (req, res) => {
    res.render(path.join(__dirname, '../views/html/moderator/createChannel.ejs'), {userId: req.user_id}) 
})



router.get('/channel/edit/:id', permissionCheck.verifyUserPermission('MODERATOR','ADMIN'),permissionCheck.verifyStatus(), async(req, res) => {
    if(isNaN(req.params.id)) return;
    res.render(path.join(__dirname, '../views/html/moderator/edit_channel.ejs'), {userId: req.user_id,channel: await ChannelController.getChannelById(req.params.id)})
})





router.get('/sensor/edit/:id', permissionCheck.verifyUserPermission('MODERATOR','ADMIN'),permissionCheck.verifyStatus(), async(req, res) => {
    res.render(path.join(__dirname, '../views/html/moderator/edit_sensor.ejs'), {userId: req.user_id,dadoSensor: await SensorController.getSensorById(req.params.id)})
})

router.post('/admDeletarSensor/:id', permissionCheck.verifyUserPermission('MODERATOR','ADMIN'), async(sensorId) => {
    if(isNaN(req.params.id)) return;
    const idDelete = sensorId.params.id
    console.log("recebido")
    await SensorController.deleteSensor(idDelete);
})


router.get('/:id', permissionCheck.verifyUserPermission('ADMIN','USER', 'MODERATOR'),AuthMiddle, Authcation,permissionCheck.verifyStatus(), async (req, res) => {
    if(isNaN(req.params.id)) return;
    try { 
        const userId = req.params.id;
        const user = await UserController.getUserById(userId);
        
        if (!user) {
            return res.render(path.join(__dirname, '../views/html/public/login.ejs'));
        }
        const userPermission = user.permission_type;

        console.log("user permission " + userPermission + " logged")
        
        if (userPermission === 'USER') {
            const data = await UserController.getAllChannelsByUser(userId);

            res.render(path.join(__dirname, '../views/html/user/index.ejs'), { dados: data, userId:userId,  userID: userId });
        } else if (userPermission === 'MODERATOR') {
            
            
            res.render(path.join(__dirname, '../views/html/moderator/index.ejs'), {
                dados: await ChannelController.getAllChannelByModerator(userId),
                userId:userId,
            });

        } else if (userPermission === 'ADMIN') {
            
            res.render(path.join(__dirname, '../views/html/admin/index2.ejs'), {
                dados: await UserController.getAllModerator(),
                userId:userId,
            });
        } else {
            // Redirecione para uma página de permissão negada ou faça algo apropriado
            res.render(path.join(__dirname, '../views/html/public/404.ejs'));
        }
    } catch (errora) {
        console.log("erroME: ", errora);
        res.status(500).send('Erro interno do servidor');
    }
});

router.get('/admin/moderator-channels/:id',permissionCheck.verifyUserPermission('ADMIN'),permissionCheck.verifyStatus(), async (req, res) => {
    if(isNaN(req.params.id)) return;
    //if(!req.query.id) throw Error("não ah id")
    const channels = await ChannelController.getAllChannelByModerator(req.params.id);
    const mod = await UserController.getUserById(req.params.id);
    res.render(path.join(__dirname, '../views/html/admin/mod_channels.ejs'), {
        dados: channels,
        permision: 'ADMIN',
        userID:req.user_id,
        userId:req.user_id,
        modId: req.params.id,
        modName: mod.name,
    });
});

router.get('/v/not-autorized', async(req, res)=> {

    res.status(401).render(path.join(__dirname, '../views/html/public/401.ejs'), {
        login: (req.cookies.token !== undefined ? true : false),
        userId: req.query.user_id,
    });
})


router.get('/v/not-found', async(req, res)=> {

    res.status(401).render(path.join(__dirname, '../views/html/public/404.ejs'), {
        login: (req.cookies.token !== undefined ? true : false),
    });
})


module.exports = router;
