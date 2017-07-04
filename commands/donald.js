const command = require('./command.js');
const Discord = require('discord.js');
const latestTweets = require('latest-tweets');

module.exports = class ping extends command {

    static match(message){
        return message.content.startsWith('-donald');
    }

    static action(message){
        let command = message.content.split(' ');
        if(command.length > 1){ //too many arguments
            message.channel.send('There is too many arguments.');
        }
        else{
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
                /*if(text.length == 2) {
                    embed.setImage("https://pic.twitter" + text[1])
                }*/ //TODO pic.twitter refers to the tweet itself and not the image
                message.channel.send({embed});
            });
        }
    }
}