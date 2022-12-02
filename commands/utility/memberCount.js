const Discord = require("discord.js");
const commaNumber = require("comma-number");

module.exports = {
    name: "memberCount",
    description: "Mostra a quantidade de membros no servidor e em call.",
    aliases: ["contador", "counter"],

    execute(client, message, args) {

        message.delete()

        const membros = message.guild.memberCount;
        const voiceChannels = message.guild.channels.cache.filter(channel => channel.type === "GUILD_VOICE");
        let count = 0;

        for (var [id, voiceChannel] of voiceChannels) {
            count += voiceChannel.members.size
        }

        const contador = new Discord.MessageEmbed()
            .setAuthor({ name: `Contador - ${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setColor("#ff69b4")
            .addFields(
                {
                    name: "<:Caf_IconCommunityPublic:966543910472134667> Contagem geral:",
                    value: `ﾠ<:Caf_IconMemberList:911485073868587028> Membros: **${commaNumber(membros)}**\nﾠ<:Caf_IconVoiceChannel:950256027717226496> Total em call: **${commaNumber(count)}**`
                }
            )
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

        message.channel.send({ embeds: [contador] }).then(message => {
            setTimeout(() => message.delete(), 30000)
        })
    }
}