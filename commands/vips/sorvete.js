const Discord = require("discord.js");

module.exports = {
    name: "sorvete",
    description: "Oferece um sorvete para o usuário.",

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

        const sorvete = [
            "https://media.tenor.com/IjRsTqDoQs8AAAAC/anime-icecream.gif",
            "https://media.tenor.com/iFmwaM6-CDUAAAAC/ice-cream-anime.gif",
            "https://media.tenor.com/EXFQbt1YOY8AAAAC/ice-cream-anime.gif",
            "https://aniyuki.com/wp-content/uploads/2022/03/aniyuki-gif-anime-girl-with-ice-cream-13.gif",
            "https://media.tenor.com/AliaPf-oVEwAAAAC/anime-food-food.gif",
            "https://i.pinimg.com/originals/05/db/d6/05dbd65bd0c1b6104061ca1a66d76ae2.gif",
            "https://i.pinimg.com/originals/f3/dd/af/f3ddaf1f75f89239720eaef33c0150e7.gif",
            "https://i.pinimg.com/originals/c7/31/fb/c731fb6804645f71a0f0a2cd333cbe2c.gif",
            "https://i.pinimg.com/originals/d9/7b/36/d97b36ea443aca0f54f721e9db918727.gif",
            "https://i.gifer.com/59bG.gif",
            "https://media.tenor.com/4FqnxCz5BgsAAAAC/ice-cream.gif",
            "https://64.media.tumblr.com/c51516b71b54f507300cd18f8201da47/08ac0526c38d7d6e-8f/s500x750/dc714caddeaa2f60e638a9688c26733c735b4cb9.gif"
        ]

        const selecionado = sorvete[Math.floor(Math.random() * sorvete.length)];
        
        const iceCream = new Discord.MessageEmbed()
            .setDescription(`**Aqui está um sorvetinho para:** ${message.author}!`)
            .setColor("#fcff85")
            .setImage(selecionado)
            .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            message.channel.send({ embeds: [iceCream] }).then((message) => {
                setTimeout(() => {
                    message.delete()
                }, 60000)
            })
    }
}