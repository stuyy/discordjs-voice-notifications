require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client();
const db = require('./database/db');
const { registerDBModels, registerCommands, registerEvents } = require('./utils/init');
(async function main() {
    try {
        client.commands = new Map();
        client.events = new Map();
        client.prefix = '?';
        
        await db.authenticate();
        await registerCommands('commands', client);
        await registerEvents('events', client);
        await registerDBModels('models', db);
        await client.login(process.env.BOT_TOKEN);
    }
    catch(err) {
        console.log(err);
    }
})();