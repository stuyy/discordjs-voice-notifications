const { DataTypes, Model } = require('sequelize');
const Guild = require('./Guild');

module.exports = class VoiceChannelSubscription extends Model { 
    static init(sequelize) {
        super.init({
            channelId: { type: DataTypes.STRING, primaryKey: true },
            guildId: { type: DataTypes.STRING, references: {
                model: Guild,
                key: 'guildId'
            }},
            clientId: { type: DataTypes.STRING, primaryKey: true },
            subscribed: { type: DataTypes.BOOLEAN, defaultValue: true }
        }, {
            sequelize: sequelize,
            tableName: 'VoiceChannelSubscriptions',
            timestamps: true
        });
    }
}