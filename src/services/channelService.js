const Channel = require('../models/Channel');
const Sensor = require('../models/Sensor');

async function getAllChannels() {
    return await Channel.findAll();
}

async function createChannel(channelData) {
    return await Channel.create(channelData);
}

async function getChannelById(channelId) {
    const channel = await Channel.findByPk(channelId, {
        include: { model: Sensor, as: 'Sensors' },
    });
    if (!channel) throw new Error('Channel not found.');
    return channel;
}

async function getChannelByToken(channelToken) {
    return await Channel.findOne({ where: { token_read: channelToken } });
}

async function getChannelTokenWrite(channelToken) {
    return await Channel.findOne({
        where: { token_write: channelToken },
        include: { model: Sensor, as: 'Sensors' },
    });
}

async function updateChannel(channelId, channelData) {
    const [updated] = await Channel.update(channelData, { where: { id: channelId } });
    if (!updated) throw new Error('Channel not found.');
    return { message: 'Channel updated successfully.' };
}

async function deleteChannel(channelId) {
    const deleted = await Channel.destroy({ where: { id: channelId } });
    if (!deleted) throw new Error('Channel not found.');
    return { message: 'Channel deleted successfully.' };
}

async function getAllChannelsByModerator(moderatorId) {
    return await Channel.findAll({ where: { creator_id: moderatorId } });
}

async function addSensorToChannel(channelId, sensorId) {
    const channel = await Channel.findByPk(channelId);
    const sensor = await Sensor.findByPk(sensorId);

    if (!channel || !sensor) {
        throw new Error('Channel or sensor not found.');
    }

    await channel.addSensor(sensor);
    return { message: 'Sensor added to channel successfully.' };
}

module.exports = {
    getAllChannels,
    createChannel,
    getChannelById,
    getChannelByToken,
    getChannelTokenWrite,
    updateChannel,
    deleteChannel,
    getAllChannelsByModerator,
    addSensorToChannel,
};
