const {Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton, createMessageComponentCollector} = require("discord.js");
const client = new Client({intents:[3244031]});
const fs = require("fs");
const { readdirSync } = require("fs");

const moment = require("moment")
const i18next = require("i18next")
const translationBackend = require("i18next-fs-backend")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require("./config.js")

//////////////////////////////// MONGODB BAĞLANMA //////////////////////////




//////////////////////////////// MONGODB BAĞLANMA //////////////////////////

///////////////////////////////////////////////// İ18NEXT /////////////////////////////////
 i18next
 .use(translationBackend)
 .init({
  ns: readdirSync("./locales/en-US").map(a => a.replace(".json", "")),
  defaultNS: "commands",
  fallbackLng: "en-US",
  preload: readdirSync("./locales"),
  backend: {
    loadPath: "./locales/{{lng}}/{{ns}}.json"
  }
 })

///////////////////////////////////////////////// İ18NEXT /////////////////////////////////











             

//////////////////////////////// SLASH COMMANDS SENKRONİZE ETME //////////////////////////

client.commands = new Collection()

const rest = new REST({ version: '9' }).setToken(config.token);

const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };

//command-handler
const commands = [];
readdirSync('./komutlar').forEach(async file => {
  const command = require(`./komutlar/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
})

client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
        } catch (error) {
            console.error(error);
        }
    log(`${client.user.username} Aktif Edildi!`);
})

//event-handler
readdirSync('./events').forEach(async file => {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})
//

//////////////////////////////// SLASH COMMANDS SENKRONİZE ETME //////////////////////////


client.on('ready', () => {
    console.log(`
    ${client.user.tag} ismi ile giriş yapıldı,
    ${client.channels.cache.size} adet kanala,
    ${client.guilds.cache.size} adet sunucuya,
    ${client.users.cache.size} adet kullanıcıya hizmet veriyor.`);
    });
    
 







   




client.login(config.token);
