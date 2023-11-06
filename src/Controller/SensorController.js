const Sensor = require('../models/Sensor');
const TemperatureLog = require('../models/TemperatureLogs')

// Função para listar todos os sensores
async function getAllSensors() {
    try {
        const sensors = await Sensor.findAll();
        return sensors;
    } catch (error) {
        throw error;
    }
}

// Função para pegar um sensor pelo ID
async function getSensorById(sensorId) {
    try {
        const sensor = await Sensor.findByPk(sensorId);
        if (!sensor) {
            throw new Error('Sensor não encontrado');
        }
        return sensor;
    } catch (error) {
        throw error;
    }
}

// Função para criar um novo sensor
async function createSensor(sensorData) {
    try {
        const newSensor = await Sensor.create(sensorData);
        return newSensor;
    } catch (error) {
        throw error;
    }
}

// Função para atualizar um sensor pelo ID
async function updateSensor(sensorId, sensorData) {
    try {
        const sensor = await Sensor.findByPk(sensorId);
        if (!sensor) {
            throw new Error('Sensor não encontrado');
        }
        await sensor.update(sensorData);
        await sensor.save();
       
        return sensor;
    } catch (error) {
        throw error;
    }
}

// Função para excluir um sensor pelo ID
async function deleteSensor(sensorId) {
    try {
        const sensor = await Sensor.findByPk(sensorId);
        if (!sensor) {
            throw new Error('Sensor não encontrado');
        }
        await sensor.destroy();
    } catch (error) {
        throw error;
    }
}

async function getAllTemperatureLogs(sensorId) {
   
    try {
        const sensor = await Sensor.findByPk(sensorId, {
            include: {
                model: TemperatureLog,
                as: 'TemperatureLogs',
                limit: 50
            }
        });
        
        if (!sensor) {
            console.log("sensor n encontrado")
            return res.status(404).json({ error: 'Sensor não encontrado' });
        }
         
      
        return sensor.TemperatureLogs;
    } catch (error) {
        console.error(error);
        return;
    }
}

module.exports = {
    getAllSensors,
    getSensorById,
    createSensor,
    updateSensor,
    getAllTemperatureLogs,
    deleteSensor,
};