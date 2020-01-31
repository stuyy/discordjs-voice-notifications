const path = require('path');
const fs = require('fs').promises;

async function registerDBModels(p = 'models', db)  {
    try {
        let dir = path.join(__dirname, '..', p);
        let files = await fs.readdir(dir);
        for (let file of files) {
            let current = path.join(__dirname, '..', p, file);
            let stat = await fs.lstat(current);
            if(stat.isDirectory())
                await registerDBModels(path.join(p, file), db);
            else {
                if(file.endsWith(".js")) {
                    let dbModel = require(current);
                    dbModel.init(db);
                    dbModel.sync();
                }
                else
                    throw new Error(`${file} is already registered`);
            }
        }
    }
    catch(err) {
        console.log(err);
    }
}
async function registerCommands(p = 'commands', client) {
    console.log('Yo')
    try {
        let dir = path.join(__dirname, '..', p);
        let files = await fs.readdir(dir);
        for (let file of files) {
            let current = path.join(__dirname, '..', p, file);
            let stat = await fs.lstat(current);
            if(stat.isDirectory())
                await registerCommands(path.join(p, file), client);
            else {
                if(file.endsWith(".js") && !client.commands.has(file)) {
                    let commandModule = require(current);
                    let commandName = file.substring(0, file.indexOf(".js"));
                    client.commands.set(commandName, commandModule);
                    commandModule.aliases.forEach((value, key) => {
                        client.commands.set(key, client.commands.get(commandName));
                    });
                }
                else
                    throw new Error(`${file} is already registered at ${client.commands.get(file).path}`);
            }
        }
        return client.commands;
    }
    catch(err) {
        console.log(err);
    }
}
async function registerEvents (p = 'events', client) {
    try {
        let dir = path.join(__dirname, '..', p);
        let files = await fs.readdir(dir);
        for (let file of files) {
            let current = path.join(__dirname, '..', p, file);
            let stat = await fs.lstat(current);
            if(stat.isDirectory())
                await registerEvents(path.join(p, file));
            else {
                if(file.endsWith(".js") && !client.events.has(file)) {
                    let eventModule = require(current);
                    let eventName = file.substring(0, file.indexOf(".js"));
                    client.events.set(file, eventModule);
                    client.on(eventName, eventModule.bind(null, client));
                    console.log(eventModule)
                }
                else
                    throw new Error(`${file} is already registered at ${client.events.get(file).path}`);
            }
        }
        return client.events;
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = { registerCommands, registerDBModels, registerEvents };