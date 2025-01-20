const express = require('express');
const sensorController = require('../Controller/SensorController');

const router = express.Router();

router.get('/', sensorController.getAllSensors); // Route to list all sensors
router.get('/:id', sensorController.getSensorById); // Route to get a sensor by ID
router.post('/', sensorController.createSensor); // Route to create a new sensor
router.put('/:id', sensorController.updateSensor); // Route to update a sensor by ID
router.delete('/:id', sensorController.deleteSensor); // Route to delete a sensor by ID
router.get('/:id/logs', sensorController.getAllTemperatureLogs); // Route to list temperature logs of a sensor

module.exports = router;
