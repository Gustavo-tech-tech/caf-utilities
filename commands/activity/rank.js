const Discord = require("discord.js");
const ms = require("milliseconds");
const commaNumber = require("comma-number");
const { Database } = require("quickmongo");
const db = new Database(process.env.DATABASE);

db.connect();

module.exports = {
    name: "rank",
    description: "Veja o top 15 de tempo em call ou mensagens.",
    aliases: ["top", "leaderboard"],

    async execute(client, message, args) {

        message.delete()

        if (!args[0]) {
            const error = new Discord.MessageEmbed()
                .setAuthor({ name: `Comando inválido - ${message.guild.me.displayName}`, iconURL: "https://cdn.discordapp.com/emojis/953349532668813333.gif" })
                .setDescription(`<:Caf_RedArrow:954619671972294656> Comando: **${process.env.PREFIX}rank**\n<:Caf_RedArrow:954619671972294656> Exemplo: **${process.env.PREFIX}rank <tempo/mensagens>**\n<:Caf_RedArrow:954619671972294656> Aliases: **${process.env.PREFIX}top**, **${process.env.PREFIX}leaderboard**\n\n<:Caf_RedArrow:954619671972294656> **Descrição:**\nUtilize para ver os usuários com maior tempo em call ou maior número de mensagens.`)
                .setColor("#f04a47")
                .setThumbnail(client.user.displayAvatarURL({ format: "png", dynamic: true }))
                .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            return message.channel.send({ embeds: [error] }).then(message => {
                setTimeout(() => message.delete(), 30000);
            })
        }

        if (args[0] === "tempo") {
            const resp = (await db.all()).filter(data => data.ID.startsWith(`tempocall_${message.guild.id}`)).sort((a, b) => b.data - a.data);
            resp.length = 15;

            var rankCall = ""
            for (var i = 0; i in resp; i++) {
                let tempo = resp[i].data
                let totalSeconds = (ms.seconds(tempo) / 1000);
                let hora = Math.floor(totalSeconds / 3600);
                let minuto = Math.floor(totalSeconds % 3600 / 60);
                let segundo = Math.floor(totalSeconds % 3600 % 60);

                let horas = hora > 0 ? hora + (hora == 1 ? " hora" : " horas") + (minuto > 0 || segundo > 0 ? ", " : "") : "";
                let minutos = minuto > 0 ? minuto + (minuto == 1 ? " minuto" : " minutos") + (segundo > 0 ? " e " : "") : "";
                let segundos = segundo > 0 ? segundo + (segundo == 1 ? " segundo" : " segundos") : "";
                tempo = horas + minutos + segundos;

                rankCall += ` \` ${i + 1} \` ${client.users.cache.get(resp[i].ID.split("_")[2]) ? client.users.cache.get(resp[i].ID.split("_")[2]).tag : "**Usuário desconhecido**"} - **${tempo}**\n`
            }

            if (rankCall == undefined || rankCall == "") {
                const error = new Discord.MessageEmbed()
                    .setDescription("<:Caf_IconTickRed:966538465506373702> **Nenhum membro está no top 15 tempo.**")
                    .setColor("#f04a47")
                    .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

                return message.channel.send({ embeds: [error] }).then(message => {
                    setTimeout(() => message.delete(), 10000);
                })
            }

            const leaderboard = new Discord.MessageEmbed()
                .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ format: "png", dynamic: true }) })
                .setTitle("Leaderboard de calls")
                .setDescription(rankCall)
                .setColor("#ff69b4")
                .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            message.channel.send({ embeds: [leaderboard] }).then(message => {
                setTimeout(() => message.delete(), 60000);
            })
        } else if (args[0] === "mensagens") {
            const resp = (await db.all()).filter(data => data.ID.startsWith(`mensagensTotais_${message.guild.id}`)).sort((a, b) => b.data - a.data);
            resp.length = 15;

            let rankMensagens = ""
            for (var i = 0; i in resp; i++) {
                rankMensagens += ` \` ${i + 1} \` ${client.users.cache.get(resp[i].ID.split("_")[2]) ? client.users.cache.get(resp[i].ID.split("_")[2]).tag : "**Usuário desconhecido**"} - **${commaNumber(resp[i].data)}**\n`
            }

            if (rankMensagens == undefined || rankMensagens == "") {
                const error = new Discord.MessageEmbed()
                    .setDescription("<:Caf_IconTickRed:966538465506373702> **Nenhum membro está no top 15 mensagens.**")
                    .setColor("#f04a47")
                    .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

                return message.channel.send({ embeds: [error] }).then(message => {
                    setTimeout(() => message.delete(), 10000);
                })
            }

            const leaderboard = new Discord.MessageEmbed()
                .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ format: "png", dynamic: true }) })
                .setTitle("Leaderboard de mensagens")
                .setDescription(rankMensagens)
                .setColor("#ff69b4")
                .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            message.channel.send({ embeds: [leaderboard] }).then(message => {
                setTimeout(() => message.delete(), 60000);
            })
        }
    }
}