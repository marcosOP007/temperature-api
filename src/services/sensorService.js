const Sensor = require('../Controller/SensorController');

async function getAllSensors() {
    return await Sensor.getAllSensors();
}

async function createSensor(sensorData) {
    return await Sensor.createSensor(sensorData);
}

async function getSensorById(sensorId) {
    sensor = await Sensor.getSensorById(sensorId);
    if (!sensor) throw new Error('Sensor not found.');
    return sensor;
}

async function updateSensor(sensorId, sensorData) {
    const updated = await Sensor.updateSensor(sensorId, sensorData);
    if (!updated) throw new Error('Sensor not found.');
    return updated;
}

async function getAllTemperatureLogs(sensorId) {
    const sensor = await Sensor.findByPk(sensorId, {
        include: {
            model: TemperatureLog,
            as: 'TemperatureLogs',
            //limit: 50
        }
    });
        
    if (!updated) throw new Error('Sensor not found.');
         
    return sensor.TemperatureLogs;
}
module.exports = {
    getAllSensors,
    createSensor,
    getSensorById,
    updateSensor,
    getAllTemperatureLogs
};