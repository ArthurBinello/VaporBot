const command = require('./command.js');
const Discord = require('discord.js');
const nameToImdb = require("name-to-imdb");
var imdb = require('imdb');

module.exports = class movie extends command {

    static match(message){
        return message.content.startsWith('-movie');
    }

    static action(message){
        let command = message.content.split(' ');
        if(command.length < 2){ //not enough arguments
            message.channel.send("There isn't enough arguments.");
        }
        else{
            command.shift();
            var title = command.join(" ");
            nameToImdb({name : title}, function(err, res, inf){
                if(err) return console.error(err);
                if(res != null){
                    imdb(res, function(error, data){
                        if(error) return console.error(error);
                        if(data){
                            let embed = new Discord.RichEmbed()
                                .setTitle(data.title)
                                .setColor(0xF3CE13)
                                .setThumbnail(data.poster)
                                .setURL('http://www.imdb.com/title/' + res)
                                .addField(data.contentRating, data.year)
                                .addField('Genres : ' + data.genre, 'Run time : ' + data.runtime)
                                .addField('Director : ' + data.director, 'Rating : ' + data.rating + '/10')
                                .setDescription(data.description);
                            message.channel.send({embed});
                        }
                        else{
                            message.channel.send('There has been an error with IMDB.');
                        }
                    })
                }
                else{
                    message.channel.send('This movie does not exist.');
                }
            })
        }
    }
}