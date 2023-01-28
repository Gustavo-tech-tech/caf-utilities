const Discord = require("discord.js");

module.exports = {
    name: "milk",
    description: "Oferece um copo de leite para o usuário.",
    aliases: ["leite"],

    execute(client, message, args) {

        message.delete()

        let cargo = message.member.roles.cache
        let cargos_bypass = [
            "904032675311013948",
            "904032668042285147",
            "904031410338283652",
            "935035986654670858"
        ]

        if (!cargos_bypass.some((id) => cargo.has(id))) {
            const error = new Discord.MessageEmbed()
                .setDescription("<:Caf_IconTickRed:966538465506373702> **Apenas vips podem utilizar esse comando.**")
                .setColor("#f04a47")
                .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            return message.channel.send({ embeds: [error] }).then(message => {
                setTimeout(() => message.delete(), 10000)
            })
        }

        const milk = [
            "https://64.media.tumblr.com/8a7b9568c966ed6e0f9465fe2e86ca48/tumblr_phphj3uHc11tdnbbbo1_540.gif",
            "https://media.tenor.com/1eWj5qLpLDcAAAAC/anime-milk-anime.gif",
            "https://i.pinimg.com/originals/81/42/08/81420897aea960b1ba3e0d8e812d2629.gif",
            "https://media.tenor.com/OW2okgAASDkAAAAC/anime-milk.gif",
            "https://i.gifer.com/ITNe.gif",
            "https://i.pinimg.com/originals/ea/2f/c6/ea2fc61dd3018d3eef359bb4e4980674.gif",
            "https://i.pinimg.com/originals/2a/44/0d/2a440de660deb4c3f8d2f6cc7f3f20a3.gif",
            "https://i.pinimg.com/originals/f8/7b/9e/f87b9e87a02830d6b24dacc31125b60a.gif",
            "https://i.pinimg.com/736x/67/0b/c8/670bc872f8cf88680ba243f1e5a625b9.jpg",
            "https://media.tenor.com/_FU-SJY9KNYAAAAC/anime-milk-anime.gif",
            "https://media.tenor.com/TYrA5WhOdm4AAAAC/milk-aesthetic.gif"
            ]

        const selecionado = milk[Math.floor(Math.random() * milk.length)];

        const leite = new Discord.MessageEmbed()
            .setDescription(`:milk: **Aqui está um copo de leite para:** ${message.author}!`)
            .setColor("#ffffff")
            .setImage(selecionado)
            .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

        message.channel.send({ embeds: [leite] }).then((message) => {
            setTimeout(() => {
                message.delete()
            }, 60000)
        })
    }
}