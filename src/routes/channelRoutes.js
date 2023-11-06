const {Router} = require('express');
const ChannelController = require('../Controller/ChannelController')
const UserController = require('../Controller/UserController')
const permissionCheck = require('../MiddleWares/permissionCheck');
const RandomToken = require('../Utils/Random')
const Channel = require('../models/Channel'); 
const Sensor  = require('../models/Sensor');

const router = Router();

// Rota para listar todos os canais
router.get('/',permissionCheck.verifyUserPermission("ADMIN"), async (req, res) => {
    try {
        const channels = await ChannelController.getAllChannels();
        res.status(200).json(channels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar canais.' });
    }
});

// Rota para criar um novo canal
router.post('/',permissionCheck.verifyUserPermission('MODERATOR'), async (req, res) => {    
    try {
        const channelData = req.body;
        const channel = await ChannelController.createChannel({name: req.body.name,description: req.body.description,creator_id: req.user_id, token_read: RandomToken(16), token_write: RandomToken(16)});
        res.status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar canal.' });
    }
});


// Rota para excluir um canal pelo ID (USER)
router.delete('/u/:id',permissionCheck.verifyUserPermission("ADMIN","MODERATOR"), async (req, res) => {
    try {
        const channelId = req.params.id;
        await ChannelController.deleteChannel(channelId)
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir canal.' });
    }
});



// Rota para pegar um canal pelo ID
router.get('/:id', async (req, res) => {
    try {
        const channelId = req.params.id
        const channel = await ChannelController.getChannelById(channelId);
        res.status(200).json(channel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar canal.' });
    }
});



// Rota para editar um canal pelo ID
router.put('/:id',permissionCheck.verifyUserPermission("ADMIN","MODERATOR"), async (req, res) => {

    try {
        const channelId = req.params.id;
        const updatedData = req.body;
        const channel = await ChannelController.updateChannel(channelId, updatedData);
        res.status(200).json(channel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao editar canal.' });
    }
});



// Rota para excluir um canal pelo ID
router.delete('/:id',permissionCheck.verifyUserPermission("ADMIN","MODERATOR"), async (req, res) => {
    try {
        const channelId = req.params.id;
        await ChannelController.deleteChannel(channelId)
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir canal.' });
    }
});

// Rota para adicionar um sensor a um canal
router.post('/add-sensor-to-channel', async(req,res) => {
    try {
        const channelId = req.query.c;
        const sensorId = req.query.s;

        if(!channelId || !sensorId) throw Error("Parametros invalidos!!")
        
        await ChannelController.addSensorToChannel(channelId, sensorId);
        
        res.json({ message: 'Sensor adicionado ao canal com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao adicionar sensor ao canal.' });
    }
});

// Rota para listar todos os sensores de um canal
router.get('/get-sensors-for-channel/:channelId', async(req,res) => {
    try{
        const channelId = req.params.channelId
        const sensors = await ChannelController.getAllSensors(channelId)
        res.status(200).json(sensors);
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao encontrar sensores do canal.' });
  }
});

// Rota para adicionar um canal a um usuário
router.post('/u/:userId/channels', async (req, res) => {
    try {
        const channelToken = req.body.inputToken
        const userId = req.params.userId
        const channel = await ChannelController.getChannelByToken(channelToken);
        
        if(!channel){
            return res.status(501).send("canal não existe")
        }
        await UserController.addChannelToUser(userId, channel.id)
        return res.redirect(`/index/${userId}`)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao adicionar canal ao usuário.' });
    }
});


module.exports = router;


