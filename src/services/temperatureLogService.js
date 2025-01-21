const TemperatureLog = require('../models/TemperatureLogs');

// Fetch all temperature logs
async function getAllTemperatureLogs() {
    return await TemperatureLog.findAll();
}

// Fetch a temperature log by ID
async function getTemperatureLogById(logId) {
    const temperatureLog = await TemperatureLog.findByPk(logId);
    if (!temperatureLog) {
        throw new Error('Temperature log not found.');
    }
    return temperatureLog;
}

// Create a new temperature log
async function createTemperatureLog(logData) {
    return await TemperatureLog.create(logData);
}

// Delete all temperature logs by sensor ID
async function deleteAllTemperatureLogsBySensor(sensorId) {
    return await TemperatureLog.destroy({
        where: { sensor_id: sensorId },
    });
}

module.exports = {
    getAllTemperatureLogs,
    getTemperatureLogById,
    createTemperatureLog,
    deleteAllTemperatureLogsBySensor,
};
