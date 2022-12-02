const Discord = require("discord.js");
const { Database } = require("quickmongo");
const db = new Database(process.env.DATABASE);

db.connect();

module.exports = {
    name: "resetMessages",
    description: "Reseta as mensagens de um ou todos os usuários.",
    aliases: ["resetmessage", "rmsg"],

    async execute(client, message, args) {

        message.delete()

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            const error = new Discord.MessageEmbed()
                .setDescription("<:Caf_IconTickRed:966538465506373702> **Você não tem permissão para usar esse comando.**")
                .setColor("#f04a47")
                .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            return message.channel.send({ embeds: [error] }).then(message => {
                setTimeout(() => message.delete(), 10000);
            })
        }

        if (args[0] == "all") {
            let mensagens_sent = (await db.all()).map(entry => entry.ID).filter(id => id.startsWith(`mensagensEnviadas_`))
            let mensagens_all = (await db.all()).map(entry => entry.ID).filter(id => id.startsWith(`mensagensTotais_`))

            mensagens_sent.forEach(db.delete)
            mensagens_all.forEach(db.delete)

            let reset = new Discord.MessageEmbed()
                .setAuthor({ name: "Reset efetuado", iconURL: "https://cdn.discordapp.com/emojis/953375249225908234.gif" })
                .setDescription("<:Caf_IconTickGreen:966538682108608552> **As mensagens de todos os usuários do servidor foram resetados com sucesso.**")
                .setColor("#43b582")
                .setFooter({ text: `Comando requisitado por: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            message.channel.send({ embeds: [reset] })
        } else {

            let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

            if (!usuario) {

                const error = new Discord.MessageEmbed()
                    .setAuthor({ name: `Comando inválido - ${message.guild.me.displayName}`, iconURL: "https://cdn.discordapp.com/emojis/953349532668813333.gif" })
                    .setDescription(`<:Caf_RedArrow:954619671972294656> Comando: **${process.env.PREFIX}resetmessages**\n<:Caf_RedArrow:954619671972294656> Exemplo: **${process.env.PREFIX}resetmessages <@usuário/all>**\n<:Caf_RedArrow:954619671972294656> Aliases: **${process.env.PREFIX}resetmessage**, **${process.env.PREFIX}resetmsg**\n\n<:Caf_RedArrow:954619671972294656> **Descrição:**\nUtilize para resetar as mensagens de um ou todos os usuários.`)
                    .setColor("#f04a47")
                    .setThumbnail(client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

                return message.channel.send({ embeds: [error] }).then(message => {
                    setTimeout(() => message.delete(), 30000);
                })
            }

            await db.set(`mensagensEnviadas_${usuario.guild.id}_${usuario.id}`, 0)
            await db.set(`mensagensTotais_${usuario.guild.id}_${usuario.id}`, 0)

            let resetUser = new Discord.MessageEmbed()
                .setAuthor({ name: "Reset efetuado", iconURL: "https://cdn.discordapp.com/emojis/953375249225908234.gif" })
                .setDescription(`<:Caf_IconTickGreen:966538682108608552> **As mensagens de** ${usuario}(\`${usuario.id}\`) **foram resetadas com sucesso.**`)
                .setColor("#43b582")
                .setFooter({ text: `Comando requisitado por: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            message.channel.send({ embeds: [resetUser] }).then(message => {
                setTimeout(() => message.delete(), 30000);
            })
        }
    }
}