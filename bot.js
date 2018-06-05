const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('guildMemberAdd', member => {
    member.addRole(member.guild.roles.find('name','Member'));
});
client.on('message', message => {
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
