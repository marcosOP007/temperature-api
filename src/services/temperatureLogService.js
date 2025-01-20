const TemperatureLog = require("../conrtrollers/TemperatureLogController");

async function getAllTemperatureLogs() {
    return await TemperatureLog.getAllTemperatureLogs();
}

async function createTemperatureLog(logData) {
    return await TemperatureLog.createTemperatureLog(logData);
}

async function getTemperatureLogById(logId) {
    log = await TemperatureLog.getTemperatureLogById(logId);
    if (!log) throw new Error('Log not found.');
    return log;
}


module.exports = {
    getAllTemperatureLogs,
    createTemperatureLog,
    getTemperatureLogById
};