const { RichEmbed } = require('discord.js');
const VoiceChannelSubscription = require('../../models/VoiceChannelSubscription');

module.exports = {
    run: async (client, message, args) => {
        // Display all subscriptions for the user in current guild.
        try {
            let subscriptions = await VoiceChannelSubscription.findAll({ 
                where: { guildId: message.guild.id, clientId: message.author.id, subscribed: true }
            });
            subscriptions = subscriptions.map(s => s.dataValues.channelId);
            let channels = [];
            subscriptions.forEach(id => {
                let channel = client.channels.get(id);
                if(channel)
                    channels.push(channel);
            });
            channels = channels.map(c => `**${c.name}** - (${c.id})`).join("\n");
            let embed = new RichEmbed()
                .setTitle("Your Subscriptions")
                .setDescription(channels)
                .setColor("#00B9FF")
                .setTimestamp();
            message.channel.send(embed);
        }
        catch(err) {
            console.log(err);
        }
    },
    aliases: new Map([
        ['subbed', null]
    ])
}