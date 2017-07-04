const command = require('./command.js');
const ffmpeg = require('ffmpeg');
const ytdl = require('ytdl-core');
var ytpl = require('ytpl');
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
            ytpl('PLkDIan7sXW2hYtHwy5I2yIG5sACqfX_K8', function(err, playlist) {
                if(err) throw err;
                index.channel = channel;
                if(channel != null){
                    channel.join()
                    .then(connection => {
                        let streamOptions = { seek: 0, volume: 1 };
                        let firstSong = Math.floor(Math.random() * playlist.items.length);
                        let stream = ytdl(playlist.items[firstSong].url_simple);
                        let voiceHandler = connection.playStream(stream, streamOptions).on('end', () => {
                            vapor.play(playlist, firstSong);
                        })
                    })
                    .catch(console.error);
                    message.channel.send('Playing Vaporwave in *' + channel.name + '*...');
                }
                else{ //author not in a channel
                    message.channel.send(message.author + ' is not in a voice channel.');
                }
            });
            
        }
    }

    static play(playlist, previous){
        let song = 0;
        do{
            song = Math.floor(Math.random() * playlist.items.length);
        }while(song == previous);
        if(index.channel != null){
            let streamOptions = { seek: 0, volume: 1 };
            let stream = ytdl(playlist.items[song].url_simple);
            let voiceHandler = index.channel.connection.playStream(stream, streamOptions).on('end', () => {
                vapor.play(playlist, song);
            });
        }
    }
}