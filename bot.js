const Discord = require('discord.js');
const client = new Discord.Client();

let prefix = '-dev '

client.on('ready', () => {
    console.log('I am ready!');
    client.user.setPresence({ game: { name: 'ヘルプ: -dev help', type: 0 } });
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find('name', '参加-join');
    if (!channel) return;
    console.log(member + 'がサーバーに参加しました (' + member.username + ')');
    channel.send(`ようこそ、${member}さん\nここはサーバーの知識を共有する場です\n質問以外の会話は ${member.guild.channels.find('name', 'chat-会話')} で行いましょう\n`);
    member.addRole(member.guild.roles.find('name','Member'));
});
client.on('message', message => {
    if (bot.content.startsWith(prefix + 'help')) {
        message.author.send
        message.author.send("```diff\n-ヘルプ:```");
    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
