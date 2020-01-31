const Whitelist = require('../../models/Whitelist');
const { RichEmbed } = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        const channelId = args.shift(); // Get channel id, first argument in array.
        let channel = client.channels.get(channelId); // Retrieve channel object by id.
        // Check if channel exists and is correct type
        if(channel && channel.type === 'voice' && args.length !== 0) { 
            // Remove manual duplicate IDs enter.
            // Filter out undefined values
            // Concatenate message.mentions.array() with current Array.
            let memberIds = args
                .filter((id, index) => args.indexOf(id) === index)
                .filter(id => message.guild.members.find(member => member.id === id))
                .concat(message.mentions.members.array().map(m => m.id)); // Combine ids from mentions with raw ids passed.

            // Filter out combined array from duplicates.
            memberIds = memberIds
                .filter((id, index) => memberIds.indexOf(id) === index) 
                .filter(id => id !== message.author.id); // Filter out original author id

            console.log(memberIds);
            
            // Whitelist every user in this ID for the author
            // Loop through all member ids to be whitelisted.
            for(let i = 0; i < memberIds.length; i++) {
                try {
                    // wl is the instance from the Database, created is a boolean value, true if created, false otherwise.
                    let [ wl, created ] = await Whitelist.findOrCreate({
                        where: { 
                            channelId, 
                            clientId: message.author.id, 
                            whitelistedUserId: memberIds[i] 
                        },
                        defaults: {
                            channelId,
                            clientId: message.author.id, 
                            whitelistedUserId: memberIds[i]
                        }
                    });
                }
                catch(err) {
                    console.log(err);
                }
            }
        }
        else {
            let embed = new RichEmbed()
                .setDescription(`Please specify a valid voice channel id and at least 1 member id.`)
                .setTimestamp()
                .setColor("#25FF07");
            let msg = await message.channel.send(embed);
        }
        
    },
    aliases: new Map([
        ['wl', null]
    ])
}