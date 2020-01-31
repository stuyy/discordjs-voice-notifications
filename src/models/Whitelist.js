const { DataTypes, Model } = require('sequelize');
const Guild = require('./Guild');

module.exports = class Whitelist extends Model {
    static init(sequelize) {
        return super.init({
            channelId: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            clientId: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            guildId: {
                type: DataTypes.STRING,
                references: {
                    model: Guild,
                    key: 'guildId'
                }
            },
            whitelistedUserId: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            whitelisted: {
                type: DataTypes.BOOLEAN,
                defaultValue: true 
            }
        }, {
            sequelize,
            timestamps: true,
            tableName: 'Whitelist'
        });
    }
}