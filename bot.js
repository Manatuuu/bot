const Discord = require('discord.js');
const client = new Discord.Client();

var request = require('request');

let prefix = '-dev '

client.on('ready', () => {
    console.log('I am ready!');
    client.user.setPresence({ game: { name: 'ヘルプ: -dev help', type: 0 } });
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find('name', '参加-join');
    if (!channel) return;
    channel.send(`ようこそ、${member}さん\nここはサーバーの知識を共有する場です\n質問以外の会話は ${member.guild.channels.find('name', 'chat-会話')} で行いましょう\n`);
    member.addRole(member.guild.roles.find('name','Member'));
});
client.on('message', message => {
    if (message.content.startsWith(prefix + 'help')) {
        message.author.send("```diff\n-コマンドヘルプ:\n-dev skunity <search>\n-dev transjp <translate>```");
    }
    else if (message.content.startsWith(prefix + 'skunity')) {
        let args = message.content.split(" ").slice(2);
        message.channel.sendMessage("URL: https://docs.skunity.com/syntax/search/" + args.join("%20"));
    }
    else if (message.content.startsWith(prefix + 'transjp')) {
        let args = message.content.split(" ").slice(2);
        let unk = args.join(" ")
        let fromlang = 'auto';
        let tolang = 'ja';
        let gurl = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + fromlang + "&tl="+tolang+"&dt=t&q=" + unk;
        request(gurl, function(error, response, body) {
            try {
              // body = iconv.decode(body, 'utf8');
              // console.log(bodyWithCorrectEncoding)
                let translated = body.match(/^\[\[\[".+?",/)[0];
                translated = translated.substring(4, translated.length - 2);
                message.channel.sendMessage("```\nTranslated: " + translated + "\n```");
            } catch (err) {
                message.channel.sendMessage("`Input was invalid`");
            }
        });
    }

    if (message.content.includes('discord.gg')) {
        message.delete();
    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
