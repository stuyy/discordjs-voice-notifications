const User = require('../models/User');
const Guild = require('../models/Guild');
const UserGuilds = require('../models/UserGuilds')

/**
 * Add user to Users table
 * Add guild to Guild table
 * Add user and guild ids to UserGuild table.
 */
module.exports = async (client, member) => {
    console.log("Member joined.");
    try {
        let newUser = await User.findOrCreate({ 
            where: { clientId: member.id },
            defaults: {
                userId: member.id,
                joined: member.joinedAt,
                createdAt: member.user.createdAt,
                username: member.user.username
            }
        });
        let newGuild = await Guild.findOrCreate({
            where: { guildId: member.guild.id },
            defaults: {
                guildId: member.guild.id,
                guildName: member.guild.name,
                guildCreateDate: member.guild.createdAt
            }
        });
        let newUserGuild = await UserGuilds.findOrCreate({
            where: { guildId: member.guild.id, clientId: member.id },
            defaults: {
                guildId: member.guild.id,
                clientId: member.id
            }
        });

        console.log("Good.");
    }
    catch(err) {
        console.log(err);
    }
}