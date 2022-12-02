const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const bot = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING"
  ],
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");
bot.queues = new Map();
bot.snipes = new Map();
bot.editsnipes = new Map();

// Handler de comandos
fs.readdirSync("./commands/").forEach(local => {
  const comandos = fs.readdirSync(`./commands/${local}`).filter(arquivo => arquivo.endsWith(".js"))

  for (let file of comandos) {
    let puxar = require(`./commands/${local}/${file}`)

    if (puxar.name) {
      bot.commands.set(puxar.name, puxar)
    }
    if (puxar.aliases && Array.isArray(puxar.aliases))
      puxar.aliases.forEach(x => bot.aliases.set(x, puxar.name))
  }
});

// Handler de eventos
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    bot.once(event.name, (...args) => event.execute(bot, ...args));
  } else {
    bot.on(event.name, (...args) => event.execute(bot, ...args));
  }
}

bot.login(process.env.TOKEN);