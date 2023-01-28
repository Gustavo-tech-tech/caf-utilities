const Discord = require("discord.js");

module.exports = {
    name: "editsnipe",
    description: "Exibe a última mensagem editada.",

    execute(client, message, args) {

        message.delete()

        let cargo = message.member.roles.cache
        let cargos_bypass = [
            "935035986654670858",
            "803473482054238220",
            "904032675311013948",
            "904032668042285147",
            "904031410338283652"
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

        const msg = client.editsnipes.get(channel.id);

        const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;

        if (!msg) {
            const error = new Discord.MessageEmbed()
                .setDescription("<:Caf_IconTickRed:966538465506373702> **Nenhuma mensagem foi editada recentemente.**")
                .setColor("#f04a47")
                .setFooter({ text: `Requisitado por ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            return message.channel.send({ embeds: [error] }).then(message => {
                setTimeout(() => message.delete(), 10000)
            })
        } else if (regex.exec(msg.oldContent) || regex.exec(msg.newContent)) {
            const error = new Discord.MessageEmbed()
                .setDescription("<:Caf_IconTickRed:966538465506373702> **A mensagem possui um convite de servidor, portanto, não será mostrado.**")
                .setColor("#f04a47")
                .setFooter({ text: `Requisitado por ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })
            return message.channel.send({ embeds: [error] }).then(message => {
                setTimeout(() => message.delete(), 10000)
            })
        } else if (msg.oldContent === msg.newContent) {

        }
        if (msg.oldContent == "" && msg.newContent) {
            msg.oldContent = "Nenhuma mensagem encontrada."
        } else {
            const editSnipe = new Discord.MessageEmbed()
                .setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL({ format: "png", dynamic: true }) })
                .setColor("RANDOM")
                .addFields(
                    {
                        name: "<:Caf_IconMessage:950255928463220756> Antigo:",
                        value: msg.oldContent
                    },
                    {
                        name: "<:Caf_IconClock:950255849538994226> Novo:",
                        value: msg.newContent
                    }
                )
                .setFooter({ text: `ID: ${msg.author.id}` })
                .setTimestamp(msg.timestamp);

            if (msg.image) editSnipe.addFields(
                {
                    name: "<:Caf_IconLink:950524772184358954> Anexos:",
                    value: msg.image
                }
            )

            message.channel.send({ embeds: [editSnipe] }).then(message => {
                setTimeout(() => message.delete(), 20000)
            })
        }
    }
}