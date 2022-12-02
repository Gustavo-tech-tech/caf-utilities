const Discord = require("discord.js");
const humanizeDuration = require("humanize-duration");
const { Database } = require("quickmongo");
const db = new Database(process.env.DATABASE);

db.connect();

module.exports = {
    name: "guildMemberRemove",
    once: false,

    async execute(client, member) {

        if (!["802594126994210857"].includes(member.guild.id)) return false;

        // Log de saída
        const leaveLogger = new Discord.MessageEmbed()
            .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ format: "png", dynamic: true }) })
            .setDescription(`<:Caf_IconRemoveMember:916141779009560607> **${member.user.username}** saiu do servidor!`)
            .setColor("#ff69b4")
            .addFields(
                {
                    name: "<:Caf_IconClock:950255849538994226> Havia entrado:",
                    value: `**${humanizeDuration(member.joinedAt - Date.now(), { largest: 3, conjunction: " e ", serialComma: false, round: true, language: "pt" })} atrás**`
                },
                {
                    name: "<:Caf_IconRole:941831591502692403> Cargos:",
                    value: `${member.roles.cache
                        .sort((a, b) => b.position - a.position)
                        .map(r => r.toString()).join(" ").replace("@everyone", " ") || "Nenhum cargo encontrado."}`
                }
            )
            .setFooter({ text: `ID: ${member.user.id}` })
            .setTimestamp();

        client.channels.cache.get("870768646899777606").send({ embeds: [leaveLogger] })

        // Exclusão de membro da database
        async function remover_usuario() {
            await db.delete(`mensagensEnviadas_${member.guild.id}_${member.user.id}`)
            await db.delete(`mensagensTotais_${member.guild.id}_${member.user.id}`)
            await db.delete(`tempocall_${member.guild.id}_${member.user.id}`)
        }

        remover_usuario();
    }
}