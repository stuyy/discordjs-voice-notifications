const { RichEmbed } = require('discord.js');
const VoiceChannelSubscription = require('../../models/VoiceChannelSubscription');

module.exports = {
    run: async(client, message, args) => {
        if(args.length === 0) {
            let embed = new RichEmbed()
                .setDescription("Please specify a voice channel id.")
                .setColor("#FF0E74");
            let msg = await message.channel.send(embed);
            msg.delete(5000);
            message.delete(5000);
            return;
        }
        try {
            let voiceChannels = args
                .filter((id, index) => args.indexOf(id) === index)
                .map(id => client.channels.get(id))
                .filter((channel, i) => (channel !== undefined && channel.type === 'voice'));
            
            let success = [];

            for(let i = 0; i < voiceChannels.length; i++) {
                let voiceChannel = voiceChannels[i];
                let subscription = await VoiceChannelSubscription.findOne({
                    where: { channelId: voiceChannel.id, clientId: message.author.id }
                }).catch(err => console.log(err));
                await subscription.update({ subscribed: false }).catch(err => console.log(err));
                success.push(voiceChannel.name);
            }
            let embed = new RichEmbed()
                .setDescription(`Success. You've been unsubscribed from **${success.join(", ")}**`)
                .setTimestamp()
                .setColor("#25FF07");
            let msg = await message.channel.send(embed);  
            const TIME = 1000;
            let i = 5;
            let intervalFn = setInterval(async () => {
                let em = new RichEmbed()
                    .setDescription(`Success. You've been unsubscribed to **${success.join(", ")}**`)
                    .setTimestamp()
                    .setColor("#25FF07")
                    .setFooter(`This message will be deleted in ${i--} seconds.`)
                await msg.edit(em);
            }, TIME);
            await clear(intervalFn, i);
            await msg.delete(i*1000);
            console.log("Deleted."); 
        }
        catch(err) {
            console.log(err);
        }
    },
    aliases: new Map([
        ['unsub']
    ])
}

function clear(fn, i) {
    return new Promise((resolve) => {
        setTimeout(() => {
            clearInterval(fn);
            console.log("Cleared.");
            resolve();
        }, i*1000);
    })
}