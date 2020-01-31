const { DataTypes, Model } = require('sequelize');

module.exports = class User extends Model { 
    static init(sequelize) {
        return super.init({
            clientId: { type: DataTypes.STRING, primaryKey: true },
            joined: { type: DataTypes.DATE, allowNull: false },
            createdAt: { type: DataTypes.DATE, allowNull: false },
            username: { type: DataTypes.STRING, allowNull: true }
        }, { 
            sequelize: sequelize, 
            timestamps: true, 
            tableName: 'Users' 
        });
    }
}

