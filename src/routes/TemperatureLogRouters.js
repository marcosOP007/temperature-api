const {Router} = require('express');
const { body, validationResult } = require('express-validator');
const UserController = require('../Controller/UserController')
const TemperatureLogController = require('../Controller/TemperatureLogController')
const ChannelController = require('../Controller/ChannelController')
const SensorController = require('../Controller/SensorController')
const midleAuth = require('../MiddleWares/AuthMiddle')
const router = Router();
const AuthorizationMiddle = require('../MiddleWares/AuthorizationMiddle');
const { count } = require('../models/User');

// Função de manipulação de erros
const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
};

// Função de validação
const validateTemperatureLog = [
    body('sensor_id').isInt().withMessage('O ID do sensor deve ser um número inteiro.'),
    body('temperature').isFloat().withMessage('A temperatura deve ser um número real.')
];

// Rota para listar todos os logs de temperatura
router.get('/temperature-logs', async (req, res) => {
    try {
        const temperatureLogs = await TemperatureLogController.getAllTemperatureLogs();
        res.json(temperatureLogs);
    } catch (error) {
        handleError(res, error);
    }
});

// Rota para criar um novo log de temperatura
router.post('/temperature-logs', async (req, res) => {
    // Verificar erros de validação
    
    if(!req.query.token){
        res.status(501).send("resquisição inválida")
    }
    channel =  await ChannelController.getChannelTokenWrite(req.query.token)
    
    if(!channel) return  res.status(501).send("canal não existe")


    try {
        counter = 1;
        const sensorSize = Object.keys(channel.Sensores).length
        for(var key in req.query){

            if(counter > sensorSize) break;

            if(key === 'campo'+counter){
                console.log("sensor " + counter + " identificado")
                await TemperatureLogController.createTemperatureLog({sensor_id: channel.Sensores[counter-1].id, temperature: req.query[key]});
                counter++;
            }
        }
        if( counter <= sensorSize){
            for(var i = sensorSize-counter; i < sensorSize; i++){
                await TemperatureLogController.createTemperatureLog({sensor_id: channel.Sensores[i].id, temperature: -273});
            }        
        }

        res.status(200).send("sucess")
       // const newTemperatureLog = await TemperatureLogController.createTemperatureLog(req.body);
        //res.status(201).json(newTemperatureLog);
    } catch (error) {
        handleError(res, error);
    }
});

// Rota para obter detalhes de um log de temperatura pelo ID
router.get('/temperature-logs/:id', async (req, res) => {
    const logId = req.params.id;

    try {
        const temperatureLog = await TemperatureLogController.getTemperatureLogById(logId);
        res.json(temperatureLog);
    } catch (error) {
        handleError(res, error);
    }
});

// Rota para deletar todos os logs de temperatura associados a um sensor
router.delete('/temperature-logs/sensor/:sensorId', async (req, res) => {
    const sensorId = req.query.sensorId;

    try {
        const deletedCount = await TemperatureLogController.deleteAllTemperatureLogsBySensor(sensorId);
        res.status(204).send(); // Responda com status 204 para indicar sucesso
    } catch (error) {
        handleError(res, error);
    }
});

module.exports = router;
