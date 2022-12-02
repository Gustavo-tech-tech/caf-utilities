const Discord = require("discord.js");
const commaNumber = require("comma-number");
const ms = require("milliseconds");
const moment = require("moment");
const { Database } = require("quickmongo");
const db = new Database(process.env.DATABASE);

db.connect();

module.exports = {
    name: "activity",
    description: "Veja sua atividade no servidor esse mês.",
    aliases: ["ativo", "atividade"],

    async execute(client, message, args) {

        message.delete()

        moment.locale("pt-br")

        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId("como_funciona")
                    .setStyle("SECONDARY")
                    .setLabel("Como funciona?")
                    .setDisabled(false)
            )

        let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if (membro.user.bot) {
            const error = new Discord.MessageEmbed()
                .setDescription("<:Caf_IconTickRed:966538465506373702> **Esse comando não foi feito para ser usado com bots.**")
                .setColor("#f04a47")
                .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            return message.channel.send({ embeds: [error] }).then(message => {
                setTimeout(() => message.delete(), 10000);
            })
        }

        let mensagens = commaNumber(await db.get(`mensagensEnviadas_${membro.guild.id}_${membro.id}`))
        let mensagensTotais = commaNumber(await db.get(`mensagensTotais_${membro.guild.id}_${membro.id}`))

        const diaAtual = moment().get("date");
        const diasNoMes = moment().daysInMonth();
        const diasRestantes = diasNoMes - diaAtual + 1;

        if (mensagens === 0 || mensagens === null) {
            mensagens = "0"
        }

        if (mensagensTotais === 0 || mensagensTotais === null) {
            mensagensTotais = "0"
        }

        let tempo = await db.get(`tempocall_${membro.guild.id}_${membro.id}`)
        if (tempo === null) {
        } else {
            tempo = tempo.toString().replace("-", "")
        }

        if (tempo === 0 || tempo === null) {
            tempo = "0 segundos"
        } else {
            let totalSeconds = (ms.seconds(tempo) / 1000);
            let hora = Math.floor(totalSeconds / 3600);
            let minuto = Math.floor(totalSeconds % 3600 / 60);
            let segundo = Math.floor(totalSeconds % 3600 % 60);

            let horas = hora > 0 ? hora + (hora == 1 ? " hora" : " horas") + (minuto > 0 || segundo > 0 ? ", " : "") : "";
            let minutos = minuto > 0 ? minuto + (minuto == 1 ? " minuto" : " minutos") + (segundo > 0 ? " e " : "") : "";
            let segundos = segundo > 0 ? segundo + (segundo == 1 ? " segundo" : " segundos") : "";
            tempo = horas + minutos + segundos;
        }

        if (membro.roles.cache.has("934663182356725770")) {
            const activityEmbed2 = new Discord.MessageEmbed()
                .setAuthor({ name: `Sistema de membro ativo - ${membro.guild.name}`, iconURL: "https://cdn.discordapp.com/emojis/828831224583159818.gif" })
                .setDescription(`ﾠ<:Caf_IconUser:952043105480224848> Usuário: ${membro}\nﾠ<:Caf_GreenArrowRight:954802049223098450> Você é um <@&934663182356725770>`)
                .setThumbnail(membro.user.displayAvatarURL({ format: "png", dynamic: true }))
                .setColor("#67f1d6")
                .addFields(
                    {
                        name: "<:Caf_IconServerInsights:952090848550604800> Atividade em call:",
                        value: `ﾠ<:Caf_IconClock:950255849538994226> Tempo em call: **${tempo}**`
                    },
                    {
                        name: "<:Caf_IconReason:965803781763760228> Informações de chat:",
                        value: `ﾠ<:Caf_IconMessage:950255928463220756> Mensagens: **${mensagens}**\nﾠ<:Caf_IconChat:950262795218321438> Mensagens totais: **${mensagensTotais}**`
                    },
                    {
                        name: "<:Caf_IconRichPresence:910585230061096960> Benefícios:",
                        value: "ﾠ<:Caf_GreenArrowRight:954802049223098450> Permissão de enviar imagens no <#802594127828615242>\nﾠ<:Caf_GreenArrowRight:954802049223098450> Acesso a Sala VIP na seção geral"
                    })

            message.channel.send({ embeds: [activityEmbed2] }).then(message => {
                setTimeout(() => message.delete(), 60000)
            })
        } else {

            const activityEmbed = new Discord.MessageEmbed()
                .setAuthor({ name: `Sistema de membro ativo - ${membro.guild.name}`, iconURL: "https://cdn.discordapp.com/emojis/828831224583159818.gif" })
                .setDescription(`ﾠ<:Caf_IconUser:952043105480224848> Usuário: ${membro}`)
                .setThumbnail(membro.user.displayAvatarURL({ format: "png", dynamic: true }))
                .setColor("#67f1d6")
                .addFields(
                    {
                        name: "<:Caf_IconServerInsights:952090848550604800> Atividade em call:",
                        value: `ﾠ<:Caf_IconClock:950255849538994226> Tempo em call: **${tempo}**`
                    },
                    {
                        name: "<:Caf_IconReason:965803781763760228> Informações de chat:",
                        value: `ﾠ<:Caf_IconMessage:950255928463220756> Mensagens: **${mensagens}**\nﾠ<:Caf_IconChat:950262795218321438> Mensagens totais: **${mensagensTotais}**`
                    },
                    {
                        name: "<:Caf_IconPin:953384716462088212> Sobre:",
                        value: `ﾠ<:Caf_IconDate:910585170745249862> Próximo reset em: **${diasRestantes} dias**`
                    })
                .setFooter({ text: membro.guild.name, iconURL: membro.guild.iconURL({ format: "png", dynamic: true }) })

            message.channel.send({ embeds: [activityEmbed], components: [row] }).then(message => {

                const iFilter = i => i.user.id;

                const collector = message.createMessageComponentCollector({ filter: iFilter, time: 10 * 60000 });

                collector.on("collect", async (i) => {
                    switch (i.customId) {
                        case "como_funciona":

                            const howItWorks = new Discord.MessageEmbed()
                                .setAuthor({ name: `Sistema de membro ativo - ${membro.guild.name}`, iconURL: "https://cdn.discordapp.com/emojis/828831224583159818.gif" })
                                .setDescription("<:Caf_IconClipboard:910585257953218600> **Benefícios de:** <@&934663182356725770>\nﾠPermissão de enviar imagens no <#802594127828615242>\nﾠAcesso a Sala VIP na seção geral")
                                .setThumbnail(membro.guild.iconURL({ format: "png", dynamic: true }))
                                .setColor("#67f1d6")
                                .addFields(
                                    {
                                        name: "<:Caf_GreenArrowRight:954802049223098450> Quais são os requisitos?",
                                        value: "2500+ mensagens ou 60+ horas."
                                    },
                                    {
                                        name: "<:Caf_GreenArrowRight:954802049223098450> Como as mensagens são contadas?",
                                        value: "Sempre que você digitar algo no chat-geral, o bot contabilizará as mensagens."
                                    },
                                    {
                                        name: "<:Caf_GreenArrowRight:954802049223098450> Como as horas são contabilizadas?",
                                        value: `Sempre que você estiver totalmente desmutado em uma call geral ou de eventos, suas horas serão contabilizadas. Para mais informações de call, utilize o comando \`${process.env.PREFIX}tempo\`.`
                                    })
                                .setFooter({ text: membro.guild.name })

                            i.reply({ fetchReply: true, ephemeral: true, embeds: [howItWorks] })
                            break;
                    }
                })
                setTimeout(() => {
                    message.delete()
                }, 60000)
            })
        }
    }
}