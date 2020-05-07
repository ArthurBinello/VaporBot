const command = require('./command.js');
const Discord = require('discord.js');

module.exports = class ping extends command {

    static match(message){
        return message.content.startsWith('-ping');
    }

    static action(message){
        let command = message.content.split(' ');
        if(command.length > 1){ //too many arguments
            message.channel.send('There is too many arguments.').then(msg => {
                msg.react('❌');
            });
        }
        else{
            let APIdelay = Date.now() - message.createdTimestamp;
            let authorid = message.author.id;

            let colors = [0, 255, authorid % 256];
            if(authorid % 2){
                let temp = colors[0];
                colors[0] = colors[2];
                colors[2] = temp;
            }
            let nbShift = authorid % 3;
            while(nbShift > 0){
                let temp = colors[0];
                colors[0] = colors[1];
                colors[1] = colors[2];
                colors[2] = temp;
                nbShift--;
            }
            let rgb = parseInt('0x' + parseInt(colors[0], 16) + parseInt(colors[1], 16) + parseInt(colors[2], 16)); //make color based on user ID

            message.channel.send("embed").then(msg => {
                let latency = msg.createdTimestamp - message.createdTimestamp
                var embed = new Discord.RichEmbed()
                    .setTitle('🏓 **Pong!**')
                    .setDescription("**Latency**\n" + latency + "ms\n**API**\n" + APIdelay + 'ms')
                    .setColor(rgb)
                    .setFooter(message.author.username, message.author.avatarURL);
                msg.edit({embed});
                msg.react('❌');
            });
        }
    }
}