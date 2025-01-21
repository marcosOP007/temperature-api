const express = require('express');
const temperatureLogController = require('../Controller/TemperatureLogController');

const router = express.Router();

// Route to get all temperature logs
router.get('/', temperatureLogController.getAllTemperatureLogs);

// Route to get a temperature log by ID
router.get('/:id', temperatureLogController.getTemperatureLogById);

// Route to create a new temperature log
router.post('/', temperatureLogController.createTemperatureLog);

// Route to delete all temperature logs by sensor ID
router.delete('/sensor/:sensorId', temperatureLogController.deleteAllTemperatureLogsBySensor);

module.exports = router;
