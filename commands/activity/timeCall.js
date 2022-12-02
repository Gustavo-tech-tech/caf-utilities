const Discord = require("discord.js");
const ms = require("milliseconds");
const { Database } = require("quickmongo");
const db = new Database(process.env.DATABASE);

db.connect();

module.exports = {
    name: "timeCall",
    description: "Veja seu tempo total e acumulado em call.",
    aliases: ["tempo", "time"],

    async execute(client, message, args) {

        message.delete()

        let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if (usuario.user.bot) {
            const error = new Discord.MessageEmbed()
                .setDescription("<:Caf_IconTickRed:966538465506373702> **Esse comando não foi feito para ser usado com bots.**")
                .setColor("#f04a47")
                .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            return message.channel.send({ embeds: [error] }).then(message => {
                setTimeout(() => message.delete(), 10000);
            })
        }

        let tempo = await db.get(`tempocall_${usuario.guild.id}_${usuario.id}`)
        if (tempo === null) {
        } else {
            tempo = tempo.toString().replace("-", "")
        }

        if (tempo === 0 || tempo === null) {
            tempo = "**Você não possui nenhum tempo salvo.**"
        } else {
            let totalSeconds = (ms.seconds(tempo) / 1000);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 86400;
            totalSeconds %= 3600;
            minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

            tempo = hours + " horas, " + minutes + " minutos e " + seconds + " segundos. ";
        }

        let infos1 = await db.get(`contando_${usuario.guild.id}_${usuario.id}`)
        if (infos1 === false) {

        }
        if (usuario.voice.channel) {
            let infos = JSON.parse(infos1)
            const tempo_acumulado = await db.get(`call_${usuario.guild.id}_${usuario.id}`);
            const start_acumulado = new Date().getTime();

            const diff_acumulado = Math.abs(tempo_acumulado - start_acumulado);
            const tempo2_acumulado = Math.ceil(diff_acumulado / 1000);

            let tempo_acumulado_total = (ms.seconds(tempo2_acumulado) / 1000);

            tempo_acumulado_total %= 86400;
            let hours2 = Math.floor(tempo_acumulado_total / 3600);
            tempo_acumulado_total %= 86400;
            tempo_acumulado_total %= 3600;
            let minutes2 = Math.floor(tempo_acumulado_total / 60);
            let seconds2 = Math.floor(tempo_acumulado_total % 60);
            tempo_acumulado_total = hours2 + " horas, " + minutes2 + " minutos e " + seconds2 + " segundos. ";

            if (infos === true) infos = "Sim";
            if (infos === false) infos = "Não";
            if (infos === null) infos = "Não";

            const tempCallEmbed = new Discord.MessageEmbed()
                .setAuthor({ name: usuario.user.username, iconURL: usuario.user.displayAvatarURL({ format: "png", dynamic: true }) })
                .setColor("#ff69b4")
                .setThumbnail(usuario.user.displayAvatarURL({ format: "png", dynamic: true }))
                .addFields(
                    {
                        name: "<:Caf_IconClock:950255849538994226> Tempo registrado:",
                        value: `**${tempo}**`
                    },
                    {
                        name: "<:Caf_IconClock:950255849538994226> Tempo acumulado:",
                        value: `**${tempo_acumulado_total}**`
                    },
                    {
                        name: "<:Caf_IconVoiceChannel:950256027717226496> Canal:",
                        value: `\`${usuario.voice.channel.name}\``,
                        inline: true
                    },
                    {
                        name: "<:Caf_IconMicrophoneUnmuted:952093097649647656> Contando?",
                        value: `\`${infos}\``,
                        inline: true
                    },
                    {
                        name: "<:Caf_IconServerInsights:952090848550604800> Ranking completo:",
                        value: `\`${process.env.PREFIX}rank tempo\``
                    })
                .setFooter({ text: usuario.guild.name, iconURL: usuario.guild.iconURL({ format: "png", dynamic: true }) })
                .setTimestamp()

            message.channel.send({ embeds: [tempCallEmbed] }).then(message => {
                setTimeout(() => message.delete(), 60000);
            })
        } else {
            const tempCallEmbed = new Discord.MessageEmbed()
                .setAuthor({ name: usuario.user.username, iconURL: usuario.user.displayAvatarURL({ format: "png", dynamic: true }) })
                .setColor("#ff69b4")
                .setThumbnail(usuario.user.displayAvatarURL({ format: "png", dynamic: true }))
                .addFields(
                    {
                        name: "<:Caf_IconClock:950255849538994226> Tempo registrado:",
                        value: `**${tempo}**`
                    },
                    {
                        name: "<:Caf_IconServerInsights:952090848550604800> Ranking completo:",
                        value: `\`${process.env.PREFIX}rank tempo\``
                    })
                .setFooter({ text: usuario.guild.name, iconURL: usuario.guild.iconURL({ format: "png", dynamic: true }) })
                .setTimestamp()

            message.channel.send({ embeds: [tempCallEmbed] }).then(message => {
                setTimeout(() => message.delete(), 60000);
            })
        }
    }
}