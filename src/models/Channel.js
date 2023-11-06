const { Model, DataTypes } = require('sequelize');


class Channel extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            token_read: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            token_write: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },

            description: {
                type: DataTypes.STRING(255),
            },
            status: {
                type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
                defaultValue: 'ACTIVE',
            },
        }, {
            sequelize,
            timestamps: true,
            tableName: 'Channel',
            tableName: 'Channels',

        })

    }
    static associate(models) {
        // Define a associação Many-to-Many com o modelo User
        this.belongsToMany(models.User, { foreignKey: 'channel_id', through: 'channels_users', as: 'users' });
        this.belongsTo(models.User, { foreignKey: 'creator_id'})
        this.hasMany(models.Sensor, {
            foreignKey: "channels_id",
            as: "Sensores",
        });

    }

}


module.exports = Channel;
