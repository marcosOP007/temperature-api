const express = require('express');
const SensorController = require('../Controller/SensorController');
const ChannelController = require('../Controller/ChannelController'); // Importe o controlador do canal se necessário
const Sensor = require('../models/Sensor');

const router = express.Router();


// Rota para listar todos os sensores
router.get('/', async (req, res) => {
    try {
        const sensors = await SensorController.getAllSensors();
        res.status(200).json(sensors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar sensores.' });
    }
});

// Rota para pegar um sensor por ID
router.get('/:id', async (req, res) => {
    try {
        const sensorId = req.params.id;
        const sensor = await SensorController.getSensorById(sensorId);
        res.status(200).json(sensor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar sensor.' });
    }
});

// Rota para criar um novo sensor
router.post('/', async (req, res) => {
    const sensorData = req.body;

    try {
        const newSensor = await SensorController.createSensor(sensorData);
        res.status(201).json(newSensor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar sensor.' });
    }
});

// Rota para editar um sensor por ID
router.get('/edit/:id', async (req, res) => {
    
    const sensorId = req.params.id;
    let sensorData = req.query;
    
    try {
        if(sensorData.status){
            sensorData.status = "ACTIVE"
        }else{
            sensorData.status = "INACTIVE"
        }
        
        const updatedSensor = await SensorController.updateSensor(sensorId, sensorData);
        res.redirect(`/index/admEditarSensor/${sensorId}`)
        //res.status(200).json(updatedSensor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao editar sensor.' });
    }
});

// Rota para excluir um sensor por ID
router.delete('/:id', async (req, res) => {
    const sensorId = req.params.id;

    try {
        await SensorController.deleteSensor(sensorId);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir sensor.' });
    }
});
//router.get('/sensors/:id/temperature-logs', SensorController.getAllTemperatureLogsBySensor)

router.get('/:id/temperature-logs', async (req, res) => {
    const sensorId = req.params.id;
    
    try {
       
        const data= await SensorController.getAllTemperatureLogs(sensorId);
        
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir sensor.' });
    }
});





module.exports = router;
