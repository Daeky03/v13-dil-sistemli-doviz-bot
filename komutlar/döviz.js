
const { t } = require("i18next")
const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("exchange-rate")
    .setDescription("You Look at the Exchange Rate of Each Country's Currencies")
    .setNameLocalizations({
      tr: 'döviz-kuru',
  })

.setDescriptionLocalizations({
      tr: 'Her Ülkenin Para Birimlerinin Döviz Kuruna Bakarsın',
  }),
    run: async (client, interaction) => {
      const cdn = await fetch('https://api.genelpara.com/embed/doviz.json')
                        const döviz = await cdn.json();
const embed = new MessageEmbed() 
.setAuthor(`${t("döviz.author", { lng: interaction.locale })}`, client.user.avatarURL())
.setColor("RED") 
.setDescription(`**${t("döviz.location", { lng: interaction.locale })}**: :flag_tr:\n\n**${t("döviz.dollar", { lng: interaction.locale })}**\n${t("döviz.sell", { lng: interaction.locale })} : ${döviz.USD.satis} / ${t("döviz.buy", { lng: interaction.locale })} : ${döviz.USD.satis}\n**Euro**\n${t("döviz.sell", { lng: interaction.locale })} : ${döviz.EUR.satis} / ${t("döviz.buy", { lng: interaction.locale })} : ${döviz.EUR.alis}\n**BTC(BitCoin)**\n${t("döviz.sell", { lng: interaction.locale })} : ${döviz.BTC.satis} / ${t("döviz.buy", { lng: interaction.locale })} : ${döviz.BTC.alis}\n**${t("döviz.gold", { lng: interaction.locale })}**\n${t("döviz.sell", { lng: interaction.locale })} : ${döviz.GA.satis} / ${t("döviz.buy", { lng: interaction.locale })} : ${döviz.GA.alis}`)

.setFooter("Dövizcik", client.user.avatarURL())

interaction.reply({

 embeds: [embed]

})}}