const Discord = require('discord.js');
const bot = new Discord.Client();

const settings = require('./settings.json');
const roll = require('./commands/roll.js');
const flip = require('./commands/flip.js');
const ping = require('./commands/ping.js');
const vapor = require('./commands/vapor.js');
const stop = require('./commands/stop.js');
const wave = require('./commands/wave.js');
const weather = require('./commands/weather.js');
const anime = require('./commands/anime.js');
const manga = require('./commands/manga.js');
const movie = require('./commands/movie.js');
const donald = require('./commands/donald.js');
const eightball = require('./commands/eightball.js');
const help = require('./commands/help.js');

var channel;

//trigger when bot connect to the server
bot.on('ready', () => {
    console.log('Logged in as ' + bot.user.username);
})

//trigger when a message is sent on the server
bot.on('message', (message) => {
    if(message.author == bot.user) return; //quit if the bot trigger itself
    var command = message.content.split(" ");

    let commandUsed = 
        roll.parse(message) || //roll a dice
        flip.parse(message) || //flip a coin
        ping.parse(message) || //check the ping with the bot
        vapor.parse(message) || //play a vaporwave playlist TODO
        stop.parse(message) || //stop the current music
        wave.parse(message) || //make the text aesthetic
        weather.parse(message) || //display the weather for tomorrow
        anime.parse(message) || //display the related anime
        manga.parse(message) || //display the related manga
        movie.parse(message) || //display the related movie
        donald.parse(message) || //display the last tweet of @realDonaldTrump
        eightball.parse(message) || //answer a given question
        help.parse(message); //display a list of all the commands
    
    if(!commandUsed && message.content.startsWith('-')){
        help.action(message);
    }
});

//access the bot account
bot.login(settings.token);

