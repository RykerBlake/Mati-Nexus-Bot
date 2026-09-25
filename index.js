const {
    Client,
    GatewayIntentBits,
    PermissionsBitField
} = require("discord.js");

const fs = require("fs");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TOKEN = process.env.TOKEN;

const configFile = "./config.json";

let config = {
    welcomeChannel: null,
    goodbyeChannel: null
};

if (fs.existsSync(configFile)) {
    config = JSON.parse(fs.readFileSync(configFile, "utf8"));
}

function saveConfig() {
    fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
}

client.once("ready", () => {
    console.log(`✅ ${client.user.tag} conectado.`);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    // Configurar canal de bienvenidas
    if (message.content.startsWith("!bienvenidas")) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("❌ Solo administradores.");
        }

        const canal = message.mentions.channels.first();

        if (!canal) {
            return message.reply("⚠️ Usa: !bienvenidas #canal");
        }

        config.welcomeChannel = canal.id;
        saveConfig();

        return message.reply(`✅ Canal de bienvenidas configurado en ${canal}`);
    }

    // Configurar canal de despedidas
    if (message.content.startsWith("!despedidas")) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("❌ Solo administradores.");
        }

        const canal = message.mentions.channels.first();

        if (!canal) {
            return message.reply("⚠️ Usa: !despedidas #canal");
        }

        config.goodbyeChannel = canal.id;
        saveConfig();

        return message.reply(`✅ Canal de despedidas configurado en ${canal}`);
    }
});

// Bienvenida
client.on("guildMemberAdd", async (member) => {
    if (!config.welcomeChannel) return;

    const canal = member.guild.channels.cache.get(config.welcomeChannel);

    if (!canal) return;

    canal.send(`## 👋 ¡Bienvenido ${member} 🎉
🤗 Que bien que estés aquí!

### Aquí algunas cosas que queremos que hagas:

📋 Lee las https://discord.com/channels/1519541546834198778/1520515386540298441 !
📅 Participa en los eventos!
💬 Chatea con todos!

🚨 Si tienes dudas o quieres reportar a un infractor crea un ticket en https://discord.com/channels/1519541546834198778/1520574884177121462 !

🫂 Que vivas una experiencia inolvidable ◠‿◠ 🧡!

|| ${member} ||`);
});

// Despedida
client.on("guildMemberRemove", async (member) => {
    if (!config.goodbyeChannel) return;

    const canal = member.guild.channels.cache.get(config.goodbyeChannel);

    if (!canal) return;

    canal.send(`😭 Nuestro miembro **${member.user.tag}** nos ha dejado..`);
});

client.login(TOKEN);
