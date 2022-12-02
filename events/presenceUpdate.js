const Discord = require("discord.js");
const { Database } = require("quickmongo");
const db = new Database(process.env.DATABASE);

db.connect();

module.exports = {
    name: "presenceUpdate",
    once: false,

    async execute(client, oldPresence, newPresence) {

        const cargo = "958076639365976134";

        // Quando um usuário coloca um status custom  
        if (newPresence?.activities[0]?.state?.includes("discord.gg/amizade")) {
            try {
                newPresence?.member.roles?.add([cargo], "Recompensa de apoiador.")
            } catch (error) {
                console.log(error)
            }

            // if (await db.get(`contandoStatus_${newPresence.member.id}`) === false) {
            //     await db.set(`contandoStatus_${newPresence.member.id}`, true)
            //     await db.set(`status_${newPresence.member.id}`, new Date().getTime())
            // }
        } else {
            // Quando um usuário remove um status custom
            if (newPresence.member.roles.cache.has(cargo)) {
                try {
                    newPresence?.member.roles?.remove([cargo], "Usuário não-apoiador.")
                } catch (error) {
                    console.log(error)
                }

                // const tempo = await db.get(`status_${newPresence.member.id}`)
                // const start = new Date().getTime()
                // const diff = Math.abs(tempo - start)
                // const tempo2 = Math.ceil(diff / 1000)

                // await db.add(`tempoStatus_${newPresence.member.id}`, tempo2)
                // await db.set(`contandoStatus_${newPresence.member.id}`, false)
            }
        }

        // Quando um usuário atualiza o status custom
        // if (oldPresence?.activities[0]?.state?.includes("discord.gg/amizade") && newPresence?.activities[0]?.state?.includes("discord.gg/amizade")) {
        //     if (await db.get(`contandoStatus_${newPresence.member.id}`) === false) {
        //         await db.set(`contandoStatus_${newPresence.member.id}`, true)
        //         await db.set(`status_${newPresence.member.id}`, new Date().getTime())
        //     } else {
        //         return;
        //     }
        // } else {
        //     await db.set(`contandoStatus_${newPresence.member.id}`, false)
        //     await db.set(`status_${newPresence.member.id}`, new Date().getTime())
        // }
    }
}