const Discord = require('discord.js');
const mal = require('maljs');
const imdb = require('imdb-api');
const bot = new Discord.Client();
const settings = require('./settings.json');
const functions = require('./functions.js');
var prefixe = '-';

//trigger when bot connect to the server
bot.on('ready', () => {
    console.log('Logged in as ' + bot.user.username);
})

//trigger when a message is sent on the server
bot.on('message', (message) => {
    if(message.author == bot.user) return; //quit if the bot trigger itself
    var command = message.content.split(" ");

    //display an help menu
    if(command[0] == prefixe + 'help' && command.length == 1){
        //TODO
    }

    //roll a dice '-roll [number of faces]'
    if(command[0] == prefixe + 'roll'){
        if(command[1] >= 2 && command.length == 2){
            //flip a coin
            if(command[1] == 2){
                functions.flip(message);
            }
            else{
                var rand = Math.floor(Math.random() * command[1]) + 1;
                message.channel.sendMessage(message.author + ' rolled a ' + rand  + ' from a D' + command[1]);
            }
        }
    }

    //flip a coin '-flip'
    if(command[0] == prefixe + 'flip'){
        if(command.length == 1){
            functions.flip(message);
        }
    }

    //return the ping of the sender
    if(command[0] == prefixe + 'ping' && command.length == 1){
        var dateNow = Date.now() - message.createdTimestamp;
        var authorid = message.author.id;
        var rgb = parseInt('0x' + parseInt(authorid % 256, 16) + parseInt(authorid % 255, 16) + parseInt(authorid % 254, 16)); //make color based on user id
        message.channel.sendEmbed({
            'color' : rgb,
            'title' : 'ping : ' + dateNow + ' ms',
            'author' : { 
                name : message.author.username,
                icon_url : message.author.avatarURL
            },
        });
    }

    //play a vaporwave playlist
    if(command[0] == prefixe + 'vapor' && command.length == 1){
        //TODO
    }

    //make the text Ａｅｓｔｈｅｔｉｃ
    if(command[0] == prefixe + 'wave' && command.length >= 2){
        command.splice(0,1);
        var sentence = command.join(" ");
        var aesthetic = '';
        for(var i=0; i<sentence.length; i++){
            if(sentence[i] >= '!' && sentence[i] <= '~'){
                aesthetic += String.fromCharCode(sentence.charCodeAt(i)+65248);
            }
            else{
                aesthetic += sentence[i];
            }
        }
        message.channel.sendMessage(aesthetic);
    }

    //give the weather '-weather [city]'
    if(command[0] == prefixe + 'weather' && command.length == 2){
        command.splice(0,1);
        var sentence = command.join(" ");
        //TODO
    }

    //reference an anime '-anime [name of anime]'
    if(command[0] == prefixe + 'anime' && command.length >= 2){
        command.splice(0,1);
        var query = command.join(" ");
        mal.quickSearch(query, 'anime').then(function(results) {
            results.anime[1].fetch().then(function(r) {
                var embed = new Discord.RichEmbed()
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

    //reference a manga '-manga [name of manga]'
    if(command[0] == prefixe + 'manga' && command.length >= 2){
        command.splice(0,1);
        var query = command.join(" ");
        mal.quickSearch(query, 'manga').then(function(results) {
            results.manga[0].fetch().then(function(r) {
                var synopsis = r.description.split('[Written by MAL Rewrite]');
                var embed = new Discord.RichEmbed()
                    .setTitle(r.title)
                    .setColor(0x4F74C8)
                    .setThumbnail(r.cover)
                    .setURL('https://myanimelist.net' + r.path)
                    .addField('Manga', 'Score : ' + r.score)
                    .setDescription(synopsis[0]);
                message.channel.send({embed});
            })
        });
    }

    //reference a movie '-movie [name of movie]'
    if(command[0] == prefixe + 'movie' && command.length >= 2){
        command.splice(0,1);
        var sentence = command.join(" ");
        imdb.getReq({name: sentence}, (err, film) => {
            if(err) {
                return console.error(err);
            }
            let movie = film;
            var embed = new Discord.RichEmbed()
                .setTitle(movie.title)
                .setColor(0xF3CE13)
                .setThumbnail(movie.poster)
                .setURL(movie.imdburl)
                .addField(movie.type, movie.year)
                .addField('Genres : ' + movie.genres, 'Run time : ' + movie.runtime)
                .addField('Director : ' + movie.director, 'Rating : ' + movie.rating + '/10')
                .setDescription(movie.plot);
            message.channel.send({embed});
        });
    }
});

//access the bot account
bot.login(settings.token);

