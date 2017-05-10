const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('message', (message) => {
    if(message.content == 'ping'){
        //message.reply('pong');
        message.channel.sendMessage('pong');
    }
});

bot.login('MzExMTgxNzI0MTQ0ODkzOTUy.C_TpYw.Ym-XFmtjCOhO3SmtFM7zhdyfFmk');
