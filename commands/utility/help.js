const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Exibe a lista de comandos.",
    aliases: ["ajuda"],

    execute(client, message, args) {

        message.delete()

        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId("primeiro_botao")
                    .setStyle("SECONDARY")
                    .setEmoji("<:Caf_PinkNumberOne:953361023644094494>")
                    .setDisabled(false),
                new Discord.MessageButton()
                    .setCustomId("segundo_botao")
                    .setStyle("SECONDARY")
                    .setEmoji("<:Caf_PinkNumberTwo:953360676586389564>")
                    .setDisabled(false),
                new Discord.MessageButton()
                    .setCustomId("terceiro_botao")
                    .setStyle("SECONDARY")
                    .setEmoji("<:Caf_PinkNumberThree:953360748069920869>")
                    .setDisabled(false)
            )

        const row1 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId("menu_botao")
                    .setStyle("SECONDARY")
                    .setLabel("Voltar")
                    .setDisabled(false)
            )

        const help = new Discord.MessageEmbed()
            .setAuthor({ name: `${message.guild.me.displayName} - Lista de comandos`, iconURL: client.user.displayAvatarURL({ format: "png", dynamic: true }) })
            .setDescription("**Seja bem-vindo(a) a minha lista de comandos.**")
            .setColor("#ff69b4")
            .setThumbnail("https://cdn.discordapp.com/attachments/971560640999206974/972975510365814814/icons-sobre.png")
            .addFields(
                {
                    name: "<:Caf_IconLink:950524772184358954> Links importantes:",
                    value: "<:Caf_PinkArrowRight:954799263966179359> [Vote pela comunidade no top.gg](https://top.gg/servers/802594126994210857/vote)"
                },
                {
                    name: "<:Caf_IconSearch:910590982297378836> Opções:",
                    value: "<:Caf_PinkNumberOne:953361023644094494> Utilidades\n<:Caf_PinkNumberTwo:953360676586389564> Atividade e afins\n<:Caf_PinkNumberThree:953360748069920869> Gerenciamento"
                })
            .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

        message.channel.send({ embeds: [help], components: [row] }).then(msg => {
            const iFilter = i => i.user.id === message.author.id;

            const collector = msg.createMessageComponentCollector({ filter: iFilter, time: 10 * 60000 });

            collector.on("collect", async (i) => {
                i.deferUpdate();
                switch (i.customId) {
                    case "primeiro_botao":
                        const primeira_pagina = new Discord.MessageEmbed()
                            .setAuthor({ name: `${msg.guild.me.displayName} - Utilidades`, iconURL: client.user.displayAvatarURL({ format: "png", dynamic: true }) })
                            .setColor("#ff69b4")
                            .setThumbnail("https://cdn.discordapp.com/attachments/971560640999206974/972975511141769286/icons-pasta.png")
                            .addFields(
                                {
                                    name: "<:Caf_IconInfo:952090770075189258> Comandos principais:",
                                    value: `<:Caf_PinkArrowRight:954799263966179359> ${process.env.PREFIX}votar - Vote pelo servidor\n<:Caf_PinkArrowRight:954799263966179359> ${process.env.PREFIX}contador - Veja a contagem de membros do servidor\n<:Caf_PinkArrowRight:954799263966179359> ${process.env.PREFIX}editsnipe - Veja a última mensagem editada\n<:Caf_PinkArrowRight:954799263966179359> ${process.env.PREFIX}snipe - Veja a última mensagem apagada`
                                },
                                {
                                    name: "<:Caf_IconRichPresence:910585230061096960> Comandos:",
                                    value: `<:Caf_PinkArrowRight:954799263966179359> ${process.env.PREFIX}avatar - Veja seu avatar mais ampliado\n<:Caf_PinkArrowRight:954799263966179359> ${process.env.PREFIX}banner - Veja seu banner mais ampliado\n<:Caf_PinkArrowRight:954799263966179359> ${process.env.PREFIX}div - Veja sua quantidade de convites\n<:Caf_PinkArrowRight:954799263966179359> ${process.env.PREFIX}ping - Veja minha latência\n<:Caf_PinkArrowRight:954799263966179359> ${process.env.PREFIX}uptime - Veja meu tempo online`
                                })

                        msg.edit({ embeds: [primeira_pagina], components: [row1] })
                        break;

                    case "segundo_botao":
                        const segunda_pagina = new Discord.MessageEmbed()
                            .setAuthor({ name: `${msg.guild.me.displayName} - Atividade e afins [Novo]`, iconURL: client.user.displayAvatarURL({ format: "png", dynamic: true }) })
                            .setColor("#ff69b4")
                            .setThumbnail("https://cdn.discordapp.com/attachments/971560640999206974/972975511502475334/icons-blitz.png")
                            .addFields(
                                {
                                    name: "<:Caf_IconRichPresence:910585230061096960> Comandos:",
                                    value: `<:Caf_PinkArrowRight:954799263966179359> ${process.env.PREFIX}ativo - Veja sua atividade no servidor esse mês\n<:Caf_PinkArrowRight:954799263966179359> ${process.env.PREFIX}rank tempo - Veja os membros com mais tempo em call\n<:Caf_PinkArrowRight:954799263966179359> ${process.env.PREFIX}rank mensagens - Veja os membros com mais mensagens\n<:Caf_PinkArrowRight:954799263966179359> ${process.env.PREFIX}tempo - Veja suas informações de call`
                                })

                        msg.edit({ embeds: [segunda_pagina], components: [row1] })
                        break;

                    case "terceiro_botao":
                        const terceira_pagina = new Discord.MessageEmbed()
                            .setAuthor({ name: `${msg.guild.me.displayName} - Gerenciamento`, iconURL: client.user.displayAvatarURL({ format: "png", dynamic: true }) })
                            .setColor("#ff69b4")
                            .setThumbnail("https://cdn.discordapp.com/attachments/971560640999206974/972975510722314250/icons-configuracoes.png")
                            .addFields(
                                {
                                    name: "<:Caf_IconRichPresence:910585230061096960> Comandos:",
                                    value: `<:Caf_PinkArrowRight:954799263966179359> ${process.env.PREFIX}convite - Obtenha meu link de convite\n<:Caf_PinkArrowRight:954799263966179359> ${process.env.PREFIX}eval - Avalia um código\n<:Caf_PinkArrowRight:954799263966179359> ${process.env.PREFIX}rmsg - Reseta as mensagens dos usuários\n<:Caf_PinkArrowRight:954799263966179359> ${process.env.PREFIX}rtempo - Reseta o tempo em call de todos os usuários`
                                })

                        msg.edit({ embeds: [terceira_pagina], components: [row1] })
                        break;

                    case "menu_botao":
                        msg.edit({ embeds: [help], components: [row] })
                        break;
                }
            })
            setTimeout(() => {
                msg.delete()
            }, 60000)
        })
    }
}