const Discord = require("discord.js");

module.exports = {
    name: "cookie",
    description: "Oferece um cookie para o usuário.",
    aliases: ["biscoito"],

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

        const cookie = [
            "https://i.pinimg.com/originals/f9/2e/5c/f92e5c3c417765b3e3de261a98a8bd3e.gif",
            "https://i.gifer.com/4IlE.gif",
            "https://64.media.tumblr.com/2f272878761f85dbe7665c1fada53e45/c0f2b8287c49f60d4b/s540x810/aecab8278a4762d638af1a6dcda55e16c069c458.gif",
            "https://i.pinimg.com/originals/04/9f/7e/049f7e37e68cd2afb8a26123b16d1b32.gif",
            "https://64.media.tumblr.com/18ff2c4d84a133f06ecea47a1f77ae76/cf55e7598fac087f46/s540x810/71012842f3a1100503588e7fa31b392b63815391.gif",
            "https://64.media.tumblr.com/0cb98352af8c4ced844f72ad13cf01d8/tumblr_ouyzo7OTP51tdnbbbo1_640.gif",
            "https://media.tenor.com/zEWVjcnOt1IAAAAC/anime-eating.gif",
            "https://media.tenor.com/bBRCCeAYPU8AAAAC/cookie-mashiro.gif",
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8d8aa80d-a00f-4ca5-817d-30fbc6bf33be/da1dya1-b214fb9a-1ee1-416f-ab91-904b1b7e2cd4.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhkOGFhODBkLWEwMGYtNGNhNS04MTdkLTMwZmJjNmJmMzNiZVwvZGExZHlhMS1iMjE0ZmI5YS0xZWUxLTQxNmYtYWI5MS05MDRiMWI3ZTJjZDQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.oZs-fOzLJ3s3AEcRHsT5m-S8KWfAyJo0jQCkCJcDoBw",
            "https://media.tenor.com/zqE_wtfGGIMAAAAC/national-sugar-cookie-day-sugar-cookies.gif",
            "https://i.pinimg.com/originals/24/5b/e4/245be43dd4a8eee421a468db3b2ef86a.gif"
            ]

        const selecionado = cookie[Math.floor(Math.random() * cookie.length)];

        const biscoito = new Discord.MessageEmbed()
            .setDescription(`:cookie: **Aqui está um biscoitinho para:** ${message.author}!`)
            .setColor("#fc89fc")
            .setImage(selecionado)
            .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

        message.channel.send({ embeds: [biscoito] }).then((message) => {
            setTimeout(() => {
                message.delete()
            }, 60000)
        })
    }
}