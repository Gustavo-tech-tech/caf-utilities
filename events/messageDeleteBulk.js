const Discord = require("discord.js");

module.exports = {
    name: "messageDeleteBulk",
    once: false,

    async execute(client, messages) {

        // Log de mensagens em massa apagadas
        const length = messages.size;
        const channel = messages.first().channel.name;

        const bulkDeleteLogger = new Discord.MessageEmbed()
            .setTitle(`${length} mensagens excluídas em #${channel}`)
            .setDescription(messages
                .sort((a, b) => a.createdTimestamp - b.createdTimestamp)
                .map(message => `[${message.author ? message.author.tag : "Desconhecido"}]: ${message.content ? message.content : "**Nenhuma mensagem encontrada.**"}`.toString()).join(`\n`))
            .setColor("#f04a47")
            .setFooter({ text: `${length} mais recentes` })
            .setTimestamp();

        await client.channels.cache.get("870768572354428938").send({ embeds: [bulkDeleteLogger] })
    }
}