const { Model, DataTypes } = require('sequelize');

class Sensor extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            corretion_temperature: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            corretion:{
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            location: {
                type: DataTypes.STRING(255),
            },
            status: {
                type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
                defaultValue: "ACTIVE",
            },
        },{   
            sequelize,
            tableName: "Sensors", // Nome da tabela no banco de dados
            ModelName: "Users", // nome do model
            timestamps: true, // incluir automaticamente os campos createdAt e updatedAt
        }
        )
        
    }

    static associate(models) {
        this.belongsTo(models.Sensor, { foreignKey: 'channels_id', as: 'channel' });

        this.hasMany(models.TemperatureLog, {
            foreignKey: "sensor_id",
            as: "TemperatureLogs",
        });
    }
}

module.exports = Sensor;
