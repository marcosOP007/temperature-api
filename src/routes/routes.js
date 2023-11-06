const {Router} = require('express');
const path = require('path');
const UserController = require('../Controller/UserController')
const TemperatureLogController = require('../Controller/TemperatureLogController')
const SensorController = require('../Controller/SensorController')
const midleAuth = require('../MiddleWares/AuthMiddle')
const router = Router();
const AuthorizationMiddle = require('../MiddleWares/AuthorizationMiddle')






//Rotas User
//router.post('/users/:userId/add-channel/:channelId', UserController.addChannelToUserRouter);
//router.get('/users/channels/:userId', UserController.getAllChannelsByUserRouter)

router.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/HTML/index.html'))
})

router.get('/', (req, res) => {
    const parentDir = path.join(__dirname, '..'); 
    res.sendFile(path.join(parentDir, 'Temp/create_all.html'));
})


router.get('/pag2', (req, res) => {
    const parentDir = path.join(__dirname, '..'); 
    res.sendFile(path.join(parentDir, 'Temp/pag2.html'));
})


router.get('/pagchannel', (req, res) => {
    const parentDir = path.join(__dirname, '..'); 
    res.sendFile(path.join(parentDir, 'Temp/pagChannel.html'));
})

router.get('/teste', (req, res) => {
    const parentDir = path.join(__dirname, '..'); 
    res.sendFile(path.join(parentDir, 'Teste/teste.html'));
})

router.get('/ejs', (req, res) => {
    const parentDir = path.join(__dirname, '..'); 
    res.render(path.join(parentDir, 'Teste/login.ejs'));
})



module.exports = router;


