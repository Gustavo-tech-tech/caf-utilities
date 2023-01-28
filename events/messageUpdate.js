const Discord = require("discord.js");

module.exports = {
    name: "messageUpdate",
    once: false,

    execute(client, oldMessage, newMessage) {

        if (!["802594126994210857"].includes(newMessage.guild.id)) return false;

        // Comando de EditSnipe
        if (oldMessage.author.bot) return;
        client.editsnipes.set((oldMessage, newMessage).channel.id, {
            oldContent: oldMessage.content,
            newContent: newMessage.content,
            author: (oldMessage, newMessage).author,
            image: (oldMessage, newMessage).attachments ? (oldMessage, newMessage).attachments.map((a) => a.name).join("\n") : null,
            timestamp: (oldMessage, newMessage).createdTimestamp
        })

        // Log de mensagem editada
        if (oldMessage.content === newMessage.content) return;
        if (oldMessage.content == "" && newMessage.content) oldMessage.content = "Nenhuma mensagem encontrada."

        const count = 1000;

        const original = oldMessage.content.slice(0, count) + (oldMessage.content.length > count ? " ..." : "");
        const edited = newMessage.content.slice(0, count) + (newMessage.content.length > count ? " ..." : "");

        const editLogger = new Discord.MessageEmbed()
            .setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL({ format: "png", dynamic: true }) })
            .setDescription(`<:Caf_IconUpdateMessage:965798870242168842> Mensagem editada em: ${newMessage.channel}`)
            .setColor("#337fd5")
            .addFields(
                {
                    name: "<:Caf_IconReason:965803781763760228> Antiga:",
                    value: original
                },
                {
                    name: "<:Caf_IconReason:965803781763760228> Nova:",
                    value: edited
                }
            )
            .setFooter({ text: `ID: ${newMessage.author.id}` })
            .setTimestamp((oldMessage, newMessage).createdTimestamp);

        if (newMessage.attachments.size > 0) {
            editLogger.addFields(
                {
                    name: "<:Caf_IconLink:950524772184358954> Anexos:",
                    value: `${newMessage.attachments.map((a) => a.name).join("\n")}`
                }
            )
        }

        client.channels.cache.get("870768572354428938").send({ embeds: [editLogger] })
    }
}