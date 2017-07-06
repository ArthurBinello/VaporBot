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
            let dateNow = Date.now() - message.createdTimestamp;
            let authorid = message.author.id;
            let rgb = parseInt('0x' + parseInt(authorid % 256, 16) + parseInt(authorid % 255, 16) + parseInt(authorid % 254, 16)); //make color based on user ID
            var embed = new Discord.RichEmbed()
                .setTitle('ping : **' + dateNow + '** ms')
                .setColor(rgb)
                .setAuthor(message.author.username, message.author.avatarURL);
            message.channel.send({embed}).then(msg => {
                msg.react('❌');
            });
        }
    }
}