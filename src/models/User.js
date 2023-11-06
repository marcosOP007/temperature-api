const { DataTypes, Model } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            // Define os campos da tabela "Users"
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            permission_type: {
                type: DataTypes.ENUM('USER', 'ADMIN', 'MODERATOR'),
                allowNull: false,
                defaultValue: 'USER',
            },
            hash_password: {
                type: DataTypes.STRING(60),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(35),
                allowNull: false,
                unique: true,
            },
            status: {
                type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED'),
                allowNull: false,
                defaultValue: 'ACTIVE',
            },
            last_login: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'Users',
            timestamps: true,
        })
    }

    static associate(models) {
        // Define a associação Many-to-Many com o modelo "Channel"
        this.belongsToMany(models.Channel, { foreignKey: 'user_id', through: 'channels_users', as: 'Channels' });
        
    }
}

module.exports = User;

