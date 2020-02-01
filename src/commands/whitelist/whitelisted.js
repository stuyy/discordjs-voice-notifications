const Whitelist = require('../../models/Whitelist');
const { RichEmbed } = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        console.log(args)
    },
    aliases: new Map([
        ['wlist', null]
    ])
}