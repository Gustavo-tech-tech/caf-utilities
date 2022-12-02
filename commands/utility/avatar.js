const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Exibe o avatar do usuário mencionado.",
  aliases: ["av"],

  execute(client, message, args) {

    message.delete()

    let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const avatar = new Discord.MessageEmbed()
      .setAuthor({ name: `${message.guild.me.displayName} User`, iconURL: "https://cdn.discordapp.com/emojis/899185437820735509.gif" })
      .setDescription(`**Avatar de ${membro.user.username}**`)
      .setColor("#f0cc76")
      .setImage(membro.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
      .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

    return message.channel.send({ embeds: [avatar] }).then(message => {
      setTimeout(() => message.delete(), 20000)
    })
  }
}