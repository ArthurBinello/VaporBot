const Discord = require('discord.js');
const bot = new Discord.Client();
const settings = require('./settings.json');
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
                flip(message);
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
            flip(message);
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
        //TODO
    }

    //reference an anime '-anime [name of anime]'
    if(command[0] == prefixe + 'anime' && command.length >= 2){
        //TODO
    }

    //reference a manga '-manga [name of manga]'
    if(command[0] == prefixe + 'manga' && command.length >= 2){
        //TODO
    }

    //reference a movie '-movie [name of movie]'
    if(command[0] == prefixe + 'movie' && command.length >= 2){
        //TODO
    }
});

//access the bot account
bot.login(settings.token);

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