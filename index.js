const Discord = require('discord.js');
const bot = new Discord.Client();
const settings = require('./settings.json');
var prefixe = '>';
var command;

//trigger when bot connect to the server
bot.on('ready', () => {
    console.log('Logged in as ' + bot.user.username);
})

//trigger when a message is sent on the server
bot.on('message', (message) => {
    if(message.author == bot.user) return; //quit if the bot trigger itself
    command = message.content.split(" ");

    //roll a dice '>roll [number of faces]'
    if(command[0] == prefixe + 'roll'){
        if(command[1] >= 2 && command.length == 2){
            //flip a coin
            if(command[1] == 2){
                flip(message);
            }
            else{
                var rand = Math.floor(Math.random() * command[1]) + 1;
                message.channel.sendMessage(message.author + ' rolled a ' + rand  + ' from a D' + command[1]);
            }
        }
    }

    //flip a coin '>flip'
    if(command[0] == prefixe + 'flip'){
        if(command.length == 1){
            flip(message);
        }
    }
});

//flip a coin
function flip(message){
    var coin = Math.floor(Math.random() * 2);
    var side;
    if(coin == 0){
        side = 'Head';
    }
    else{
        side = 'Tail';
    }
    message.channel.sendMessage(message.author + ' flipped a coin and landed on ' + side);
}

bot.login(settings.token);
