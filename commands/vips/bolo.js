const Discord = require("discord.js");

module.exports = {
    name: "bolo",
    description: "Oferece um bolo ao usuário",
    aliases: ["cake"],

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

        const bolo = [
            "https://media.tenor.com/xbuo1npDJhkAAAAC/cake-anime.gif",
            "https://media.tenor.com/dY3O3rY4OmAAAAAC/cake-anime.gif",
            "https://i.pinimg.com/originals/44/78/ca/4478cae732f220bc718e3ebd92b856ed.gif",
            "https://i.pinimg.com/originals/c8/d7/2f/c8d72fcccd85de23bddb3391678c47ba.gif",
            "https://i.gifer.com/XNzI.gif",
            "https://data.whicdn.com/images/202009416/original.gif",
            "https://64.media.tumblr.com/9c1e8741865c996db4d77edeabde43f3/tumblr_pxg5smMsY91tdnbbbo1_540.gif",
            "https://i.pinimg.com/originals/cd/de/0a/cdde0aeab2aba10dfc2f1b6fc67e5d7a.gif",
            "http://33.media.tumblr.com/9c3a3a857a080ec0bc5194c8977a2d7b/tumblr_nwujs8UphK1udvy5wo1_500.gif",
            "https://i.gifer.com/MOF.gif",
            "https://media.tenor.com/0fjO_fIrjugAAAAC/food-anime.gif"
            ]

            const selecionado = bolo[Math.floor(Math.random() * bolo.length)];

            const cake = new Discord.MessageEmbed()
            .setDescription(`:cake: **Aqui está um bolinho para:** ${message.author}!`)
            .setColor("#ffdc8d")
            .setImage(selecionado)
            .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

        message.channel.send({ embeds: [cake] }).then((message) => {
            setTimeout(() => {
                message.delete()
            }, 60000)
        })
    }
}