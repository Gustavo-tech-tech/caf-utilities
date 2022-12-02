const Discord = require("discord.js");
const humanizeDuration = require("humanize-duration");

module.exports = {
    name: "uptime",
    description: "Exibe o tempo em que o bot está online.",

    execute(client, message, args) {

        message.delete()

        const uptime = new Discord.MessageEmbed()
            .setAuthor({ name: `${message.guild.me.displayName} - Tempo de atividade`, iconURL: client.user.displayAvatarURL({ format: "png", dynamic: true }) })
            .setDescription(`<:SC_IconRichPresence:910585230061096960> Estive online por **${humanizeDuration(message.client.uptime, { largest: 4, conjunction: " e ", serialComma: false, round: true, language: "pt" })}**.`)
            .setColor("#ff69b4")
            .setFooter({ text: `Requisitado por: ${message.author.username}` })

        message.channel.send({ embeds: [uptime] }).then(message => {
            setTimeout(() => message.delete(), 10000);
        })
    }
}