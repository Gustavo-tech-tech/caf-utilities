const Discord = require("discord.js");

module.exports = {
    name: "donut",
    description: "Oferece um donut para o usuário.",
    aliases: ["rosquinha"],

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

        const donut = [
            "https://media.tenor.com/mLaRkJCC2ksAAAAC/doughnut-doughnut-spinning.gif",
            "https://media.tenor.com/KeStU06J4gsAAAAC/satisfying-anime-food-anime-donut.gif",
            "https://media.tenor.com/E7LB_ELfKtcAAAAC/aesthetic-donut-anime.gif",
            "https://data.whicdn.com/images/328796469/original.gif",
            "https://animesher.com/orig/2/201/2014/20146/animesher.com_image-gif-cute-2014689.gif",
            "https://media.tenor.com/9LbqVwuqqzQAAAAC/donut-yummy.gif",
            "https://i.pinimg.com/originals/05/36/35/0536357e6444374e69774ffca1830bca.jpg",
            "https://thumbs.gfycat.com/BriefRepentantKoalabear-size_restricted.gif",
            "https://i.gifer.com/DT2W.gif",
            "https://i.pinimg.com/originals/99/71/83/997183d0eecfa635b9f7dc21a1d5d057.gif",
            "https://gifs.eco.br/wp-content/uploads/2022/05/gifs-do-homer-simpson-comendo-donut-0.gif"
            ]

        const selecionado = donut[Math.floor(Math.random() * donut.length)];

        const rosquinha = new Discord.MessageEmbed()
            .setDescription(`:doughnut: **Aqui está um donut para:** ${message.author}!`)
            .setColor("#ff9164")
            .setImage(selecionado)
            .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

        message.channel.send({ embeds: [rosquinha] }).then((message) => {
            setTimeout(() => {
                message.delete()
            }, 60000)
        })
    }
}