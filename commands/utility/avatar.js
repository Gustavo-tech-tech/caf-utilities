const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Exibe o avatar do usuário mencionado.",
  aliases: ["av", "perfil"],

  execute(client, message, args) {

    message.delete()

    let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    if (membro.roles.cache.has("802594127363440651") || membro.roles.cache.has("873701909700169789")) {
      const admin = new Discord.MessageEmbed()
        .setAuthor({ name: "Administrador Star's Café", iconURL: "https://cdn.discordapp.com/emojis/849880787704872960.gif?size=96&quality=lossless" })
        .setDescription(`**Avatar de: ${membro.user.username}**`)
        .setColor("#f0cc76")
        .setImage(membro.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
        .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

      return message.channel.send({ embeds: [admin] }).then(message => {
        setTimeout(() => message.delete(), 20000)
      })
    }

    if (membro.roles.cache.has("904032675311013948")) {
      const supremo = new Discord.MessageEmbed()
        .setAuthor({ name: "VIP Café Supremo", iconURL: "https://cdn.discordapp.com/emojis/861639401649340436.gif?size=96&quality=lossless" })
        .setDescription(`**Avatar de: ${membro.user.username}**`)
        .setColor("#000001")
        .setImage(membro.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
        .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

      return message.channel.send({ embeds: [supremo] }).then(message => {
        setTimeout(() => message.delete(), 20000)
      })
    }

    if (membro.roles.cache.has("904032668042285147")) {
      const chocolate = new Discord.MessageEmbed()
        .setAuthor({ name: "VIP Café com Chocolate", iconURL: "https://cdn.discordapp.com/emojis/773094191622127627.gif?size=96&quality=lossless" })
        .setDescription(`**Avatar de: ${membro.user.username}**`)
        .setColor("#53ffff")
        .setImage(membro.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
        .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

      return message.channel.send({ embeds: [chocolate] }).then(message => {
        setTimeout(() => message.delete(), 20000)
      })
    }

    if (membro.roles.cache.has("904031410338283652")) {
      const leite = new Discord.MessageEmbed()
        .setAuthor({ name: "VIP Café com Leite", iconURL: "https://cdn.discordapp.com/emojis/739420521833168937.gif?size=96&quality=lossless" })
        .setDescription(`**Avatar de: ${membro.user.username}**`)
        .setColor("#ff4e4e")
        .setImage(membro.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
        .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

      return message.channel.send({ embeds: [leite] }).then(message => {
        setTimeout(() => message.delete(), 20000)
      })
    }

    if (membro.roles.cache.has("803473482054238220")) {
      const booster = new Discord.MessageEmbed()
        .setAuthor({ name: "Café Booster", iconURL: "https://cdn.discordapp.com/emojis/774025552637198366.gif?size=96&quality=lossless" })
        .setDescription(`**Avatar de: ${membro.user.username}**`)
        .setColor("#f47fff")
        .setImage(membro.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
        .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

      return message.channel.send({ embeds: [booster] }).then(message => {
        setTimeout(() => message.delete(), 20000)
      })
    }

    if (membro.roles.cache.has("935035986654670858")) {
      const staff = new Discord.MessageEmbed()
        .setAuthor({ name: "Café Staff", iconURL: "https://cdn.discordapp.com/emojis/773088887631380501.png?size=96&quality=lossless" })
        .setDescription(`**Avatar de: ${membro.user.username}**`)
        .setColor("#739dff")
        .setImage(membro.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
        .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

      return message.channel.send({ embeds: [staff] }).then(message => {
        setTimeout(() => message.delete(), 20000)
      })
    }

    if (membro.roles.cache.has("934663182356725770")) {
      const ativo = new Discord.MessageEmbed()
        .setAuthor({ name: "Aesthetic Coffee - Membro Ativo", iconURL: "https://cdn.discordapp.com/emojis/828831224583159818.gif" })
        .setDescription(`**Avatar de: ${membro.user.username}**`)
        .setColor("#67f1d6")
        .setImage(membro.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
        .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

      return message.channel.send({ embeds: [ativo] }).then(message => {
        setTimeout(() => message.delete(), 20000)
      })
    }

    const avatar = new Discord.MessageEmbed()
        .setAuthor({ name: "Membro Star's Café", iconURL: "https://cdn.discordapp.com/emojis/899185437820735509.gif?size=96&quality=lossless" })
        .setDescription(`**Avatar de: ${membro.user.username}**`)
        .setColor("#ffcc51")
        .setImage(membro.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
        .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

      return message.channel.send({ embeds: [avatar] }).then(message => {
        setTimeout(() => message.delete(), 20000)
      })
  }
}