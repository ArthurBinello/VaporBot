const command = require('./command.js');
const Discord = require('discord.js');
const mal = require('maljs');

module.exports = class anime extends command {

    static match(message){
        return message.content.startsWith('-anime');
    }

    static action(message){
        let command = message.content.split(' ');
        if(command.length < 2){ //not enough arguments
            message.channel.send("There isn't enough arguments.");
        }
        else{
            command.shift();
            let query = command.join(" ");
            mal.quickSearch(query, 'anime').then(function(results) {
                results.anime[0].fetch().then(function(r) {
                    let embed = new Discord.RichEmbed()
                        .setTitle(r.title)
                        .setColor(0x2E51A2)
                        .setThumbnail(r.cover)
                        .setURL('https://myanimelist.net' + r.path)
                        .addField('Anime', 'Score : ' + r.score)
                        .setDescription(r.description.replace('[Written by MAL Rewrite]', ''));
                    message.channel.send({embed});
                })
            });
        }
    }
}