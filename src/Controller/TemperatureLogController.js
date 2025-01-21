const temperatureLogService = require('../services/temperatureLogService');

// Get all temperature logs
async function getAllTemperatureLogs(req, res) {
    try {
        const temperatureLogs = await temperatureLogService.getAllTemperatureLogs();
        return res.status(200).json(temperatureLogs);
    } catch (error) {
        console.error('Error fetching temperature logs:', error);
        return res.status(500).json({ error: 'Failed to fetch temperature logs.' });
    }
}

// Get a temperature log by ID
async function getTemperatureLogById(req, res) {
    try {
        const { id } = req.params; // Extract log ID from request parameters
        const temperatureLog = await temperatureLogService.getTemperatureLogById(id);
        return res.status(200).json(temperatureLog);
    } catch (error) {
        console.error('Error fetching temperature log by ID:', error);
        if (error.message === 'Temperature log not found.') {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Failed to fetch temperature log.' });
    }
}

// Create a new temperature log
async function createTemperatureLog(req, res) {
    try {
        const logData = req.body; // Extract log data from request body
        const newTemperatureLog = await temperatureLogService.createTemperatureLog(logData);
        return res.status(201).json(newTemperatureLog);
    } catch (error) {
        console.error('Error creating temperature log:', error);
        return res.status(500).json({ error: 'Failed to create temperature log.' });
    }
}

// Delete all temperature logs by sensor ID
async function deleteAllTemperatureLogsBySensor(req, res) {
    try {
        const { sensorId } = req.params; // Extract sensor ID from request parameters
        const deletedCount = await temperatureLogService.deleteAllTemperatureLogsBySensor(sensorId);
        return res.status(200).json({
            message: `${deletedCount} temperature logs deleted for sensor ${sensorId}.`,
        });
    } catch (error) {
        console.error('Error deleting temperature logs for sensor:', error);
        return res.status(500).json({ error: 'Failed to delete temperature logs.' });
    }
}

module.exports = {
    getAllTemperatureLogs,
    getTemperatureLogById,
    createTemperatureLog,
    deleteAllTemperatureLogsBySensor,
};
