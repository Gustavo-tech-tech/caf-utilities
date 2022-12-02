// const Discord = require("discord.js");
// const ms = require("milliseconds");
// const { Database } = require("quickmongo");
// const db = new Database(process.env.DATABASE);

// db.connect();

// module.exports = {
//     name: "supporter",
//     description: "Veja quanto tempo você está usando a URL do servidor.",
//     aliases: ["apoiador", "support"],

//     async execute(client, message, args) {

//         message.delete()

//         let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

//         if (usuario.user.bot) {
//             const error = new Discord.MessageEmbed()
//                 .setDescription("<:Caf_IconTickRed:966538465506373702> **Esse comando não foi feito para ser usado com bots.**")
//                 .setColor("#f04a47")
//                 .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

//             return message.channel.send({ embeds: [error] }).then(message => {
//                 setTimeout(() => message.delete(), 10000);
//             })
//         }

//         let tempo = await db.get(`tempoStatus_${usuario.id}`)
//         if (tempo === null) {
//         } else {
//             tempo = tempo.toString().replace("-", "")
//         }

//         if (tempo === 0 || tempo === null) {
//             tempo = "0 segundos"
//         } else {
//             let totalSeconds = (ms.seconds(tempo) / 1000);
//             let hora = Math.floor(totalSeconds / 3600);
//             let minuto = Math.floor(totalSeconds % 3600 / 60);
//             let segundo = Math.floor(totalSeconds % 3600 % 60);

//             let horas = hora > 0 ? hora + (hora == 1 ? " hora" : " horas") + (minuto > 0 || segundo > 0 ? ", " : "") : "";
//             let minutos = minuto > 0 ? minuto + (minuto == 1 ? " minuto" : " minutos") + (segundo > 0 ? " e " : "") : "";
//             let segundos = segundo > 0 ? segundo + (segundo == 1 ? " segundo" : " segundos") : "";
//             tempo = horas + minutos + segundos;
//         }

//         if (usuario?.presence?.activities[0]?.state?.includes("discord.gg/amizade")) {
//             const tempo_status = await db.get(`status_${usuario.id}`);
//             const start_status = new Date().getTime();
//             const diff_status = Math.abs(tempo_status - start_status);
//             const tempo_acumulado = Math.ceil(diff_status / 1000);

//             let tempo_status_total = (ms.seconds(tempo_acumulado) / 1000);
//             let hora = Math.floor(tempo_status_total / 3600);
//             let minuto = Math.floor(tempo_status_total % 3600 / 60);
//             let segundo = Math.floor(tempo_status_total % 3600 % 60);

//             let horas = hora > 0 ? hora + (hora == 1 ? " hora" : " horas") + (minuto > 0 || segundo > 0 ? ", " : "") : "";
//             let minutos = minuto > 0 ? minuto + (minuto == 1 ? " minuto" : " minutos") + (segundo > 0 ? " e " : "") : "";
//             let segundos = segundo > 0 ? segundo + (segundo == 1 ? " segundo" : " segundos") : "";
//             tempo_status_total = horas + minutos + segundos;

//             const supporter = new Discord.MessageEmbed()
//                 .setAuthor({ name: `Sistema de apoiador - ${usuario.guild.name}`, iconURL: "https://cdn.discordapp.com/emojis/785628106190618676.gif" })
//                 .setDescription(`ﾠ<:Caf_IconUser:952043105480224848> Usuário: ${usuario.user}`)
//                 .setColor("#8f38f9")
//                 .setThumbnail(usuario.user.displayAvatarURL({ format: "png", dynamic: true }))
//                 .addFields(
//                     {
//                         name: "<:Caf_IconClock:950255849538994226> Tempo:",
//                         value: `Tempo total: **${tempo}**\nUsando a URL há: **${tempo_status_total}**`
//                     },
//                     {
//                         name: "<:Caf_IconAddInvite:913910320467181619> Status atual:",
//                         value: `\`${usuario?.presence?.activities[0]?.state}\``
//                     })
//                 .setFooter({ text: usuario.guild.name, iconURL: usuario.guild.iconURL({ format: "png", dynamic: true }) })

//             message.channel.send({ embeds: [supporter] }).then(message => {
//                 setTimeout(() => message.delete(), 60000);
//             })
//         } else {
//             const supporter = new Discord.MessageEmbed()
//                 .setAuthor({ name: `Sistema de apoiador - ${usuario.guild.name}`, iconURL: "https://cdn.discordapp.com/emojis/785628106190618676.gif" })
//                 .setDescription(`ﾠ<:Caf_IconUser:952043105480224848> Usuário: ${usuario.user}`)
//                 .setColor("#8f38f9")
//                 .setThumbnail(usuario.user.displayAvatarURL({ format: "png", dynamic: true }))
//                 .addFields(
//                     {
//                         name: "<:Caf_IconClock:950255849538994226> Tempo:",
//                         value: `Tempo total: **${tempo}**`
//                     })
//                 .setFooter({ text: usuario.guild.name, iconURL: usuario.guild.iconURL({ format: "png", dynamic: true }) })

//             message.channel.send({ embeds: [supporter] }).then(message => {
//                 setTimeout(() => message.delete(), 60000)
//             })
//         }
//     }
// }