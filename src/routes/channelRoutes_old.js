const {Router} = require('express');
const path = require('path');
const UserController = require('../Controller/UserController')
const TemperatureLogController = require('../Controller/TemperatureLogController')
const ChannelController = require('../Controller/ChannelController')
const SensorController = require('../Controller/SensorController');
const User = require('../models/User');
const middleAuth = require('../MiddleWares/AuthMiddle');
const Channel = require('../models/Channel'); 
const  Sensor  = require('../models/Sensor');
const permissionCheck = require('../MiddleWares/permissionCheck');
const { body } = require('express-validator');
const { channel } = require('diagnostics_channel');

const router = Router();

// Rota para listar todos os canais
router.get('/', async (req, res) => {
    try {
        const channels = await ChannelController.getAllChannels();
        res.status(200).json(channels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar canais.' });
    }
});


// Rota para pegar um channel todos os canais
router.get('/:id', async (req, res) => {
    try {
        channelId = req.params.id
        const channels = await ChannelController.getChannelById(channelId);

    
        res.status(200).json(channels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar canais.' });
    }
});



// Rota para criar um novo canal
router.post('/', permissionCheck.permissionCheck("MODERATOR") ,async (req, res) => {
    const data = req.body;


    if(data.id === undefined) {
        throw Error("Id not define")
    }


    try {
        const channel = await ChannelController.createChannel(data);


        res.status(201).json(channel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar canal.' });
    }
});

// Rota para editar um canal pelo ID
router.put('/:id', async (req, res) => {
    const channelId = req.params.id;
    const { name, description } = req.body;

    try {
        const channel = await Channel.findByPk(channelId);

        if (!channel) {
            return res.status(404).json({ error: 'Canal não encontrado.' });
        }

        // Atualize os campos necessários
        if (name) {
            channel.name = name;
        }

        if (description) {
            channel.description = description;
        }

        await channel.save();

        res.status(200).json(channel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao editar canal.' });
    }
});

// Rota para excluir um canal pelo ID
router.delete('/:id', async (req, res) => {
    const channelId = req.params.id;

    try {

        ChannelController.deleteChannel(channelId)

        

        if (!channel) {
            return res.status(500).json({ error: 'Erro servidor, tente mais tarde novamente!.' });
        }

       

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir .' });
    }
});


router.post('/:channelId/add-sensor/:sensorId', async(req,res) => {
    const channelId = req.params.channelId;
    const sensorId = req.params.sensorId;


    
    try {
        const channel = await Channel.findByPk(channelId);
        const sensor = await Sensor.findByPk(sensorId);
  
        if (!channel || !sensor) {
            res.status(404).json({ error: 'Canal ou sensor não encontrado.' });
            return;
        }
  
        await channel.addSensores(sensor);
        res.json({ message: 'Sensor adicionado ao canal com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao adicionar sensor ao canal.' });
    }
});
  

//router.get('/channels/sensors/:channelId', ChannelController.getAllSensorsRouter);


router.get('/sensors/:channelId' , async(req,res) => {
    try{
        const channelId = req.params.channelId
        const data = ChannelController.getAllSensors(channelId)
        

        res.status(200).send(data);
       
  
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao encontrar canais do usuário.' });
      
  }
});


//rota adiconar channel
router.post('/token/:userId', async (req, res) => {
    
    const channelToken = req.body.inputToken
    const userId = req.params.userId
    try {

        const channel = await ChannelController.getChannelByToken(channelToken);
        await UserController.addChannelToUser(userId, channel.id)
       
        res.redirect(`/index/pag/${userId}`)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir .' });
    }
});


//Rota para deletar para adm

router.get('/delet/:id/:adm', async (req, res) => {
    const channelId = req.params.id;
    const admId = req.params.adm;

    try {

        const channel = await ChannelController.deleteChannel(channelId)

        

        if (!channel) {
            return res.status(500).json({ error: 'Erro servidor, tente mais tarde novamente!.' });
        }

       

        res.redirect(`/index/adm/${admId}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir .' });
    }
});


/*
router.get('/admin/moderator-channels/', middleAuth, permissionCheck.permissionCheck('ADMIN'), async (req, res) => {
    console.log(body.query)
    try {
        const moderators = await UserController.getallmoderator();
        res.json(moderators);
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar moderadores' });
      }
});

*/



router.get('/moderators-for-admins', middleAuth, permissionCheck.permissionCheck('ADMIN'), async (req, res) => {
    try {
        const moderators = await UserController.getallmoderator();
        res.json(moderators);
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar moderadores' });
      }
});


module.exports = router;
