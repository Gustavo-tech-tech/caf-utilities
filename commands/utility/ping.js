const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "Mostra a latência do bot.",

  execute(client, message, args) {

    message.delete()

    message.channel.send({ content: "Pinging..." }).then(message => {

      const ping = new Discord.MessageEmbed()
        .setDescription(`Pong! :ping_pong: \`${Date.now() - message.createdTimestamp} ms\``)
        .setColor("#ff69b4");

      message.edit({ content: " ", embeds: [ping] }).then(message => {
        setTimeout(() => message.delete(), 10000)
      })
    })
  }
}