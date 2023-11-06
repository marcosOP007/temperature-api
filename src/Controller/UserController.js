const User = require('../models/User');
const Channel = require('../models/Channel')

// Função para pegar todos usuário
async function getAllUsers() {
    return await User.findAll();
}

// Função para criar um novo usuário
async function createUser(userData) {
    return await User.create(userData);
}

// Função para obter detalhes de um usuário pelo ID
async function getUserByEmail(email1) {
    return await User.findOne({where: {email: email1}});
}

// Função para obter detalhes de um usuário pelo ID
async function getUserById(userId) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('Usuário não encontrado.');
    return user;
}

// Função para atualizar um usuário pelo ID
async function updateUser(userId, userData) {
    const [updated] = await User.update(userData, {
        where: { id: userId },
    });

    if (!updated) throw new Error('Usuário não encontrado.');
    return 'Usuário atualizado com sucesso.';
}

// Função para excluir um usuário pelo ID
async function deleteUser(userId) {
    const deleted = await User.destroy({
        where: { id: userId },
    });

    if (!deleted) throw new Error('Usuário não encontrado.');
    return 'Usuário excluído com sucesso.';
}

// Função para obter todos os canais associados a um usuário
async function getAllChannelsByUser(userId) {
    const user = await User.findByPk(userId, {
        include: { model: Channel,  as: 'Channels' },
    });

    if (!user) throw new Error('Usuário não encontrado.');
    return user.Channels;
}

async function getAllModerator(){
    return await User.findAll( {
        where: {permission_type: 'MODERATOR'},
    });
}

async function deletChannelByuser(userId, channelId) {
    const user = await User.findByPk(userId);
    const channel = await Channel.findByPk(channelId);

    if (!user || !channel) throw new Error('Usuário/Channel não encontrado.');

    user.removeChannel(channel)
    
    return {msg: 'sucess'};
}




async function addChannelToUser(userId, channelId) {
        const user = await User.findByPk(userId);
        const channel = await Channel.findByPk(channelId);

        if (!user || !channel) throw new Error('Usuário ou canal não encontrado.');     

        await user.addChannel(channel);
}

module.exports = {
    getUserByEmail,
    getAllChannelsByUser,
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    deletChannelByuser,
    getAllModerator,
  };
  


module.exports = {

    getUserByEmail,

  
  addChannelToUser,

  getAllChannelsByUser,
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  deletChannelByuser,
  getAllModerator,
};