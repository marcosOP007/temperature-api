const sensorService = require('../services/sensorService');

// Get all sensors
async function getAllSensors(req, res) {
    try {
        const sensors = await sensorService.getAllSensors();
        return res.status(200).json(sensors);
    } catch (error) {
        console.error('Error fetching sensors:', error);
        return res.status(500).json({ error: 'Failed to fetch sensors.' });
    }
}

// Get a sensor by ID
async function getSensorById(req, res) {
    try {
        const { id } = req.params; // Extract sensor ID from request parameters
        const sensor = await sensorService.getSensorById(id);
        return res.status(200).json(sensor);
    } catch (error) {
        console.error('Error fetching sensor by ID:', error);
        if (error.message === 'Sensor not found') {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Failed to fetch sensor.' });
    }
}

// Create a new sensor
async function createSensor(req, res) {
    try {
        const sensorData = req.body; // Extract sensor data from request body
        const newSensor = await sensorService.createSensor(sensorData);
        return res.status(201).json(newSensor);
    } catch (error) {
        console.error('Error creating sensor:', error);
        return res.status(500).json({ error: 'Failed to create sensor.' });
    }
}

// Update a sensor by ID
async function updateSensor(req, res) {
    try {
        const { id } = req.params; // Extract sensor ID from request parameters
        const sensorData = req.body; // Extract updated sensor data from request body
        const updatedSensor = await sensorService.updateSensor(id, sensorData);
        return res.status(200).json(updatedSensor);
    } catch (error) {
        console.error('Error updating sensor:', error);
        if (error.message === 'Sensor not found') {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Failed to update sensor.' });
    }
}

// Delete a sensor by ID
async function deleteSensor(req, res) {
    try {
        const { id } = req.params; // Extract sensor ID from request parameters
        await sensorService.deleteSensor(id);
        return res.status(204).send(); // No content response
    } catch (error) {
        console.error('Error deleting sensor:', error);
        if (error.message === 'Sensor not found') {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Failed to delete sensor.' });
    }
}

// Get all temperature logs of a sensor
async function getAllTemperatureLogs(req, res) {
    try {
        const { id } = req.params; // Extract sensor ID from request parameters
        const logs = await sensorService.getAllTemperatureLogs(id);
        return res.status(200).json(logs);
    } catch (error) {
        console.error('Error fetching temperature logs:', error);
        if (error.message === 'Sensor not found') {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Failed to fetch temperature logs.' });
    }
}

module.exports = {
    getAllSensors,
    getSensorById,
    createSensor,
    updateSensor,
    deleteSensor,
    getAllTemperatureLogs,
};
