const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.once('ready', () => {
  console.log(`¡Bot iniciado exitosamente como ${client.user.tag}!`);
});

// Comando básico de respuesta
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.content === '!hola') {
    message.reply('¡Hola! El bot está activo y funcionando.');
  }
});

// El token se leerá desde las variables de entorno por seguridad
client.login(process.env.DISCORD_TOKEN);
