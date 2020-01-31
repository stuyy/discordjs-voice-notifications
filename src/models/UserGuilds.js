const { DataTypes, Model } = require('sequelize');
const User = require('./User');
const Guild = require('./Guild');

module.exports = class UserGuilds extends Model { 
    static init(sequelize) {
        return super.init({
            clientId: { 
                type: DataTypes.STRING, 
                references: { model: User, key: 'clientId' }
            },
            guildId: {
                type: DataTypes.STRING,
                references: { model: Guild, key: 'guildId' }
            }
        }, { 
            sequelize: sequelize, 
            timestamps: true, 
            tableName: 'UserGuilds' 
        });
    }
}
