const Discord = require("discord.js");

module.exports = {
    name: "cafe",
    description: "Oferece um sorvete para o usuário.",
    aliases: ["coffee"],

    execute(client, message, args) {

        message.delete()

        let cargo = message.member.roles.cache
        let cargos_bypass = [
            "904032675311013948",
            "904032668042285147",
            "904031410338283652",
            "935035986654670858",
            "934663182356725770"
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

        const cafe = [
            "https://media.tenor.com/_h5RONFrRawAAAAC/cafe-coffee.gif",
            "https://i.pinimg.com/originals/b2/42/12/b2421258bde7fc011cafbe4a16c5ba06.gif",
            "https://i.pinimg.com/originals/c4/4d/78/c44d786879b7019a69e3572ea93c898a.gif",
            "https://i.pinimg.com/originals/b8/dc/a8/b8dca8f02de9a513ddbe10aec2033946.gif",
            "https://media.tenor.com/pLvNuJiZDhMAAAAC/anime-coffee.gif",
            "https://animesher.com/orig/1/151/1512/15121/animesher.com_anime-gif-japan-gif-1512170.gif",
            "https://i.pinimg.com/originals/a0/d4/ce/a0d4ce3a21e9f0e12c3f685469840025.gif",
            "https://64.media.tumblr.com/da76efba484227049d20ca50e09a9edb/tumblr_p944enmCRn1tdnbbbo1_640.gif",
            "https://animesher.com/orig/1/187/1873/18735/animesher.com_lovely-gif-cafe-1873501.gif",
            "https://thumbs.gfycat.com/FlashyUnsungDeer-size_restricted.gif",
            "https://i.pinimg.com/originals/3e/82/47/3e8247a486a17cfefed1d0778c9ab9a5.gif",
            "https://64.media.tumblr.com/757c903ad088c0fb2b92a92a5189286a/tumblr_psgl8zvV7R1tdnbbbo1_500.gifv"
            ]

            const selecionado = cafe[Math.floor(Math.random() * cafe.length)];

            const coffee = new Discord.MessageEmbed()
            .setDescription(`:coffee: **Aqui está um café para:** ${message.author}!`)
            .setColor("#9b552a")
            .setImage(selecionado)
            .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            message.channel.send({ embeds: [coffee] }).then(message => {
                setTimeout(() => {
                    message.delete()
                }, 60000)
            })
    }
}