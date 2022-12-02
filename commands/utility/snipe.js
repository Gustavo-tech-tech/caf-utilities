const Discord = require("discord.js");

module.exports = {
    name: "snipe",
    description: "Exibe a última mensagem apagada.",

    execute(client, message, args) {

        message.delete()

        let cargo = message.member.roles.cache
        let cargos_bypass = [
            "935035986654670858",
            "803473482054238220"
        ]

        if (!message.member.permissions.has("MANAGE_MESSAGES") && !cargos_bypass.some((id) => cargo.has(id))) {
            const error = new Discord.MessageEmbed()
                .setDescription("<:Caf_IconTickRed:966538465506373702> **Você não tem permissão para usar esse comando.**")
                .setColor("#f04a47")
                .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            return message.channel.send({ embeds: [error] }).then(message => {
                setTimeout(() => message.delete(), 10000)
            })
        }

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;

        const msg = client.snipes.get(channel.id);

        const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;

        if (!msg) {
            const error = new Discord.MessageEmbed()
                .setDescription("<:Caf_IconTickRed:966538465506373702> **Nenhuma mensagem foi excluída recentemente.**")
                .setColor("#f04a47")
                .setFooter({ text: `Requisitado por ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            return message.channel.send({ embeds: [error] }).then(message => {
                setTimeout(() => message.delete(), 10000)
            })
        } else if (regex.exec(msg.content)) {
            const error = new Discord.MessageEmbed()
                .setDescription("<:Caf_IconTickRed:966538465506373702> **A mensagem possui um convite de servidor, portanto, não será mostrado.**")
                .setColor("#f04a47")
                .setFooter({ text: `Requisitado por ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })
            return message.channel.send({ embeds: [error] }).then(message => {
                setTimeout(() => message.delete(), 10000)
            })
        } else {
            const snipe = new Discord.MessageEmbed()
                .setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL({ format: "png", dynamic: true }) })
                .setDescription(msg.content)
                .setColor("#f0cc76")
                .setFooter({ text: `ID: ${msg.author.id}` })
                .setTimestamp(msg.timestamp);

            if (msg.image) snipe.addFields(
                {
                    name: "<:Caf_IconLink:950524772184358954> Anexos:",
                    value: msg.image
                }
            )

            message.channel.send({ embeds: [snipe] }).then(message => {
                setTimeout(() => message.delete(), 20000)
            })
        }
    }
}