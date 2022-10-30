const { Permissions, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

 module.exports = {
	name: 'interactionCreate',
	execute: async(interaction) => {
  let client = interaction.client;
    	if (!interaction.isCommand()) return;
      if(interaction.member.bot) return;

	readdirSync('./komutlar').forEach(file => {
        const command = require(`../komutlar/${file}`);
        if(interaction.commandName.toLowerCase() === command.data.name.toLowerCase()) {
        command.run(client, interaction)
    }
	})
  }}