const Discord = require("discord.js");
const humanizeDuration = require("humanize-duration");
const moment = require("moment");

moment.locale("pt-br");

module.exports = {
    name: "guildMemberUpdate",
    once: false,

    async execute(client, oldMember, newMember) {

        if (!["802594126994210857"].includes(newMember.guild.id)) return false;

        // Log de impulso  
        let boosterPerks = ["873655667196571650", "810945594838745150"]

        if (!oldMember.premiumSince && newMember.premiumSince) {
            try {
                newMember.roles.add(boosterPerks, "Vantagens de booster.")
            } catch (error) {
                console.log(error)
            }

            const boosterLog = new Discord.MessageEmbed()
            .setAuthor({ name: newMember.user.username, iconURL: "https://cdn.discordapp.com/emojis/774025552637198366.gif?size=96&quality=lossless" })
            .setDescription(`<:Caf_IconAddMember:916141737485942824> Boost adicionado por: <@${newMember.user.id}>`)
            .setColor("#f47fff")
            .setThumbnail(newMember.user.displayAvatarURL({ format: "png", dynamic: true }))
            .addFields(
                {
                    name: "<:Caf_IconUser:952043105480224848> Informações de usuário:",
                    value: `Tempo de estadia: **${humanizeDuration(newMember.joinedAt - Date.now(), { largest: 3, conjunction: " e ", serialComma: false, round: true, language: "pt" })}**\nMembro ativo? **${newMember.roles.cache.get("934663182356725770") ? "Sim" : "Não"}**`
                },
                {
                    name: "<:Caf_IconServerInsights:952090848550604800> Estatísticas do servidor:",
                        value: `Contagem de boosts: **${newMember.guild.premiumSubscriptionCount}**\nQuantidade de boosters: **${newMember.guild.roles.cache.get("803473482054238220").members.size}** boosters`
                },
                {
                    name: "<:Caf_IconRole:941831591502692403> Cargos atribuídos:",
                    value: "<@&803473482054238220> <@&873655667196571650> <@&810945594838745150>"
                }
            )

            client.channels.cache.get("802594127828615239").send({ embeds: [boosterLog] })

            const boostMsg = new Discord.MessageEmbed()
                .setAuthor({ name: newMember.user.username, iconURL: "https://cdn.discordapp.com/emojis/950479443258929182.gif" })
                .setDescription("<:p_catgirl:1059197816909598840> Obrigada por impulsionar nosso servidor!\nCaso tenha alguma dúvida sobre suas vantagens, procure alguém da equipe!")
                .setColor("#f47fff")
                .setThumbnail(newMember.user.displayAvatarURL({ format: "png", dynamic: true }))
                .addFields(
                    {
                        name: "<:Caf_IconRole:941831591502692403> Cargos atribuídos:",
                        value: "<@&873655667196571650> <@&810945594838745150>"
                    }
                )
                .setFooter({ text: `Sistema de boosters • ${newMember.guild.name}` });

            client.channels.cache.get("802594127828615242").send({ content: `<@${newMember.user.id}>`, embeds: [boostMsg] }).then(message => {
                message.react("<a:Caf_IconBoost:950508373453987920>")
            })
        } else if (!newMember.premiumSince && oldMember.premiumSince) {
            // Log de remoção de impulso
            try {
                newMember.roles.remove(boosterPerks, "Usuário não-booster.")
            } catch (error) {
                console.log(error)
            }

            const guild = client.guilds.cache.get("802594126994210857")
            const membros = await guild.members.fetch(oldMember.user.id)

            const boostRemoving = new Discord.MessageEmbed()
                .setAuthor({ name: oldMember.user.username, iconURL: "https://cdn.discordapp.com/emojis/950479443258929182.gif" })
                .setDescription(`<:Caf_IconRemoveMember:916141779009560607> Boost removido por: <@${oldMember.user.id}>`)
                .setColor("#f47fff")
                .setThumbnail(oldMember.user.displayAvatarURL({ format: "png", dynamic: true }))
                .addFields(
                    {
                        name: "<:Caf_IconClipboard:910585257953218600> Informações de impulso:",
                        value: `Impulsionando desde:\nﾠ**${moment(membros.premiumSince).format("LLL")}**\nﾠ**${humanizeDuration(oldMember.premiumSince - Date.now(), { largest: 4, conjunction: " e ", serialComma: false, round: true, language: "pt" })}**\nEm **3** dias, o servidor perderá os boosts completamente.`
                    },
                    {
                        name: "<:Caf_IconServerInsights:952090848550604800> Estatísticas do servidor:",
                        value: `Contagem de boosts: **${oldMember.guild.premiumSubscriptionCount}**\nQuantidade de boosters: **${oldMember.guild.roles.cache.get("803473482054238220").members.size}** boosters\nPremium tier: Nível **${oldMember.guild.premiumTier.replace("TIER_", "")}** :tada:`
                    },
                    {
                        name: "<:Caf_IconRole:941831591502692403> Cargos removidos:",
                        value: "<@&803473482054238220> <@&873655667196571650> <@&810945594838745150>"
                    }
                )
                .setFooter({ text: `ID: ${oldMember.user.id}` })
                .setTimestamp();
                
            return client.channels.cache.get("802594127828615239").send({ content: `<@${newMember.user.id}>`, embeds: [boostRemoving] })
        }
    }
}