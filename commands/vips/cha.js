const Discord = require("discord.js");

module.exports = {
    name: "cha",
    description: "Oferece chá para os usuários",
    aliases: ["tea"],

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

        const cha = [
            "https://media.tenor.com/MsyIEM89FuAAAAAC/tea-anime.gif",
            "https://media.tenor.com/kTG1SkG6LPoAAAAC/anime-gif-anime.gif",
            "https://i.pinimg.com/originals/29/7c/d8/297cd843c60f7857b279ca84f44d19fa.gif",
            "https://media.tenor.com/vLbmeInwypMAAAAC/anime-tea.gif",
            "https://i.pinimg.com/originals/e3/9e/56/e39e56c64a6b035397ec2a3ed7f1a93a.gif",
            "https://media3.giphy.com/media/4qdB4dY4xsKWc/giphy.gif",
            "https://64.media.tumblr.com/80953ee465dfc693b91a9ded4dd484f6/f93e38eccffb1b83-c7/s500x750/0c23fd4d256b0aef001f6609f334796eaf8716a4.gif",
            "https://64.media.tumblr.com/e2511b13edcae8863bbf5213a8d926b3/c464403222e02019-d4/s540x810/17f5fffc6f56c8a8181c39c009c32ae06d0e1b84.gif",
            "https://thumbs.gfycat.com/ImpassionedSarcasticFlycatcher-size_restricted.gif",
            "https://media.tenor.com/ptHgGiMV2lIAAAAC/tea-anime.gif",
            "https://i.pinimg.com/originals/e7/e5/ae/e7e5ae58eaedb5d1b212b3e0b86570bd.gif"
        ]

        const selecionado = cha[Math.floor(Math.random() * cha.length)];

        const tea = new Discord.MessageEmbed()
            .setDescription(`:tea: **Aqui está um chazinho para:** ${message.author}!`)
            .setImage(selecionado)
            .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

        message.channel.send({ embeds: [tea] }).then((message) => {
            setTimeout(() => {
                message.delete()
            }, 60000)
        })
    }
}