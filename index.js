const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});

// Configuración de IDs de canales
const CANAL_BIENVENIDA_ID = 'AQUÍ_TU_ID_DE_BIENVENIDAS';
const CANAL_DESPEDIDA_ID = 'AQUÍ_TU_ID_DE_DESPEDIDAS';

client.once('ready', () => {
  console.log(`¡Mati Nexus Bot iniciado con éxito como ${client.user.tag}!`);
  
  // Establece el estado personalizado de Mati Nexus Bot
  client.user.setActivity('Mati Nexus Bot | !hola', { type: ActivityType.Playing });
});

// Mensaje de Bienvenida
client.on('guildMemberAdd', async (member) => {
  const canal = member.guild.channels.cache.get(CANAL_BIENVENIDA_ID);
  if (!canal) return;

  const mensajeBienvenida = `## 👋 ¡Bienvenido ${member} 🎉
🤗 Que bien que estés aquí!

### Aquí algunas cosas que queremos que hagas:

📋 Lee las https://discord.com/channels/1519541546834198778/1520515386540298441 !
📅 Participa en los eventos!
💬 Chatea con todos!

🚨 Si tienes dudas o quieres reportar a un infractor crea un ticket en https://discord.com/channels/1519541546834198778/1520574884177121462 !

🫂 Que vivas una experiencia inolvidable ◠‿◠ 🧡!
|| <@1484181262058000454> ||`;

  canal.send(mensajeBienvenida);
});

// Mensaje de Despedida
client.on('guildMemberRemove', async (member) => {
  const canal = member.guild.channels.cache.get(CANAL_DESPEDIDA_ID);
  if (!canal) return;

  const mensajeDespedida = `😭 Nuestro miembro **${member.user.tag}** nos ha dejado..`;

  canal.send(mensajeDespedida);
});

// Comando de prueba
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.content === '!hola') {
    message.reply('¡Hola! Soy **Mati Nexus Bot** y estoy activo.');
  }
});

client.login(process.env.DISCORD_TOKEN);
          
