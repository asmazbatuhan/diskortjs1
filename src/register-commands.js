require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'hey',
        description: 'kullanici ne yazdiysa onu geri iletir',
        options: [
            {
                name: 'yazi',
                description: 'yazi yaziniz.',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ]
    },

    {
        name: 'whatamiplaying',
        description: 'shows the user what game theyre playing',
    },
    
    {
        name: 'ping',
        description: 'damn nigga',
    },

    {
        name: 'blob',
        description: 'blob blob blob',
    },

    {
        name: 'bilgi',
        description: 'calinti',
    },

    {
        name: 'deneme1',
        description: 'triad',
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
                ),
            { body: commands }
        );

        console.log('Slash commands were registered succesfully')
    } catch (error) {
        console.log(`bi hata oldu: ${error}`);
    } 
})();