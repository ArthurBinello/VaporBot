const command = require('./command.js');
const ffmpeg = require('ffmpeg');
const ytdl = require('ytdl-core');
const index = require('../index.js');

module.exports = class vapor extends command {

    static match(message){
        return message.content.startsWith('-vapor');
    }

    static action(message){
        let command = message.content.split(' ');
        if(command.length > 1){ //too many arguments
            message.channel.send('There is too many arguments.');
        }
        else{
            let voiceConnection;
            let channel = message.member.voiceChannel;
            index.channel = channel;
            if(channel != null){
                channel.join()
                .then(connection => {
                    const streamOptions = { seek: 0, volume: 1 };
                    var stream = ytdl('https://www.youtube.com/watch?v=cU8HrO7XuiE&list=RDQM2ODUAO5uACU'); //playlist doesn't work
                    var voiceHandler = connection.playStream(stream, streamOptions);
                })
                .catch(console.error);
                message.channel.send('Joining *' + channel.name + '*...');
            }
            else{ //author not in a channel
                message.channel.send(message.author + ' is not in a voice channel.');
            }
        }
    }
}