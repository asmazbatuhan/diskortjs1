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
	// Now you have a collection with all online member objects in the totalOnline variable
	interaction.reply(`baba toplam ${totalOnline.size} kisi acik`);
});
}

if (interaction.commandName === 'deneme1') {
        interaction.channel.send("@everyone ");
}
});

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

client.login(process.env.TOKEN);