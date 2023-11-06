const  TemperatureLog = require('../models/TemperatureLogs'); 


// Função para listar todos os logs de temperatura
async function getAllTemperatureLogs() {
    try {
        const temperatureLogs = await TemperatureLog.findAll();
        return temperatureLogs;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar logs de temperatura.');
    }
}

// Função para criar um novo log de temperatura
async function createTemperatureLog(logData) {
    try {
        const newTemperatureLog = await TemperatureLog.create(logData);
        return newTemperatureLog;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao criar log de temperatura.');
    }
}

// Função para obter detalhes de um log de temperatura pelo ID
async function getTemperatureLogById(logId) {
    try {
        const temperatureLog = await TemperatureLog.findByPk(logId);
        if (temperatureLog) {
            return temperatureLog;
        } else {
            throw new Error('Log de temperatura não encontrado.');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar log de temperatura.');
    }
}

// Função para deletar todos os logs de temperatura associados a um sensor
async function deleteAllTemperatureLogsBySensor(sensorId) {
    try {
        const deletedCount = await TemperatureLog.destroy({
            where: { sensor_id: sensorId },
        });
        return deletedCount;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao deletar logs de temperatura do sensor.');
    }
}




module.exports = {
    getAllTemperatureLogs,
    createTemperatureLog,
    getTemperatureLogById,
    deleteAllTemperatureLogsBySensor,
};