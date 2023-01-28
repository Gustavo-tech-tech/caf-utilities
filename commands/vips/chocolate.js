const Discord = require("discord.js");

module.exports = {
    name: "chocolate",
    description: "Oferece um chocolate quente para o usuário.",
    aliases: [""],

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

        const chocolate = [
            "http://25.media.tumblr.com/dfcb0509dc73b88f817775212f11e4fe/tumblr_msu15rrsM61r922azo1_500.gif",
            "https://data.whicdn.com/images/333792713/original.gif",
            "https://media.tenor.com/jKLoBstniZsAAAAC/chocolatemilk-yum.gif",
            "https://i.gifer.com/DWbF.gif",
            "https://1.bp.blogspot.com/-A6XsHDKUCyE/VxW41b8rBMI/AAAAAAAAAhQ/xBtV8JBKh9E-J5U1gV9yDTeHo7MMEDyvQCLcB/s1600/tumblr_nxjobbOSBN1uxvvvzo1_500.gif",
            "https://media.tenor.com/mnjLOnr-l8cAAAAd/choclate-anime.gif",
            "https://64.media.tumblr.com/d91a727b69efe580fbbc0d6376d17453/55bccf20207bcf42-de/s1280x1920/2835259174701e1e8bf6a8fb65a243672d0da4fc.gif",
            "https://64.media.tumblr.com/90062c79264d143fb75c8a055025f5e5/tumblr_n6h3xpiVcp1t2rr2bo1_1280.png",
            "https://giffiles.alphacoders.com/100/100084.gif"
            ]

        const selecionado = chocolate[Math.floor(Math.random() * chocolate.length)];

        const milk = new Discord.MessageEmbed()
            .setDescription(`:chocolate_bar: **Aqui está um chocolate quente para:** ${message.author}!`)
            .setColor("#9b552a")
            .setImage(selecionado)
            .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

        message.channel.send({ embeds: [milk] }).then((message) => {
            setTimeout(() => {
                message.delete()
            }, 60000)
        })
    }
}