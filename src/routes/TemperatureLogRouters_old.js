const {Router} = require('express');
const path = require('path');
const UserController = require('../Controller/UserController')
const TemperatureLogController = require('../Controller/TemperatureLogController')
const ChannelController = require('../Controller/ChannelController')
const SensorController = require('../Controller/SensorController')
const midleAuth = require('../MiddleWares/AuthMiddle')
const router = Router();
const AuthorizationMiddle = require('../MiddleWares/AuthorizationMiddle');




// Rota para listar todos os logs de temperatura
router.get('/temperature-logs', async (req, res) => {
    try {
        const temperatureLogs = await TemperatureLogController.getAllTemperatureLogs();
        res.json(temperatureLogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar logs de temperatura.' });
    }
});

// Rota para criar um novo log de temperatura
router.post('/temperature-logs', async (req, res) => {
    const logData = req.body;

    try {
        const newTemperatureLog = await TemperatureLogController.createTemperatureLog(logData);
        res.status(201).json(newTemperatureLog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar log de temperatura.' });
    }
});

//router for esp
router.post ('/temp/:token', async (req,res) => {
    const channelToken = req.params.token
    try{
        const channel = await (ChannelController.getChannelTokenWrite(channelToken))
        
        if(channel){
                for(i = 1; i<= channel.Sensores.length; i++){
                    if(!req.query[`field${i}`]){
                        return res.json({msg: 'dado invalido'})
                    }
                }
                for(i = 1; i<= channel.Sensores.length; i++){
                    console.log("add data temperature")
                     TemperatureLogController.createTemperatureLog({temperature: req.query[`field${i}`], sensor_id: channel.Sensores[i-1].id})
                }


                return res.json({msg: 'suss'})
                

        }else{
            console.log("erro")
            res.json({err:'true', msg: 'token não existe'})
        }

    }catch{

    }
})



// Rota para obter detalhes de um log de temperatura pelo ID
router.get('/temperature-logs/:id', async (req, res) => {
    const logId = req.params.id;

    try {
        const temperatureLog = await TemperatureLogController.getTemperatureLogById(logId);
        res.json(temperatureLog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar log de temperatura.' });
    }
});

// Rota para deletar todos os logs de temperatura associados a um sensor
router.delete('/temperature-logs/sensor/:sensorId', async (req, res) => {
    const sensorId = req.query.sensorId;

    try {
        const deletedCount = await TemperatureLogController.deleteAllTemperatureLogsBySensor(sensorId);
        res.status(204).send(); // Responda com status 204 para indicar sucesso
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar logs de temperatura do sensor.' });
    }
});


  
module.exports = router;

