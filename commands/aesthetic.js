const command = require('./command.js');
const reddit = require('redwrap');
const Discord = require('discord.js');

module.exports = class ping extends command {

    static match(message){
        return message.content.startsWith('-aesthetic');
    }

    static action(message){
        let command = message.content.split(' ');
        if(command.length > 1){ //too many arguments
            message.channel.send('There is too many arguments.');
        }
        else{
            let max = 100;
            reddit.r('VaporwaveAesthetics').sort('top').from('all').limit(max, function(err, data, res){
                if(err) return console.error(err);
                let nb = 0;
                do{
                    nb = Math.floor(Math.random() * max);
                }while(!data.data.children[nb].data.url.endsWith('.jpg' || '.png' || '.gif'));
                let embed = new Discord.RichEmbed()
                    .setTitle(data.data.children[nb].data.title)
                    .setColor(0xFF6AD5)
                    .setURL('http://reddit.com' + data.data.children[nb].data.permalink)
                    .setImage(data.data.children[nb].data.url)
                message.channel.send({embed});
            });
        }
    }
}