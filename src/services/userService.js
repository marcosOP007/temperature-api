const User = require('../models/User');

async function getAllUsers(){
    return await User.findAll();
}

async function createUser(userData){
    return await User.create(userData);
}

async function getUserById(userId){
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found.');
    return user;
}

async function getUserByEmail(email){
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found.');
    return user;
}

async function updateUser(userId, userData){
    const [updated] = await User.update(userData, { where: { id: userId } });
    if (!updated) throw new Error('User not found.');
    return { message: 'User updated'};
}

async function deleteUser(userId){
    const deleted = await User.destroy({ where: { id: userId } });
    if (!deleted) throw new Error('User not found.');
    return { message: 'User deleted'};
}


async function getAllChannelsByUser(userId) {
    const user = await User.findByPk(userId, {
        include: { model: Channel,  as: 'Channels' },
    });

    if (!user) throw new Error('User not found.');
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

    if (!user || !channel) throw new Error('User or channel not found.');

    user.removeChannel(channel);
}

async function addChannelToUser(userId, channelId) {
        const user = await User.findByPk(userId);
        const channel = await Channel.findByPk(channelId);

        if (!user || !channel) throw new Error('User or channel not found.');     

        await user.addChannel(channel);
}



module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
    getAllChannelsByUser,
    getAllModerator,
    deletChannelByuser,
    addChannelToUser,
};
