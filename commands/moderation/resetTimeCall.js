const Discord = require("discord.js");
const { Database } = require("quickmongo");
const db = new Database(process.env.DATABASE);

db.connect();

module.exports = {
    name: "resetTimeCall",
    description: "Reseta o tempo de call de um ou todos os usuários.",
    aliases: ["resetcalls", "rtempo"],

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
            let tempo_all = (await db.all()).map(entry => entry.ID).filter(id => id.startsWith(`tempocall_`))

            tempo_all.forEach(await db.delete)

            let reset = new Discord.MessageEmbed()
                .setAuthor({ name: "Reset efetuado", iconURL: "https://cdn.discordapp.com/emojis/953375249225908234.gif" })
                .setDescription("<:Caf_IconTickGreen:966538682108608552> **O tempo em call de todos os usuários do servidor foram resetados com sucesso.**")
                .setColor("#43b582")
                .setFooter({ name: `Comando requisitado por: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            message.channel.send({ embeds: [reset] })
        } else {

            let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

            if (!usuario) {

                const error = new Discord.MessageEmbed()
                    .setAuthor({ name: `Comando inválido - ${message.guild.me.displayName}`, iconURL: "https://cdn.discordapp.com/emojis/953349532668813333.gif" })
                    .setDescription(`<:Caf_RedArrow:954619671972294656> Comando: **${process.env.PREFIX}resettimecall**\n<:Caf_RedArrow:954619671972294656> Exemplo: **${process.env.PREFIX}resettimecall <@usuário/all>**\n<:Caf_RedArrow:954619671972294656> Aliases: **${process.env.PREFIX}resetcalls**, **${process.env.PREFIX}rtempo**\n\n<:Caf_RedArrow:954619671972294656> **Descrição:**\nUtilize para resetar o tempo em call de um ou todos os usuários.`)
                    .setColor("#f04a47")
                    .setThumbnail(client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

                return message.channel.send({ embeds: [error] }).then(message => {
                    setTimeout(() => message.delete(), 30000);
                })
            }

            await db.set(`tempocall_${usuario.guild.id}_${usuario.id}`, 0)

            let resetUser = new Discord.MessageEmbed()
                .setAuthor({ name: "Reset efetuado", iconURL: "https://cdn.discordapp.com/emojis/953375249225908234.gif" })
                .setDescription(`<:Caf_IconTickGreen:966538682108608552> **O tempo em call de** ${usuario}(\`${usuario.id}\`) **foi resetado com sucesso.**`)
                .setColor("#43b582")
                .setFooter({ text: `Comando requisitado por: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            message.channel.send({ embeds: [resetUser] }).then(message => {
                setTimeout(() => message.delete(), 30000);
            })
        }
    }
}