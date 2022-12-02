const Discord = require("discord.js");

module.exports = {
    name: "vote",
    description: "Obtenha os links de votos ou bumps do servidor.",
    aliases: ["votar"],

    execute(client, message, args) {

        message.delete()

        const vote = {
            author: {
                name: `Vote pelo ${message.guild.name}`,
                icon_url: message.guild.iconURL({ format: "png", dynamic: true })
            },
            description: "Todos os dias membros de vários lugares do Brasil entram no servidor por meio dos votos e bumps. Seja um desses também e nos ajude a crescer ainda mais!\n\n` 1 ` [discordhome.com](https://discordhome.com/server/amizade#vote)\n` 2 ` [top.gg](https://top.gg/servers/802594126994210857/vote)\n` 3 ` [discords.com](https://discords.com/servers/802594126994210857/upvote)\n` 4 ` [discordservers.com](https://discordservers.com/bump/802594126994210857)\n` 5 ` [discord.me](https://discord.me/dashboard)\n` 6 ` [disboard.org](https://disboard.org/pt-pt/server/802594126994210857): `/bump`",
            color: "#ff69b4",
            footer: {
                text: `Requisitado por: ${message.author.username}`,
                icon_url: message.author.displayAvatarURL({ format: "png", dynamic: true })
            }
        }

        message.channel.send({ embeds: [vote] }).then(message => {
            setTimeout(() => message.delete(), 120000)
        })
    }
}