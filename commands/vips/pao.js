const Discord = require("discord.js");

module.exports = {
    name: "pao",
    description: "Oferece pão fresquinho para o usuário.",
    aliases: ["bread"],

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

        const pao = [
            "http://25.media.tumblr.com/tumblr_me128p5ddP1rjl8byo1_r1_500.gif",
            "https://i.pinimg.com/originals/d5/b9/1c/d5b91c434e2a5cf581f92d2aa702c11d.gif",
            "https://64.media.tumblr.com/060a20fbf9a51bb213be354dedafea25/5afd2893ad0a903e34/s540x810/688ee348f9f2ce6bcc6d9d598d5733e1f51e58cc.gifv",
            "https://i.pinimg.com/originals/bd/01/ea/bd01ea0f9e8484234c570aea72aa8d1a.gif",
            "https://www.coisasdojapao.com/wp-content/uploads/2018/02/gof-kare-pan.gif",
            "http://pa1.narvii.com/6222/23b0961b0291316e3f18b9c2e01fae9e8c78ae00_00.gif",
            "https://64.media.tumblr.com/1a595963868b9d922af6bafe2ffd5928/84066d07bd2e9c278c/s500x750/f952151045b7f1718e4c8de53065bf1b8d0abe0a.gif",
            "https://pa1.narvii.com/6422/60bb57316c80db3ae3d13f6ac3c49d018b7f648f_hq.gif",
            "https://i.pinimg.com/originals/77/a6/91/77a6912848fa646675e0fb50a22f2037.gif",
            "https://media.tenor.com/FD0n7w3gHA4AAAAd/anime-bread-mushoku-tensei.gif",
            "https://64.media.tumblr.com/3cada2b6122d6909aed678c542ad01c5/26a8ab8ec336c0d252/s1280x1920/6f8aef4b6fbc86f2faee6d8a79683d417636e963.gif"
            ]

        const selecionado = pao[Math.floor(Math.random() * pao.length)];

        const bread = new Discord.MessageEmbed()
            .setDescription(`:bread: **Aqui está um pãozinho fresquinho para:** ${message.author}!`)
            .setColor("#eba273")
            .setImage(selecionado)
            .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

        message.channel.send({ embeds: [bread] }).then((message) => {
            setTimeout(() => {
                message.delete()
            }, 60000)
        })
    }
}