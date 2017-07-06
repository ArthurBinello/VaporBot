const command = require('./command.js');
const Discord = require('discord.js');
const weatherAPI = require('weather-js');

module.exports = class weather extends command {

    static match(message){
        return message.content.startsWith('-weather');
    }

    static action(message){
        let command = message.content.split(' ');
        if(command.length < 2){ //not enough arguments
            message.channel.send("There isn't enough arguments.").then(msg => {
                msg.react('❌');
            });
        }
        else if(command.length > 2){ //too many arguments
            message.channel.send("There is too many arguments.").then(msg => {
                msg.react('❌');
            });
        }
        else{
            command.shift();
            var sentence = command.join(" ");
            weatherAPI.find({search: sentence, degreeType: 'C'}, function(err, result) {
                if(err) return console.error(err);
                if(result[0] == null){
                    return message.channel.send('This city does not exist.');
                }
                var day = result[0]['current'].shortday;
                var tomorrowTemp = (parseFloat(result[0]['forecast'][2].low) + parseFloat(result[0]['forecast'][2].high)/2).toString();
                var embed = new Discord.RichEmbed()
                    .setTitle(result[0]['location'].name)
                    .setColor(0xBDF7FF)
                    .setFooter(result[0]['current'].date + ' ' + result[0]['current'].observationtime)
                    .addField('Current : ' + result[0]['current'].skytext, result[0]['current'].temperature + '°C')
                    .addField('Tomorrow : ' + result[0]['forecast'][2].skytextday, tomorrowTemp + '°C')
                    .setThumbnail(result[0]['current'].imageUrl);
                message.channel.send({embed}).then(msg => {
                    msg.react('❌');
                });
            });
        }
    }
}