const { DataTypes, Model } = require('sequelize');

module.exports = class Guild extends Model { 
    static init(sequelize) {
        super.init({
            guildId: { type: DataTypes.STRING, primaryKey: true },
            guildName: { type: DataTypes.STRING, allowNull: false },
            guildCreateDate: { type: DataTypes.DATE, allowNull: false }
        }, {
            sequelize,
            tableName: 'Guilds',
            timestamps: true
        });
    }
}