const {
    Client,
    GatewayIntentBits,
    PermissionsBitField
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TOKEN = 'TU_TOKE_AQUI';

const config = {
    welcomeChannel: null,
    goodbyeChannel: null
};

client.once('ready', () => {
    console.log(`${client.user.tag} está en línea.`);
});

// Configurar canal de bienvenida
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!bienvenidas')) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('❌ Solo los administradores pueden usar este comando.');
        }

        const canal = message.mentions.channels.first();

        if (!canal) {
            return message.reply('⚠️ Debes mencionar un canal.');
        }

        config.welcomeChannel = canal.id;

        message.reply(`✅ Canal de bienvenidas configurado en ${canal}.`);
    }

    if (message.content.startsWith('!despedidas')) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply('❌ Solo los administradores pueden usar este comando.');
        }

        const canal = message.mentions.channels.first();

        if (!canal) {
            return message.reply('⚠️ Debes mencionar un canal.');
        }

        config.goodbyeChannel = canal.id;

        message.reply(`✅ Canal de despedidas configurado en ${canal}.`);
    }
});

// Bienvenida
client.on('guildMemberAdd', async (member) => {
    if (!config.welcomeChannel) return;

    const canal = member.guild.channels.cache.get(config.welcomeChannel);

    if (!canal) return;

    canal.send(`
## 👋 ¡Bienvenido ${member} 🎉
🤗 Que bien que estés aquí!

### Aquí algunas cosas que queremos que hagas:

📋 Lee las https://discord.com/channels/1519541546834198778/1520515386540298441 !
📅 Participa en los eventos!
💬 Chatea con todos!

🚨 Si tienes dudas o quieres reportar a un infractor crea un ticket en https://discord.com/channels/1519541546834198778/1520574884177121462 !

🫂 Que vivas una experiencia inolvidable ◠‿◠ 🧡!

|| ${member} ||
`);
});

// Despedida
client.on('guildMemberRemove', async (member) => {
    if (!config.goodbyeChannel) return;

    const canal = member.guild.channels.cache.get(config.goodbyeChannel);

    if (!canal) return;

    canal.send(`😭 Nuestro miembro **${member.user.tag}** nos ha dejado..`);
});

client.login(TOKEN);
