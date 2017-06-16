const Discord = require('discord.js');
const mal = require('maljs');
const imdb = require('imdb-api');
const weather = require('weather-js');
const latestTweets = require('latest-tweets');
const ffmpeg = require('ffmpeg');
const ytdl = require('ytdl-core');
const bot = new Discord.Client();
const settings = require('./settings.json');
const functions = require('./functions.js');
var prefixe = '-';
var channel;

//trigger when bot connect to the server
bot.on('ready', () => {
    console.log('Logged in as ' + bot.user.username);
})

//trigger when a message is sent on the server
bot.on('message', (message) => {
    if(message.author == bot.user) return; //quit if the bot trigger itself
    var command = message.content.split(" ");

    //roll a dice '-roll [number of faces]'
    if(command[0] == prefixe + 'roll'){
        command[1] = Math.floor(command[1]);
        if(command[1] >= 2 && command.length == 2){
            //flip a coin
            if(command[1] == 2){
                functions.flip(message);
            }
            else{
                var rand = Math.floor(Math.random() * command[1]) + 1;
                message.channel.sendMessage(message.author + ' rolled a **' + rand  + '** from a D' + command[1]);
            }
        }
        else{
            var rand = Math.floor(Math.random() * 6) + 1;
            message.channel.sendMessage(message.author + ' rolled a **' + rand  + '** from a D6');
        }
    }

    //flip a coin '-flip'
    else if(command[0] == prefixe + 'flip'){
        if(command.length == 1){
            functions.flip(message);
        }
    }

    //return the ping of the sender
    else if(command[0] == prefixe + 'ping' && command.length == 1){
        var dateNow = Date.now() - message.createdTimestamp;
        var authorid = message.author.id;
        var rgb = parseInt('0x' + parseInt(authorid % 256, 16) + parseInt(authorid % 255, 16) + parseInt(authorid % 254, 16)); //make color based on user id
        message.channel.sendEmbed({
            'color' : rgb,
            'title' : 'ping : **' + dateNow + '** ms',
            'author' : { 
                name : message.author.username,
                icon_url : message.author.avatarURL
            },
        });
    }

    //play a vaporwave playlist
    else if(command[0] == prefixe + 'vapor' && command.length == 1){
        var voiceConnection;
        channel = message.member.voiceChannel;
        channel.join()
            .then(connection => {
                const streamOptions = { seek: 0, volume: 1 };
                var stream = ytdl('https://www.youtube.com/watch?v=cU8HrO7XuiE&list=RDQM2ODUAO5uACU'); //playlist doesn't work
                var voiceHandler = connection.playStream(stream, streamOptions);
            })
            .catch(console.error);
        message.channel.sendMessage('Ｊｏｉｎｉｎｇ　' + channel.name + '．．．');
    }

    else if(command[0] == prefixe + 'stop' && command.length == 1){
        if(channel != null){
            channel.leave();
        }
    }

    //make the text Ａｅｓｔｈｅｔｉｃ '-wave [text to change]'
    else if(command[0] == prefixe + 'wave' && command.length >= 2){
        command.splice(0,1);
        var sentence = command.join(" ");
        var aesthetic = '';
        for(var i=0; i<sentence.length; i++){
            if(sentence[i] == ' '){
                aesthetic += '   '
            }
            else if(sentence[i] >= '!' && sentence[i] <= '~'){
                aesthetic += String.fromCharCode(sentence.charCodeAt(i)+65248);
            }
            else{
                aesthetic += sentence[i];
            }
        }
        message.channel.sendMessage(aesthetic);
    }

    //give the weather '-weather [city]'
    else if(command[0] == prefixe + 'weather' && command.length >= 2){
        command.splice(0,1);
        var sentence = command.join(" ");
        weather.find({search: sentence, degreeType: 'C'}, function(err, result) {
            if(err) return console.error(err);
            var day = result[0]['current'].shortday;
            var tomorrowTemp = (parseFloat(result[0]['forecast'][2].low) + parseFloat(result[0]['forecast'][2].high)/2).toString();
            var embed = new Discord.RichEmbed()
                .setTitle(result[0]['location'].name)
                .setColor(0xBDF7FF)
                .setFooter(result[0]['current'].date + ' ' + result[0]['current'].observationtime)
                .addField('Today : ' + result[0]['current'].skytext, result[0]['current'].temperature + '°C')
                .addField('Tomorrow : ' + result[0]['forecast'][2].skytextday, tomorrowTemp + '°C')
                .setThumbnail(result[0]['current'].imageUrl);
            message.channel.send({embed});
        })
    }

    //reference an anime '-anime [name of anime]'
    else if(command[0] == prefixe + 'anime' && command.length >= 2){
        command.splice(0,1);
        var query = command.join(" ");
        mal.quickSearch(query, 'anime').then(function(results) {
            results.anime[0].fetch().then(function(r) {
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
    else if(command[0] == prefixe + 'manga' && command.length >= 2){
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
    else if(command[0] == prefixe + 'movie' && command.length >= 2){
        command.splice(0,1);
        var sentence = command.join(" ");
        imdb.getReq({name: sentence}, (err, result) => {
            if(err) return console.error(err);
            let movie = result;
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

    //display the last tweet of @realDonaldTrump
    else if(command[0] == prefixe + 'donald' && command.length == 1){
        latestTweets('realDonaldTrump', function (err, tweets) {
            var text = tweets[0].content;
            text = text.split("pic.twitter");
            var embed = new Discord.RichEmbed()
                .setTitle(tweets[0].username)
                .setDescription(text[0])
                .setColor(0x4099FF)
                .setURL(tweets[0].url)
                .setTimestamp(tweets[0].date)
                .setAuthor("Donald J. Trump", "https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg", "https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg");
            if(text.length == 2) {
                embed.setImage("https://pic.twitter" + text[1])
            }
            message.channel.send({embed});
        });
    }

    else if(command[0] == prefixe + '8ball' && command.length >= 2 && command[command.length-1].endsWith('?')){
        var rand = Math.floor(Math.random() * 20) + 1;
        var answer;
        switch(rand){
            case 1 : answer = "it is certain.";
                break;
            case 2 : answer = "it is decidedly so.";
                break;
            case 3 : answer = "without a doubt.";
                break;
            case 4 : answer = "yes definitely.";
                break;
            case 5 : answer = "You may rely on it.";
                break;
            case 6 : answer = "as I see it, yes.";
                break;
            case 7 : answer = "most likely.";
                break;
            case 8 : answer = "outlook good.";
                break;
            case 9 : answer = "yes.";
                break;
            case 10 : answer = "signs point to yes.";
                break;
            case 11 : answer = "reply hazy try again.";
                break;
            case 12 : answer = "ask again later.";
                break;
            case 13 : answer = "better not tell you now.";
                break;
            case 14 : answer = "cannot predict now.";
                break;
            case 15 : answer = "concentrate and ask again.";
                break;
            case 16 : answer = "don't count on it.";
                break;
            case 17 : answer = "my reply is no.";
                break;
            case 18 : answer = "my sources say no.";
                break;
            case 19 : answer = "outlook not so good.";
                break;
            case 20 : answer = "very doubtful.";
                break;
        }
        message.reply(answer);
    }

    //display an help menu
    else if(command[0].startsWith(prefixe)){
        //TODO
        if(command[0] != prefixe + 'help' && command.length != 1) message.channel.sendMessage('This command does not exist.');
        message.channel.sendMessage('Ｌｉｓｔ   ｏｆ   ｃｏｍｍａｎｄｓ   ：\n-roll [number of faces]\n-flip\n-ping\n-wave [text to change]\n-weather [city]\n-anime [name of anime]\
        \n-manga [name of manga]\n-movie [name of movie]\n-8ball [question]\n');
    }
});

//access the bot account
bot.login(settings.token);

