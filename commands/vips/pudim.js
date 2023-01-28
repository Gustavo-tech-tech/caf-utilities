const Discord = require("discord.js");

module.exports = {
    name: "pudim",
    description: "Oferece um pudim para o usuário.",
    aliases: ["pudding"],

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

        const pudim = [
            "https://media.tenor.com/hB7evHLZUMUAAAAC/pudding-anime.gif",
            "https://64.media.tumblr.com/490b9d1e1cc20153346f29a80cdb1f03/tumblr_ppx2sztuHy1tdnbbbo1_540.gif",
            "https://64.media.tumblr.com/7a31ade6d5248782d341dbe8b301b681/tumblr_os6x8mFJ1E1tdnbbbo1_640.gif",
            "https://media.tenor.com/vq_ez7PxSbEAAAAC/anime-sweet.gif",
            "http://31.media.tumblr.com/2e077503eeef49e33fc4015cb438dce8/tumblr_mro7s5XpUA1sob1pjo1_500.gif",
            "https://animesher.com/orig/0/69/692/6925/animesher.com_jelly-pudding-kawaii-692501.gif",
            "https://i.pinimg.com/originals/e0/08/c8/e008c88249d1dd009f5259495acb0357.gif",
            "https://media.tenor.com/L1FDE6Zug1kAAAAC/puddong-anime.gif",
            "https://i.pinimg.com/originals/14/b4/df/14b4dfda4b2eb2eadea524bcff1f204e.gif",
            "https://media.tenor.com/OXEvAL8mWe0AAAAC/food-pudding.gif",
            "https://data.whicdn.com/images/340350118/original.gif",
            "https://media.tenor.com/hB7evHLZUMUAAAAC/pudding-anime.gif",
            "https://data.whicdn.com/images/287227498/original.gif",
            "https://animesher.com/orig/1/193/1935/19356/animesher.com_gif-cherry-purin-1935692.gif",
            "https://i.pinimg.com/originals/bc/08/5b/bc085b937c48f672a48643ab70f1c6a3.gif",
            "https://media.tenor.com/M83Jp9Q5tCUAAAAd/umaru-pudding.gif",
            "https://i.gifer.com/origin/dd/dda13281ab09fb2a1a97d1ae40b3905a.gif",
            "https://media.tenor.com/LEwrI4s1phkAAAAC/anime-coffee-jelly.gif"
        ]

        const selecionado = pudim[Math.floor(Math.random() * pudim.length)];

        const pudding = new Discord.MessageEmbed()
            .setDescription(`:pudding: **Aqui está um pudim para:** ${message.author}!`)
            .setColor("#f0cc76")
            .setImage(selecionado)
            .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

        message.channel.send({ embeds: [pudding] }).then((message) => {
            setTimeout(() => {
                message.delete()
            }, 60000)
        })
    }
}