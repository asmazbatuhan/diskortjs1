require('dotenv').config();
const { Client, IntentsBitField, userMention, Activity, Application, TeamMember, GuildMember } = require('discord.js');


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent, 
        IntentsBitField.Flags.GuildPresences,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} goreve hazir`);

    handleUserEventsFile();
});


client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }
        if (message.content === 'tayyip') {
            message.reply('sg tayyibinin amina koyum');
        }
})


client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hey') {
        const cumle = interaction.options.get('yazi').value;

        interaction.reply(`selam, <@${interaction.user.id}> bunu mu dememi istedin '' ${cumle} '' `)
    } 
    if (interaction.commandName === 'whatamiplaying') {
        const aktivite = interaction.member?.presence?.activities[0];
        
        if (!interaction.member.presence.activities || interaction.member.presence.activities.length === 0)
        interaction.reply(`selam <@${interaction.user.id}> şuanda bir şey oynamıyorsun`);

        else if (interaction.member?.presence?.activities[0].name === 'Spotify') 
        interaction.reply(`selam <@${interaction.user.id}> şuanda bir şey oynamıyorsun fakat spotifyda müzik dinliyorsun.
\`işte dinlediğin müzik ile alakalı bazı bilgiler:
    Şarkı ismi: ${aktivite.details}
    Şarkıyı yapan sanatçı: ${aktivite.state}
    Şarkının içinde bulunduğu albüm: ${aktivite.assets.largeText} \` `); 
        

        else if (interaction.member?.presence?.activities[0].name === 'Custom Status') 
        interaction.reply(`selam <@${interaction.user.id}> şuanda bir şey oynamıyorsun, custom statusun bu: \`"${interaction.member?.presence?.activities[0].state}"\` `); 
        
        else interaction.reply(`şuan oynadiginiz oyun: ${aktivite} `);
    }
    if (interaction.commandName === 'blob') {
    interaction.channel.send('ALLRIGHT🔥🔥🔥').then(sentMessage => {
        sentMessage.react('🤝');
        sentMessage.react('🔥');
        sentMessage.react('💣');
        sentMessage.react('🧨');
    });
}

if (interaction.commandName === 'bilgi') {
interaction.guild.members.fetch({ withPresences: true }).then(fetchedMembers => {
	const totalOnline = fetchedMembers.filter(member => member.presence?.status === 'online');
	interaction.reply(`baba toplam ${totalOnline.size} kisi acik`);
});
}

if (interaction.commandName === 'deneme1') {
        interaction.channel.send("@everyone ");
}
});
/* dinlenmede şuan bu >>
client.on('presenceUpdate', (oldPresence, newPresence) => { 
    if (newPresence.activities.length > 0) {
      const game = newPresence.activities[0].name;
      
        if (game.type === 'Oynuyor') {
        const channel = client.channels.cache.get('1146212182401486968');
        if (channel) {
          channel.send(`${newPresence.member.user.tag} şu anda ${game} oynuyor!`);
        }
      }
    }
});
*/
const fs = require('fs');
const path = require('path');

handleUserEventsFile();


client.on('presenceUpdate', (oldPresence, newPresence) => {

  const oldGame = oldPresence?.activities.find(activity => activity.type === 'PLAYING');
  const newGame = newPresence?.activities.find(activity => activity.type === 'PLAYING');
  console.log(newPresence);
    
  
  const userId = newPresence.user.id;
  const gameName = newPresence.activities[0] ? newPresence.activities[0] : null;
  const eventTimestamp = new Date().toISOString();


  insertGameEvent(userId, gameName, eventTimestamp);
});

function handleUserEventsFile() {
    const fileName = 'user_events.txt';
    const archiveFolder = 'archive';
    const eventsArchivePrefix = 'events_archive';
  
    const currentTimestamp = Date.now();
    const archivedFileName = `${eventsArchivePrefix}_${currentTimestamp}_${fileName}`;
  
    const filePath = path.join(__dirname, fileName);
    const archivePath = path.join(__dirname, archiveFolder, archivedFileName);
  

  if (fs.existsSync(filePath)) {

    if (!fs.existsSync(path.join(__dirname, archiveFolder))) {
      fs.mkdirSync(path.join(__dirname, archiveFolder));
    }

  
    fs.renameSync(filePath, archivePath);
    console.log(`Moved existing ${fileName} to ${archivePath}`);
  } else {
  
    fs.writeFileSync(filePath, '');
    console.log(`Created ${fileName}`);
  }
}

function insertGameEvent(userId, gameName, eventTimestamp) {
  const fileName = 'user_events.txt';
  const filePath = path.join(__dirname, fileName);

 
  const csvString = `${userId},${gameName || 'null'},${eventTimestamp}\n`;

  
  fs.appendFileSync(filePath, csvString);
  console.log(`Inserted game event for user ${userId} (${gameName}) at ${eventTimestamp}`);
}



client.login(process.env.TOKEN);