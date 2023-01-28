const Discord = require("discord.js");

module.exports = {
    name: "panqueca",
    description: "Oferece uma panqueca para o usuário.",
    aliases: ["pancake"],

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

        const panqueca = [
            "https://media.tenor.com/h4CevcmjW0EAAAAC/pancake-anime.gif",
            "https://media.tenor.com/Cu0nR-y19aYAAAAC/pancakes-anime.gif",
            "https://i.pinimg.com/originals/b3/b2/59/b3b2597ee97477340f945e9af0a58e9c.gif",
            "https://i.pinimg.com/originals/e2/2e/55/e22e558abfe909888e4f0c551a7c4a29.gif",
            "https://media.tenor.com/HuUSDz6yNmgAAAAC/pancakes-bacon.gif",
            "https://gifdb.com/images/high/anime-food-pancake-syrup-07jl5e7gkocsdv0e.gif",
            "https://64.media.tumblr.com/7bf359e6dd5118d4010e5b9983894300/tumblr_o2uptluZEH1qehrvso1_540.gif",
            "https://64.media.tumblr.com/9f7b3cd5826204a91e7bf60f67e7d18c/tumblr_p5yr1zP18f1vd1993o1_500.gif",
            "https://thumbs.gfycat.com/EmbarrassedAridCopepod-size_restricted.gif",
            "https://gifdb.com/images/high/anime-food-pancakes-nj59w3igm52ddu12.gif",
            "https://64.media.tumblr.com/8d0ec6f7d8686924dd4f4d7d2326fe2e/tumblr_p0cgzpLHyN1vf8d0to1_1280.gifv"
            ]

        const selecionado = panqueca[Math.floor(Math.random() * panqueca.length)];

        const pancake = new Discord.MessageEmbed()
            .setDescription(`:pancakes: **Aqui está uma panqueca para:** ${message.author}!`)
            .setColor("#fc89fc")
            .setImage(selecionado)
            .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

        message.channel.send({ embeds: [pancake] }).then((message) => {
            setTimeout(() => {
                message.delete()
            }, 60000)
        })
    }
}