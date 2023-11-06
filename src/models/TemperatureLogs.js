const {Model, DataTypes } = require('sequelize');


class TemperatureLog extends Model {

    static init(sequelize){
              // Inicialização do modelo TemperatureLog

        super.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
              },
              temperature: {
                type: DataTypes.REAL,
                allowNull: false,
              }, 
              created_at: {
                type: DataTypes.DATE,
              }
             
        },{
            sequelize,
            tableName: 'TemperatureLogs', // Nome da tabela no banco de dados
            ModelName : 'TemperatureLog', // Nome do model
            timestamps: false, // Habilitar campos createdAt e updatedAt
        })
    }

    static associate(models) {
      this.belongsTo(models.Sensor, { foreignKey: 'sensor_id', as: 'sensor' });
    }

}


module.exports = TemperatureLog;