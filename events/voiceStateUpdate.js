const Discord = require("discord.js");
const ms = require("milliseconds");
const { Database } = require("quickmongo");
const db = new Database(process.env.DATABASE);

db.connect();

module.exports = {
    name: "voiceStateUpdate",
    once: false,

    async execute(client, oldState, newState) {

        let usuario = newState.guild.members.cache.get(newState.id);

        // Quando um usuário entra em um canal de voz
        if (oldState.channelId === null) {
            if (usuario.user.bot) return false;

            const joinLogger = new Discord.MessageEmbed()
                .setAuthor({ name: newState.member.user.tag, iconURL: newState.member.displayAvatarURL({ format: "png", dynamic: true }) })
                .setDescription(`<:Caf_IconConnectCall:916120826019999814> ${newState.member} entrou no canal de voz!`)
                .setColor("#43b582")
                .addFields(
                    {
                        name: "<:Caf_IconVoiceChannel:950256027717226496> Canal:",
                        value: `${newState.channel}`
                    }
                )
                .setFooter({ text: `ID: ${newState.member.id}` })
                .setTimestamp();

            client.channels.cache.get("870768628658741308").send({ embeds: [joinLogger] })

            if (await db.get(`contando_${newState.guild.id}_${newState.id}`) === false) {
                await db.set(`contando_${newState.guild.id}_${newState.id}`, true)
                await db.set(`call_${newState.guild.id}_${newState.id}`, new Date().getTime())
            }
        }

        // Quando um usuário sai de um canal de voz
        if (newState.channelId === null) {
            if (usuario.user.bot) return false;

            const leaveLogger = new Discord.MessageEmbed()
                .setAuthor({ name: oldState.member.user.tag, iconURL: oldState.member.displayAvatarURL({ format: "png", dynamic: true }) })
                .setDescription(`<:Caf_IconDisconectCall:916115393314189383> ${oldState.member} saiu do canal de voz!`)
                .setColor("#f04a47")
                .addFields(
                    {
                        name: "<:Caf_IconVoiceChannel:950256027717226496> Canal:",
                        value: `${oldState.channel}`
                    }
                )
                .setFooter({ text: `ID: ${oldState.member.id}` })
                .setTimestamp();

            client.channels.cache.get("870768628658741308").send({ embeds: [leaveLogger] })

            if (await db.get(`contando_${newState.guild.id}_${newState.id}`) === true) {
                const tempo = await db.get(`call_${newState.guild.id}_${newState.id}`);
                const start = new Date().getTime();
                const diff = Math.abs(tempo - start);
                const tempo2 = Math.ceil(diff / 1000);

                await db.add(`tempocall_${newState.guild.id}_${newState.id}`, tempo2)
                await db.set(`contando_${newState.guild.id}_${newState.id}`, false)
            }
        }

        // Quando um usuário muda de canal de voz
        if (oldState.channelId != null && newState.channelId != null && newState.channelId != oldState.channelId) {
            if (usuario.user.bot) return false;

            const switchLogger = new Discord.MessageEmbed()
                .setAuthor({ name: oldState.member.user.tag, iconURL: oldState.member.displayAvatarURL({ format: "png", dynamic: true }) })
                .setDescription(`<:Caf_CrossPlatform:912446482806894602> ${oldState.member} trocou de canal de voz!`)
                .setColor("#337fd5")
                .addFields(
                    {
                        name: "<:Caf_IconVoiceChannel:950256027717226496> Antes:",
                        value: `${oldState.channel}`
                    },
                    {
                        name: "<:Caf_IconClock:950255849538994226> Agora:",
                        value: `${newState.channel}`
                    }
                )
                .setFooter({ text: `ID: ${oldState.member.id}` })
                .setTimestamp();

            client.channels.cache.get("870768628658741308").send({ embeds: [switchLogger] })

            if (await db.get(`contando_${newState.guild.id}_${newState.id}`) === true) {
                const tempo = await db.get(`call_${newState.guild.id}_${newState.id}`);
                const start = new Date().getTime();
                const diff = Math.abs(tempo - start);
                const tempo2 = Math.ceil(diff / 1000);

                await db.add(`tempocall_${newState.guild.id}_${newState.id}`, tempo2)
                await db.set(`contando_${newState.guild.id}_${newState.id}`, false)
            }
        }

        // Quando um usuário começa uma stream/vídeo
        if (newState.selfVideo === true || newState.streaming === true) {
            if (usuario.voice.channel) {
                if (await db.get(`contando_${newState.guild.id}_${newState.id}`) === true) {
                    const tempo = await db.get(`call_${newState.guild.id}_${newState.id}`)
                    const start = new Date().getTime();
                    const diff = Math.abs(tempo - start);
                    const tempo2 = Math.ceil(diff / 1000);

                    await db.add(`tempocall_${newState.guild.id}_${newState.id}`, tempo2)
                } else {
                    return;
                }
            }
        } else {
            if (usuario.voice.channel) {
                if (await db.get(`contando_${newState.guild.id}_${newState.id}`) === true) {
                    const tempo = await db.get(`call_${newState.guild.id}_${newState.id}`)
                    const start = new Date().getTime();
                    const diff = Math.abs(tempo - start);
                    const tempo2 = Math.ceil(diff / 1000);

                    await db.add(`tempocall_${newState.guild.id}_${newState.id}`, tempo2)
                }
            }
        }

        // Quando um usuário é mutado/ensurdecido
        if (newState.mute === true || newState.deaf === true) {
            if (usuario.user.bot) return false;

            if (usuario.voice.channel) {
                if (await db.get(`contando_${newState.guild.id}_${newState.id}`) === true) {
                    const tempo = await db.get(`call_${newState.guild.id}_${newState.id}`)
                    const start = new Date().getTime();
                    const diff = Math.abs(tempo - start);
                    const tempo2 = Math.ceil(diff / 1000);

                    await db.add(`tempocall_${newState.guild.id}_${newState.id}`, tempo2)
                    await db.set(`call_${newState.guild.id}_${newState.id}`, new Date().getTime())
                    await db.set(`contando_${newState.guild.id}_${newState.id}`, false)
                } else {
                    return;
                }
            }
        } else {
            if (usuario.voice.channel) {
                await db.set(`call_${newState.guild.id}_${newState.id}`, new Date().getTime())
                await db.set(`contando_${newState.guild.id}_${newState.id}`, true)
            }
        }

        // Recompensa de Membro Ativo em calls
        async function tempo_em_call() {
            let tempo = await db.get(`tempocall_${newState.guild.id}_${newState.id}`)
            if (tempo === null) {
            } else {
                tempo = tempo.toString().replace("-", "")
            }

            if (tempo === 0 || tempo === null) {
                return;
            } else {
                let totalSeconds = (ms.seconds(tempo) / 1000);
                tempo = totalSeconds;
            }

            if (tempo > "216000") {
                try {
                    newState.member.roles.add(["934663182356725770"], "Recompensa de membro ativo. [Calls]")
                } catch (error) {
                    console.log(error)
                }
            }
        }

        tempo_em_call();
    }
}