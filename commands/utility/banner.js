const Discord = require("discord.js");

module.exports = {
    name: "banner",
    description: "Obtenha o banner de um usuário.",
    aliases: ["faixa"],

    async execute(client, message, args) {

        message.delete()

        let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let data = await membro.user.fetch(true)

        if (data.banner) {
            const banner = new Discord.MessageEmbed()
                .setAuthor({ name: `${message.guild.me.displayName} User`, iconURL: "https://cdn.discordapp.com/emojis/899185437820735509.gif" })
                .setDescription(`**Banner de ${membro.user.username}**`)
                .setColor("#f0cc76")
                .setImage(data.bannerURL({ force: true, format: "png", dynamic: true, size: 4096 }))
                .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            message.channel.send({ embeds: [banner] }).then(message => {
                setTimeout(() => message.delete(), 10000)
            })
        } else {
            const error = new Discord.MessageEmbed()
                .setDescription("<:Caf_IconTickRed:966538465506373702> **O usuário mencionado não possui um banner.**")
                .setColor("#f04a47")
                .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            message.channel.send({ embeds: [error] }).then(message => {
                setTimeout(() => message.delete(), 10000)
            })
        }
    }
}