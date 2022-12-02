const Discord = require("discord.js");
const commaNumber = require("comma-number");

module.exports = {
    name: "invites",
    description: "Exibe a lista de todos os convites de um membro.",
    aliases: ["convites", "div"],

    async execute(client, message, args) {

        message.delete()

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let invites = await message.guild.invites.fetch();
        let userInvites = invites.filter(u => u.inviter && u.inviter.id === member.id);
        let inviteCodes = userInvites.map(x => x.url).join(`\n <:Caf_IconAddInvite:913910320467181619> `);
        let i = 0;
        userInvites.forEach(inv => i += inv.uses)

        const convites = new Discord.MessageEmbed()
            .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ format: "png", dynamic: true }) })
            .setDescription(`<:Caf_IconAddMember:916141737485942824> **Convidados: ${commaNumber(i)}**\n<:Caf_IconMembers:910590844699025479> **Total no servidor: ${commaNumber(message.guild.memberCount)}**`)
            .setColor("#ff69b4")
            .setThumbnail(message.guild.iconURL())
            .addFields(
                {
                    name: "<:Caf_IconArrowDown:910585022686330890> Lista de convites:",
                    value: `<:Caf_IconAddInvite:913910320467181619> ${inviteCodes ? inviteCodes : "Não há convites gerados por este usuário."}`
                }
            )
            .setFooter({ text: message.guild.name });

        message.channel.send({ embeds: [convites] }).then(message => {
            setTimeout(() => message.delete(), 30000)
        })
    }
}