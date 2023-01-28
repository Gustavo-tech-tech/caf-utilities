const Discord = require("discord.js");

module.exports = {
    name: "cupcake",
    description: "Oferece um cupcake para o usuário.",
    aliases: ["bolinho"],

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

        const cupcake = [
            "https://media.tenor.com/YEo1yQ54c_cAAAAC/pink-frosting-cupcake.gif",
            "https://64.media.tumblr.com/0eade27dce085a61057aac5dbcbd064a/3b5393a2d043ff5e-26/s540x810/3b228e097194bb6d69032c33bb95f7cbc6bf376d.gif",
            "https://64.media.tumblr.com/075f2aec738684e84446948112858ce4/tumblr_p7ioaquzAE1tdnbbbo1_640.gif",
            "https://media.tenor.com/Xjxn7eZKjN0AAAAC/food-anime.gif",
            "https://i.pinimg.com/originals/fe/2c/55/fe2c55dd8b37a76d1a2f5a091b27790f.gif",
            "https://64.media.tumblr.com/75f233dbad3cdb6295c1f2b531e7513f/tumblr_oog0lzyhdt1uxvvvzo1_500.gif",
            "https://64.media.tumblr.com/78182ac65f29bf1dc77bf13fbf236ecc/tumblr_o9jy6zsiwz1uc9x1zo1_500.gifv",
            "https://data.whicdn.com/images/290668676/original.gif"
            ]

        const selecionado = cupcake[Math.floor(Math.random() * cupcake.length)];

        const cake = new Discord.MessageEmbed()
            .setDescription(`:cupcake: **Aqui está um cupcake para:** ${message.author}!`)
            .setColor("#bb3c42")
            .setImage(selecionado)
            .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

        message.channel.send({ embeds: [cake] }).then((message) => {
            setTimeout(() => {
                message.delete()
            }, 60000)
        })
    }
}