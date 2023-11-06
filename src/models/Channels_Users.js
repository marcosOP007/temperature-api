const { DataTypes, Model } = require('sequelize');

class Channel_Users extends Model {
    static init(sequelize) {
        super.init({ }, {
            sequelize,
            modelName: 'Channels_Users',
            tableName: 'Channels_Users',
        })
    }
}

module.exports = User;

