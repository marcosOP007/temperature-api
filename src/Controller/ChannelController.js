const channelService = require('../services/channelService');

async function getAllChannels(req, res) {
    try {
        const channels = await channelService.getAllChannels();
        res.status(200).json(channels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred on the server' });
        }
    }

async function createChannel(req, res) {
    try {
        const channel = await channelService.createChannel(req.body);
        res.status(201).json(channel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred on the server' });
    }
}

async function getChannelById(req, res) {
    try {
        const channel = await channelService.getChannelById(req.params.id);
        res.status(200).json(channel);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'An error occurred on the server' });
    }
}

async function updateChannel(req, res) {
    try {
        const result = await channelService.updateChannel(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'An error occurred on the server' });
    }
}

async function getChannelByToken(channelToken) {
    try {
        const channel = await Channel.findOne({where: {token_read: channelToken}});
        return channel;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred on the server');
    }
}

async function getChannelTokenWrite(channelToken){
    try {
        const channel = await Channel.findOne({where: {token_write: channelToken}, include: { model: Sensor, as: 'Sensores' }});
        return channel;
    } catch (error) {
        console.error(error);
    throw new Error('An error occurred on the server');
    }
}

async function deleteChannel(req, res) {
    try {
        const result = await channelService.deleteChannel(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'An error occurred on the server' });
    }
}

module.exports = {
    getAllChannels,
    createChannel,
    getChannelById,
    updateChannel,
    getChannelByToken,
    getChannelTokenWrite,
    deleteChannel,
    };

