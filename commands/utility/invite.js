const Discord = require("discord.js");

module.exports = {
    name: "invite",
    description: "Obtenha o link de convite da Kizuna.",
    aliases: ["convidar"],

    execute(client, message, args) {

        message.delete()

        if (message.author.id !== "813456276125122581") return;

        const invite = new Discord.MessageEmbed()
            .setAuthor({ name: `${message.guild.me.displayName} - Convite`, iconURL: client.user.displayAvatarURL({ format: "png", dynamic: true }) })
            .setDescription("<:Caf_IconAddInvite:913910320467181619> [Clique aqui para convidar](https://discord.com/api/oauth2/authorize?client_id=835970242650963989&permissions=8&scope=bot)")
            .setColor("#ff69b4")
            .setFooter({ text: `Requisitado por: ${message.author.username}` });

        message.channel.send({ embeds: [invite] }).then(message => {
            setTimeout(() => message.delete(), 30000)
        })
    }
}