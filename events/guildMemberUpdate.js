const Discord = require("discord.js");

module.exports = {
    name: "guildMemberUpdate",
    once: false,

    execute(client, oldMember, newMember) {

        if (!["802594126994210857"].includes(newMember.guild.id)) return false;

        // Log de impulso  
        let boosterPerks = ["873655667196571650", "810945594838745150"]

        if (!oldMember.premiumSince && newMember.premiumSince) {
            try {
                newMember.roles.add(boosterPerks, "Vantagens de booster.")
            } catch (error) {
                console.log(error)
            }

            const boostLogger = new Discord.MessageEmbed()
                .setAuthor({ name: newMember.user.username, iconURL: "https://cdn.discordapp.com/emojis/950479443258929182.gif" })
                .setDescription("<:Caf_CuteWave:950520080612069417> Obrigada por impulsionar nosso servidor!\nCaso tenha alguma dúvida sobre suas vantagens, procure alguém da equipe!")
                .setColor("#f47fff")
                .setThumbnail(newMember.user.displayAvatarURL({ format: "png", dynamic: true }))
                .addFields(
                    {
                        name: "<:Caf_IconRole:941831591502692403> Cargos atribuídos:",
                        value: "<@&873655667196571650> <@&810945594838745150>"
                    }
                )
                .setFooter({ text: `Sistema de boosters • ${newMember.guild.name}` });

            return client.channels.cache.get("802594127828615242").send({ content: `<@${newMember.user.id}>`, embeds: [boostLogger] }).then(message => {
                message.react("<a:Caf_IconBoost:950508373453987920>")
            })
        } else if (!newMember.premiumSince && oldMember.premiumSince) {
            // Log de remoção de impulso
            try {
                newMember.roles.remove(boosterPerks, "Usuário não-booster.")
            } catch (error) {
                console.log(error)
            }

            const boostRemoving = new Discord.MessageEmbed()
                .setAuthor({ name: oldMember.user.username, iconURL: "https://cdn.discordapp.com/emojis/950479443258929182.gif" })
                .setDescription("<:Caf_CuteSad:952722351076802581> Ví que você removeu seu boost do servidor e com isso acabei removendo suas vantagens, mas agradeço pelo tempo que você foi booster.")
                .setColor("#f47fff")
                .setThumbnail(oldMember.user.displayAvatarURL({ format: "png", dynamic: true }))
                .addFields(
                    {
                        name: "<:Caf_IconRole:941831591502692403> Cargos removidos:",
                        value: "<@&873655667196571650> <@&810945594838745150>"
                    }
                )
                .setFooter({ text: `Sistema de boosters • ${oldMember.guild.name}` });

            return client.channels.cache.get("802594127828615242").send({ content: `<@${newMember.user.id}>`, embeds: [boostRemoving] })
        }
    }
}