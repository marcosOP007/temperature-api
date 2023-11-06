const Channel = require('../models/Channel');
const Sensor = require('../models/Sensor');

// Função para obter todos os canais
async function getAllChannels() {
    try {
        const channels = await Channel.findAll();
        return channels;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar canais.');
    }
}

// Função para criar um novo canal
async function createChannel(channelData) {
    try {
        console.log("shiiiii - ", channelData.creator_id)
        const newChannel = await Channel.create(channelData);

        return newChannel;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao criar canal.');
    }
}

// Função para obter detalhes de um canal pelo ID
async function getChannelById(channelId) {
    try {
        const channel = await Channel.findByPk(channelId,  {
            include: { model: Sensor, as: 'Sensores' },
        });
        if (channel) {
            return channel;
        } else {
            throw new Error('Canal não encontrado.');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar canal.');
    }
}

async function getChannelByToken(channelToken) {
    try {
        //const user = await User.findOne({where: {email: email1}});
        const channel = await Channel.findOne({where: {token_read: channelToken}});
       
        return channel;
        
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar canal.');
    }
}

async function getChannelTokenWrite(channelToken){
    try {
        //const user = await User.findOne({where: {email: email1}});
        const channel = await Channel.findOne({where: {token_write: channelToken}, include: { model: Sensor, as: 'Sensores' }},);
    
        return channel;
        
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao buscar canal.');
    }
}

// Função para atualizar um canal pelo ID
async function updateChannel(channelId, channelData) {
    try {
        const [updated] = await Channel.update(channelData, {
            where: { id: channelId },
        });

        if (updated) {
            return { message: 'Canal atualizado com sucesso.' };
        } else {
            throw new Error('Canal não encontrado.');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao atualizar canal.');
    }
}

// Função para excluir um canal pelo ID
async function deleteChannel(channelId) {
    try {
        const deleted = await Channel.destroy({
            where: { id: channelId },
        });

        if (deleted) {
            return { message: 'Canal excluído com sucesso.' };
        } else {
            throw new Error('Canal não encontrado.');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao excluir canal.');
    }
}

// Função para excluir um canal pelo ID (ADM)
async function deleteChannelADM(channelId) {
    try {
        const deleted = await Channel.destroy({
            where: { id: channelId },
        });

        if (deleted) {
            return;
        } else {
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }
}

// Função para adicionar sensor a um canal
async function addSensorToChannel(channelId, sensorId) {
    try {
        const channel = await Channel.findByPk(channelId);
        const sensor = await Sensor.findByPk(sensorId);

        if (!channel || !sensor) {
            throw new Error('Canal ou sensor não encontrado.');
        }

        await channel.addSensor(sensor);
        return { message: 'Sensor adicionado ao canal com sucesso.' };
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao adicionar sensor ao canal.');
    }
}

// Função para obter todos os sensores de um canal
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
    deleteChannelADM,
    addSensorToChannel,
    getAllSensors,
};
