const Channel = require('../models/Channel');
const Sensor = require('../models/Sensor');

// Função para obter todos os canais
async function getAllChannels() {
    return await Channel.findAll();
}

// Função para criar um novo canal
async function createChannel(channelData) {
    return await Channel.create(channelData);
}

// Função para obter detalhes de um canal pelo ID
async function getChannelById(channelId) {
    const channel = await Channel.findByPk(channelId,  {
        include: { model: Sensor, as: 'Sensores' },
    });

    if (!channel) throw new Error('Canal não encontrado.');
    return channel;
}

async function getAllChannelByModerator(moderatorId) {
    try {
        const channel = await Channel.findAll({
            where: { creator_id: moderatorId }
        });

        console.log('Channels for moderatorId:', moderatorId, channel);

        if (!channel) {
            throw new Error('Canal não encontrado.');
        }

        return channel;
    } catch (error) {
        console.error('Error in getAllChannelByModerator:', error);
        throw error;
    }
}

async function getChannelByToken(channelToken) {
    return await Channel.findOne({where: {token_read: channelToken}});
}

async function getChannelTokenWrite(channelToken){
    return await Channel.findOne({where: {token_write: channelToken}, include: { model: Sensor, as: 'Sensores' }});
}

// Função para atualizar um canal pelo ID
async function updateChannel(channelId, channelData) {
    const [updated] = await Channel.update(channelData, {
        where: { id: channelId },
    });

    if (!updated) throw new Error('Canal não encontrado.');
    return { message: 'Canal atualizado com sucesso.' };
}

// Função para excluir um canal pelo ID
async function deleteChannel(channelId) {
    const deleted = await Channel.destroy({
        where: { id: channelId },
    });

    if (!deleted) throw new Error('Canal não encontrado.');
    return deleted;
}



// Função para adicionar sensor a um canal
async function addSensorToChannel(channelId, sensorId) {
    const channel = await Channel.findByPk(channelId);
    const sensor = await Sensor.findByPk(sensorId);

    if (!channel || !sensor) throw new Error('Canal ou sensor não encontrado.');

    await channel.addSensor(sensor);
    return { message: 'Sensor adicionado ao canal com sucesso.' };
}


async function getAllSensors(channelId) {
    
    try {
        const user = await Channel.findByPk(channelId, {
            include: { model: Sensor, as: 'Sensores' },
        });

        if (user) {
            return user.Sensores;
        } else {
            return;
        }
    } catch (error) {
        return;
    }
}



module.exports = {
    getChannelByToken,
    getChannelTokenWrite,
    getAllChannels,
    createChannel,
    getChannelById,
    updateChannel,
    deleteChannel,
    addSensorToChannel,
    getAllChannelByModerator,
    getAllSensors,
};
