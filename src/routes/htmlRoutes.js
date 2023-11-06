const {Router} = require('express');
const express = require('express');
const app = express();
const path = require('path');
const router = Router();
const fs = require('fs');
const UserController = require('../Controller/UserController')
const ChannelController = require('../Controller/ChannelController')
const SensorController = require('../Controller/SensorController');
const AuthMiddle = require('../MiddleWares/AuthMiddle');
const AuthorizationMiddle = require('../MiddleWares/AuthorizationMiddle');
const Authcation = require('../MiddleWares/AuthId')
const permissionCheck = require('../MiddleWares/permissionCheck');


router.get('/', (req, res) =>{
    
 })

 router.get('/login', (req, res) =>{
    console.log("pagina pegada com sucesso")
   res.render(path.join(__dirname, '../Views/html/public/login.ejs'))
})
    
router.get('/registro', async (req, res) =>{
    console.log(await (UserController.getAllModerator()))
    const fs = require('fs');
    res.render(path.join(__dirname, '../Views/html/public/registro.ejs'));
    
})


router.get('/channel/:id/edit_view',permissionCheck.verifyUserPermission('MODERATOR','ADMIN'), async (req,res) => {
    
    channel = await ChannelController.getChannelById(req.params.id);

    if(!channel){
        return res.send("canal não existe")
    }
    console.log(channel)
    res.render(path.join(__dirname, '../Views/html/moderator/adm-editchannel.ejs'), {
        dadosSensoresADM: channel,
        userId: req.query.id,
    });
})



router.get('/sensors/:id', AuthMiddle, async (req, res) => {
    const parentDir = path.join(__dirname, '..'); 

    try{
        user = UserController.getUserById(req.user_id)
        if(user.permission_type == "ADMIN"){
            return res.redirect('/index/adm/')
        }
        res.render(path.join(parentDir, '/viewsOfficial/charts.ejs'), {dadosSensores: await ChannelController.getAllSensors(req.params.id)});
    }catch(err){
        console.log(err)
    }
    
})

router.get('/adm/sensor', AuthorizationMiddle, async (req, res) => {
    const parentDir = path.join(__dirname, '..')
    res.render(path.join(parentDir, '/viewsOfficial/criarSensor.ejs'), /*{'COLOCAR AQUI OS DADOS QUE DESEJA ENVIAR'}*/) 
})

router.get('/adm/canal', AuthorizationMiddle, async (req, res) => {
    const parentDir = path.join(__dirname, '..')
    res.render(path.join(parentDir, '/viewsOfficial/criarCanal.ejs'), /*{'COLOCAR AQUI OS DADOS QUE DESEJA ENVIAR'}*/) 
})

router.get('/adm/logTemp', AuthorizationMiddle ,async (req, res) => {
    const parentDir = path.join(__dirname, '..')
    res.render(path.join(parentDir, '/viewsOfficial/logTemp.ejs'), /*{'COLOCAR AQUI OS DADOS QUE DESEJA ENVIAR'}*/) 
})

router.get('/adm/', AuthorizationMiddle, async(req, res) => {
    res.render(path.join(__dirname, '../viewsOfficial/indexADM.ejs'), {dadosADM: await ChannelController.getAllChannels(), userId: req.params.id});
})

router.get('/channel/edit/:id', AuthorizationMiddle, async(req, res) => {
    res.render(path.join(__dirname, '../Views/html/moderator/edit_channel.ejs'), {dadosSensoresADM: await ChannelController.getAllSensors(req.params.id)})
})


router.post('/deletarSensorClient/:id', AuthMiddle, async(req, res) => {
    
    //await UserController.deletChannelByuser();
})




router.get('/sensor/edit/:id', AuthorizationMiddle, async(req, res) => {
    res.render(path.join(__dirname, '../Views/html/moderator/edit_sensor.ejs'), {dadoSensor: await SensorController.getSensorById(req.params.id)})
})

router.post('/admDeletarSensor/:id', AuthorizationMiddle, async(sensorId) => {
    const idDelete = sensorId.params.id
    console.log("recebido")
    await SensorController.deleteSensor(idDelete);
})


router.get('/:id', AuthMiddle, Authcation, async (req, res) => {
  
    try {
        const userId = req.params.id;
        const user = await UserController.getUserById(userId);
        //console.log("=======================================================" , user)
        
        if (!user) {
            return res.render(path.join(__dirname, '../Views/html/public/login.ejs'));
        }
        const userPermission = user.permission_type;

        console.log("user permission " + userPermission + " logged")
        if (userPermission === 'USER') {
            const data = await UserController.getAllChannelsByUser(userId);

            res.render(path.join(__dirname, '../Views/html/user/index.ejs'), { dados: data,   userID: userId });
        } else if (userPermission === 'MODERATOR') {
            res.render(path.join(__dirname, '../Views/html/moderator/index.ejs'), {
                dados: await ChannelController.getAllChannelByModerator(userId),
                userId:userId,
            });

        } else if (userPermission === 'ADMIN') {
            
            res.render(path.join(__dirname, '../Views/html/admin/index.ejs'), {
                dados: await UserController.getAllModerator(),
                userId:userId,
            });
        } else {
            // Redirecione para uma página de permissão negada ou faça algo apropriado
            res.render(path.join(__dirname, '../Views/html/public/404.ejs'));
        }
    } catch (errora) {
        console.log("erroME: ", errora);
        res.status(500).send('Erro interno do servidor');
    }
});

router.get('/admin/moderator-channels/:id',permissionCheck.verifyUserPermission('ADMIN'), async (req, res) => {
    
    //if(!req.query.id) throw Error("não ah id")

    const channels = await ChannelController.getAllChannelByModerator(req.params.id);

    res.render(path.join(__dirname, '../Views/html/moderator/channel.ejs'), {
        dados: channels,
        permision: 'ADMIN',
        userID:req.params.id,
    });
});


router.get('/v/not-autorized', async(req, res)=> {

    res.status(401).render(path.join(__dirname, '../Views/html/public/401.ejs'), {
        login: (req.cookies.token !== undefined ? true : false),
    });
})


router.get('/v/not-found', async(req, res)=> {

    res.status(401).render(path.join(__dirname, '../Views/html/public/404.ejs'), {
        login: (req.cookies.token !== undefined ? true : false),
    });
})


module.exports = router;
