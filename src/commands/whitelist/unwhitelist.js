const Whitelist = require('../../models/Whitelist');
const { RichEmbed } = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        // Get every User object using the arguments from command
        const channelId = args.shift(); // Get channel id, first argument in array.
        let channel = client.channels.get(channelId); // Retrieve channel object by id.
        if(channel && channel.type === 'voice' && args.length !== 0) { 
            let memberIds = args.filter((id, index) => args.indexOf(id) === index)
                .filter(id => message.guild.members.find(member => member.id === id))
                .concat(message.mentions.members.array().map(m => m.id)); // Combine ids from mentions with raw ids passed.
                memberIds = memberIds
                    .filter((id, index) => memberIds.indexOf(id) === index) // Filter duplicate  after combining raw ids with mentions
                    .filter(id => id !== message.author.id); // Filter out original author id
                console.log(memberIds);
            
            // Whitelist every user in this ID for the author
            
            for(let i = 0; i < memberIds.length; i++) {
                try {
                    let wl = await Whitelist.findOne({
                        where: { 
                            channelId, 
                            clientId: message.author.id, 
                            whitelistedUserId: memberIds[i] 
                        }
                    });
                    console.log(wl);
                    await wl.update({ whitelisted: false });
                }
                catch(err) {
                    console.log(err);
                }
            }
            let embed = new RichEmbed()
                .setDescription(`Success.`)
                .setTimestamp()
                .setColor("#25FF07");
            let msg = await message.channel.send(embed);
        }
        else {
            let embed = new RichEmbed()
                .setDescription(`Please specify a valid voice channel id and member id.`)
                .setTimestamp()
                .setColor("#25FF07");
            let msg = await message.channel.send(embed);
        }
    },
    aliases: new Map([
        ['rm', null],
        ['unlist', null]
    ])
}