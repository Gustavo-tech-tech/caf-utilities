const Discord = require("discord.js");
const humanizeDuration = require("humanize-duration");
const { Database } = require("quickmongo");
const db = new Database(process.env.DATABASE);
let cooldown = new Discord.Collection();

db.connect();

module.exports = {
    name: "messageCreate",
    once: false,

    async execute(client, message) {

        // Handler de comandos  
        function handler() {
            if (!message.content.startsWith(process.env.PREFIX)) return;
            if (message.author.bot) return;
            if (message.channel.type === "DM") return;

            let remainingTime = humanizeDuration(cooldown.get(message.author.id) - Date.now(), { units: ["s"], round: true, language: "pt" })

            let boosterMember = message.member.roles.cache.get("803473482054238220");

            if (cooldown.has(message.author.id)) {
                const cooldown = new Discord.MessageEmbed()
                    .setDescription(`:zap: **Espere ${remainingTime} para utilizar um comando novamente.**`)
                    .setColor("#ff69b4");

                return message.channel.send({ content: `<@${message.author.id}>`, embeds: [cooldown] }).then(message => {
                    setTimeout(() => message.delete(), 10000)
                })
            }

            const timeout = boosterMember ? 0 : 5000;

            cooldown.set(message.author.id, Date.now() + timeout);
            setTimeout(() => {
                cooldown.delete(message.author.id);
            }, timeout);

            const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
            let command = args.shift().toLowerCase()
            if (command.length === 0) return;

            let cmd = client.commands.get(command)
            if (!cmd) cmd = client.commands.get(client.aliases.get(command))

            try {
                cmd.execute(client, message, args);
            } catch (error) {
                console.error(error);
            }
        }

        // Adiciona 1 às mensagens de um usuário
        async function mensagens_enviadas() {
            if (message.content.startsWith(process.env.PREFIX)) return;
            if (message.author.bot) return;
            if (!["802594127828615242"].includes(message.channel.id)) return false;

            await db.add(`mensagensEnviadas_${message.guild.id}_${message.author.id}`, 1)

            let mensagens = await db.get(`mensagensEnviadas_${message.guild.id}_${message.author.id}`)
            if (mensagens > 2500) {
                try {
                    message.member.roles.add(["934663182356725770"], "Recompensa de membro ativo. [Chats]")
                } catch (error) {
                    console.log(error)
                }
            }
        }

        // Adiciona 1 às mensagens totais de um usuário
        async function mensagens_totais() {
            if (message.content.startsWith(process.env.PREFIX)) return;
            if (message.author.bot) return;

            await db.add(`mensagensTotais_${message.guild.id}_${message.author.id}`, 1)
        }

        // Mensagem de ajuda ao mencionar bot
        function helper() {
            if (message.content.includes("@here") || message.content.includes("@everyone")) return false;
            if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
                const helper = new Discord.MessageEmbed()
                    .setAuthor({ name: message.guild.me.displayName, iconURL: client.user.displayAvatarURL({ format: "png", dynamic: true }) })
                    .setDescription(`Este é um bot exclusivo do servidor **${message.guild.name}**`)
                    .addFields(
                        {
                            name: "<:Caf_PinkArrowRight:954799263966179359> Informações:",
                            value: `Prefixo: **${process.env.PREFIX}**`
                        },
                        {
                            name: "<:Caf_PinkArrowRight:954799263966179359> Lista de comandos:",
                            value: `\`${process.env.PREFIX}ajuda\``
                        }
                    )
                    .setColor("#ff69b4");
                return message.channel.send({ embeds: [helper] }).then(message => {
                    setTimeout(() => message.delete(), 15000)
                })
            }
        }

        handler();
        mensagens_enviadas();
        mensagens_totais();
        helper();
    }
}