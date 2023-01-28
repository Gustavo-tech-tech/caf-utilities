const Discord = require("discord.js");
const humanizeDuration = require("humanize-duration");
const commaNumber = require("comma-number");
const moment = require("moment");
let { emotes } = require("../emojis.json");

moment.locale("pt-br");

module.exports = {
    name: "guildMemberAdd",
    once: false,

    async execute(client, member) {

        let thumbnail = emotes[Math.floor(Math.random() * emotes.length)];

        if (!["802594126994210857"].includes(member.guild.id)) return false;

        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel("Leia as regras")
                    .setStyle("LINK")
                    .setURL("https://discord.com/channels/802594126994210857/802594127363440659")
            )

        // Mensagem de entrada
        const welcomer = new Discord.MessageEmbed()
            .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ format: "png", dynamic: true }) })
            .setDescription("Seja bem-vindo(a) ao **Star's Café**. Fique à vontade para conversar no <#802594127828615242> ou participar de nossas calls. Esperemos que aproveite sua estadia!")
            .setColor("RANDOM")
            .setThumbnail(thumbnail)

        client.channels.cache.get("802594127828615242").send({ content: `<@${member.user.id}>`, embeds: [welcomer], components: [row] })

        // Log de entrada
        const joinLogger = new Discord.MessageEmbed()
            .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ format: "png", dynamic: true }) })
            .setDescription(`<:Caf_IconAddMember:916141737485942824> **${member.user.username}** entrou no servidor!`)
            .setColor("#ff69b4")
            .addFields(
                {
                    name: "<:Caf_IconDate:910585170745249862> Conta criada em:",
                    value: `**${moment(member.user.createdAt).format("LL")}** (há ${humanizeDuration(member.user.createdAt - Date.now(), { largest: 2, delimiter: " e ", round: true, language: "pt" })})`
                },
                {
                    name: "<:Caf_IconUser:952043105480224848> Contador de membros:",
                    value: `**${commaNumber(client.guilds.cache.get("802594126994210857").memberCount)}** membros.`
                }
            )
            .setFooter({ text: `ID: ${member.user.id}` })
            .setTimestamp();

        client.channels.cache.get("912850829009117254").send({ embeds: [joinLogger] })
    }
}