const Discord = require("discord.js");

module.exports = {
    name: "refri",
    description: "Oferece um refrigerante para o usuário.",
    aliases: ["soda"],

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

        const refri = [
            "https://64.media.tumblr.com/078ecc482289766fa9340ce9bc6d3cc9/95412d192c07d054-0c/s540x810/2c6f0e72ab42268fd00df09544704ed3446f5d1d.gif",
            "https://thumbs.gfycat.com/AfraidDecentFoxhound-max-1mb.gif",
            "https://media.tenor.com/R5PVmm40ClQAAAAC/anime-anime-drink.gif",
            "https://thumbs.gfycat.com/ThreadbareViciousFawn-size_restricted.gif",
            "https://i.gifer.com/origin/05/055a23542d73815edc9ed13520dbdeba.gif",
            "https://media.tenor.com/RqIjMo11C-sAAAAC/himouto-umaru-animegirl.gif",
            "https://media.tenor.com/1gQqP3hr_y8AAAAC/soda-pop-soda-can.gif",
            "https://64.media.tumblr.com/e73f1ddefc72ae1b2175fe2c5074db5d/tumblr_nvkem0BnBn1thre8do1_500.gif",
            "https://i.pinimg.com/originals/65/6e/f4/656ef42b3108095594c948303335cbc2.gif",
            "https://4.bp.blogspot.com/-ZqNWg16ABBU/V9s4v_Bu2fI/AAAAAAAAmVY/w_w5v1zAXecu7C7BoeIpMPo5pqz6wZIQgCPcB/s1600/Omake%2BGif%2BAnime%2B-%2BKono%2BBijutsubu%2Bni%2Bwa%2BMondai%2Bga%2BAru%2521%2B-%2BEpisode%2B11%2B-%2BMaria%2BSells%2BSoda.gif",
            "https://i.gifer.com/kbZ.gif"
            ]

        const selecionado = refri[Math.floor(Math.random() * refri.length)];

        const soda = new Discord.MessageEmbed()
            .setDescription(`**Aqui está um refrigerante para:** ${message.author}!`)
            .setColor("#b9b9b9")
            .setImage(selecionado)
            .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

        message.channel.send({ embeds: [soda] }).then((message) => {
            setTimeout(() => {
                message.delete()
            }, 60000)
        })
    }
}