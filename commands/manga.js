const command = require('./command.js');
const Discord = require('discord.js');
const mal = require('maljs');

module.exports = class manga extends command {

    static match(message){
        return message.content.startsWith('-manga');
    }

    static action(message){
        let command = message.content.split(' ');
        if(command.length < 2){ //not enough arguments
            message.channel.send("There isn't enough arguments.").then(msg => {
                msg.react('❌');
            });
        }
        else{
            command.shift();
            let query = command.join(" ");
            mal.quickSearch(query, 'manga').then(function(results) {
                results.manga[0].fetch().then(function(r) {
                    let synopsis = r.description.split('[Written by MAL Rewrite]');
                    let embed = new Discord.RichEmbed()
                        .setTitle(r.title)
                        .setColor(0x4F74C8)
                        .setThumbnail(r.cover)
                        .setURL('https://myanimelist.net' + r.path)
                        .addField('Manga', 'Score : ' + r.score)
                        .setDescription(synopsis[0]);
                    message.channel.send({embed}).then(msg => {
                        msg.react('❌');
                    });
                })
            });
        }
    }
}