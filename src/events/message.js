const { RichEmbed } = require('discord.js');
module.exports = async(client, message) => {
    if(message.author.bot) return;
    // Get command name.
    let args = message.content.split(new RegExp(/\s+/));
    let command = args.shift();
    const PREFIX = client.prefix;
    if(command.startsWith(PREFIX)) {
        let cmdName = command.slice(PREFIX.length);
        if(client.commands.has(cmdName))
            await client.commands.get(cmdName).run(client, message, args);
        else {
            let embed = new RichEmbed()
                .setDescription(`Error: Command **${cmdName}** does not exist.`)
                .setColor("#CB2525")
                .setTimestamp()
            try {
                let msg = await message.channel.send(embed);
                await msg.delete(8000);
            } 
            catch(err) {
                console.log(err);
            }
        }

    }
    else {
        // Do other things if no command.
    }
}