const Discord = require("discord.js");

module.exports = {
    name: "eval",
    description: "Avalia algum código Javascript.",

    async execute(client, message, args) {

        message.delete()

        if (message.author.id !== "813456276125122581") {
            const error = new Discord.MessageEmbed()
                .setDescription("<:Caf_IconTickRed:966538465506373702> **Você não tem permissão para usar esse comando.**")
                .setColor("#f04a47")
                .setFooter({ text: `Requisitado por: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: "png", dynamic: true }) })

            return message.channel.send({ embeds: [error] }).then(message => {
                setTimeout(() => message.delete(), 10000);
            })
        }

        const code = args.join(" ");
        if (!code) {
            return message.channel.send({ content: "Insira algum código em JavaScript para avaliação!" })
        }

        try {
            const result = await eval(code);
            let output = result;
            if (typeof (result) !== "string") {
                output = require("util").inspect(result, { depth: 0 })
            }

            if (output.length > 1024) {
                return message.channel.send({ content: "O código avaliado é muito grande para ser mostrado." })
            }

            message.channel.send({ content: `${output}`, code: "js" })
        } catch (error) {
            if (error.length > 1024) {
                return message.channel.send({ content: "O código avaliado é muito grande para ser mostrado." })
            }
        }
    }
}

function clean(string) {
    if (typeof (text) == "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
}

clean();