const Discord = require("discord.js");
const moment = require("moment");
const commaNumber = require("comma-number");

module.exports = {
    name: "ready",
    once: false,

    async execute(client) {

        moment.locale("pt-br");

        function getTopicMessage(quantidade) {
            quantidade = quantidade.toString()
            quantidadeStr = "";

            for (var i = 0; i < quantidade.length; i++) {
                switch (quantidade.charAt(i)) {
                    case "0":
                        quantidadeStr += "<a:Caf_RedNumberZero:965804377837285386>"
                        break;
                    case "1":
                        quantidadeStr += "<a:Caf_RedNumberOne:965804331888672849>"
                        break;
                    case "2":
                        quantidadeStr += "<a:Caf_RedNumberTwo:965804787302031370>"
                        break;
                    case "3":
                        quantidadeStr += "<a:Caf_RedNumberThree:965804746902474843>"
                        break;
                    case "4":
                        quantidadeStr += "<a:Caf_RedNumberFour:965804425992081478>"
                        break;
                    case "5":
                        quantidadeStr += "<a:Caf_RedNumberFive:965804832415952906>"
                        break;
                    case "6":
                        quantidadeStr += "<a:Caf_RedNumberSix:965804688240955403>"
                        break;
                    case "7":
                        quantidadeStr += "<a:Caf_RedNumberSeven:965804511006449754>"
                        break;
                    case "8":
                        quantidadeStr += "<a:Caf_RedNumberEight:965804471177334804>"
                        break;
                    case "9":
                        quantidadeStr += "<a:Caf_RedNumberNine:965804590819835934>"
                        break;
                }
            }

            mensagemTopico = `**<a:Caf_Welcome1:966090917872275456><a:Caf_Welcome2:966090996725211216> Bem-vindo(a) ao Star's Café | ${quantidadeStr} membros!**`;

            return mensagemTopico;
        }

        // Status custom para o bot
        const atividades = [
            "Star's Café 💙 | -help",
            "discord.gg/amizade ☕",
            "Never change what makes you rare.",
            "The best moments are that ones we spend together.",
            "Aky is the best artist.",
            "kyce is a good hearer."
        ];

        i = 0;

        setInterval(() => client.user.setActivity(`${atividades[i++ % atividades.length]}`, {
            type: "PLAYING",
            status: "online"
        }), 600000)

        // Contador de membros no servidor e em calls na sala de voz
        let guildId = "802594126994210857";

        setInterval(function () {
            const membros = client.guilds.cache.get(guildId).memberCount;
            const voiceChannels = client.guilds.cache.get(guildId).channels.cache.filter(channel => channel.type === "GUILD_VOICE");
            let count = 0;
    
            for (var [id, voiceChannel] of voiceChannels) {
                count += voiceChannel.members.size
            }

            let channelMembros = client.channels.cache.get("1023773877190545458");
            let channelCall = client.channels.cache.get("1023773912267493416");

            try {
                channelMembros.setName(`╷💜╵ Membros: ${commaNumber(membros)}`)
                channelCall.setName(`╷💜╵ Total em call: ${commaNumber(count)}`)
            } catch (error) {
                console.log(error)
            }

        }, 300000)

        // Cargo mudando de cor
        const guild = client.guilds.cache.get("802594126994210857");

        const colors = "RANDOM";
        const role = await guild.roles.fetch("904032675311013948");

        setInterval(() => {
            role.edit({
                color: colors
            })
        }, 900000);


        // Contador de membros no tópico do canal
        setInterval(function () {
            let channel = client.channels.cache.get("802594127828615242");

            try {
                channel.setTopic(getTopicMessage(client.guilds.cache.get(guildId).memberCount))
            } catch (error) {
                console.log(error)
            }
        }, 300000)

        // Quando o bot entra online
        console.log(`Estou conectada como ${client.user.username}.`);

        const ready = new Discord.MessageEmbed()
        .setAuthor({ name: `Caffeiny`, iconURL: client.user.displayAvatarURL({ format: "png", dynamic: true }) })
        .setDescription(`<:Caf_IconUser:952043105480224848> **Caffeiny** conectada. `)
        .setColor("#ff69b4")
        .addFields(
            {
                name: "<:Caf_IconClock:950255849538994226> Horário:",
                value: `**${moment().format('LL')} - ${moment().format('LT')}.**`
            })
        .setFooter({ text: client.guilds.cache.get(guildId).name, iconURL: client.guilds.cache.get(guildId).iconURL({ format: "png", dynamic: true }) })

        client.channels.cache.get("912850829009117254").send({ embeds: [ready] })

        // Sistema de mensagem temporária
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId("mensagem_automatica")
                    .setLabel("Mensagem automática")
                    .setStyle("SECONDARY")
                    .setDisabled(true)
            )

        setInterval(() => {
            const mensagens = [
                "Seja membro ativo enviando 2.500 mensagens no chat-geral ou gastando 60h desmutado em calls!",
                "Quer ajudar a deixar o servidor melhor do que já é? <#917568754458710046>",
                "Você sabia que temos VIP a partir de R$ 5,00? <#1062856962909425745>",
                "Deixe seu feedback sobre o servidor e o conteúdo: <#1061360485192171690>?",
                "Você sabia que agora temos Sistema VIP? <#1062856962909425745>",
                "Precisa denunciar alguém quebrando as regras? <#879062961874939954>",
                "Ajude na divulgação do servidor votando aqui: [top.gg](https://top.gg/servers/802594126994210857/vote)",
                "Ao digitar `-avatar`, você pode ter a proesa de ter mensagem personalizada VIP, Membro Ativo ou Booster!",
                "Se sua mensagem for bloqueada, não tente ultrapassar, é contra as regras",
                "Você sabia que o registro pode ser feito em: <id:customize>?",
                "Você sabia que ao digitar `discord.gg/amizade` no seu Status, você ganha uma tag especial automaticamente?",
                "Você sabia que você pode acumular tempo em call? `-tempo`",
                "Veja sua atividade no servidor usando: `-ativo`",
                "Você sabia que na compra de um VIP Café Supremo sendo booster, você recebe 10% de desconto? <#901871779360944219>",
                "Personalize seu nick e deixe ele bem estiloso com uma das: <#803372496170647562>",
                "Fique informado das últimas mudanças na comunidade: <#802594127363440658>"
            ];

            const mensagemRandom = mensagens[Math.floor(Math.random() * mensagens.length)];

            const autofeed = new Discord.MessageEmbed()
            .setDescription(`**${mensagemRandom}**`)
            .setColor("#ffbf8c")

            client.channels.cache.get("802594127828615242").send({ embeds: [autofeed], components: [row] }).then(msg => {
                setTimeout(() => msg.delete(), 30000)
            })
        }, 1800000)
    }
}
