const Discord = require("discord.js");

module.exports = {
    name: "messageDelete",
    once: false,

    async execute(client, message) {

        if (!["802594126994210857"].includes(message.guild.id)) return false;
        if (message.content.startsWith(process.env.PREFIX)) return false;
        if (message.author.bot) return;

        // Comando Snipe
        client.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author,
            image: message.attachments ? message.attachments.map((a) => a.name).join(`\n`) : null,
            timestamp: message.createdTimestamp
        });

        // Logando no audit log
        const auditLog = await message.guild.fetchAuditLogs({
            limit: 1,
            type: "MESSAGE_DELETE",
        });

        const deletionLog = auditLog.entries.first();
        const { executor, target } = deletionLog;

        // Log de mensagem apagada
        const mensagem = `<:Caf_IconDeleteMessage:965793938655027220> Mensagem excluída em: ${message.channel}`

        const deletedLogger = new Discord.MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })
            .setDescription(target.id !== message.author.id ? mensagem : `${mensagem}\n<:Caf_IconShield:910585283882405908> Moderador: ${executor}`)
            .setColor("#f04a47")
            .addFields(
                {
                    name: "<:Caf_IconReason:965803781763760228> Mensagem:",
                    value: `${message.content ? message.content : "Nenhuma mensagem encontrada."}`.slice(0, 1024)
                }
            )
            .setFooter({ text: `ID: ${message.author.id}` })
            .setTimestamp(message.createdTimestamp)

        if (message.attachments.size >= 1) {
            message.attachments.forEach(function(attachment) {

                const anexos = new Discord.MessageAttachment(`${attachment.proxyURL}`)

                client.channels.cache.get("870768572354428938").send({ files: [anexos] })
            })
            
            
            deletedLogger.addFields(
                {
                    name: "<:Caf_IconLink:950524772184358954> Anexos:",
                    value: `${message.attachments.map((a) => a.name).join("\n")}`
                }
            )
        }

        if (message.stickers.size >= 1) {
            deletedLogger.addFields(
                {
                    name: "<:Caf_IconRichPresence:910585230061096960> Figurinhas:",
                    value: `[${message.stickers.map((a) => a.name).join("\n")}](${message.stickers.map((a) => a.url).join("\n")})`
                }
            )
        }

        client.channels.cache.get("870768572354428938").send({ embeds: [deletedLogger] })
    }
}