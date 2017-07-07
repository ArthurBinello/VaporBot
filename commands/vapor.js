const command = require('./command.js');
const ffmpeg = require('ffmpeg');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const index = require('../index.js');

var lastSong;
var messageSent;
var listPlay;
var voiceConnection;
var broadcast;

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
            let channel = message.member.voiceChannel;
            ytpl('PLkDIan7sXW2hYtHwy5I2yIG5sACqfX_K8', function(err, playlist) {
                if(err) throw err;
                index.channel = channel;
                if(channel != null){
                    channel.join()
                    .then(connection => {
                        voiceConnection = connection;
                        listPlay = playlist;
                        let streamOptions = { seek: 0, volume: 1 };
                        lastSong = Math.floor(Math.random() * listPlay.items.length);
                        let stream = ytdl(listPlay.items[lastSong].url_simple, { filter : 'audioonly' });
                        if(listPlay.items[lastSong].title != null){
                            messageSent.edit('Playing : *' + listPlay.items[lastSong].title + '*');
                        }
                        let voiceHandler = connection.playStream(stream, streamOptions).on('end', () => {
                            vapor.play();
                        });
                    })
                    .catch(console.error);
                    message.channel.send('Playing Vaporwave in *' + channel.name + '*...').then(msg => {
                        messageSent = msg;
                        msg.react('🔳');
                    });
                }
                else{ //author not in a channel
                    message.channel.send(message.author + ' is not in a voice channel.').then(msg => {
                        msg.react('❌');
                    });
                }
            });
            
        }
    }

    static play(){
        let song = 0;
        do{
            song = Math.floor(Math.random() * listPlay.items.length);
        }while(song == lastSong);
        if(index.channel != null){
            lastSong = song;
            let streamOptions = { seek: 0, volume: 1 };
            let stream = ytdl(listPlay.items[song].url_simple, { filter : 'audioonly' });
            if(listPlay.items[lastSong].title != null){
                messageSent.edit('Playing : *' + listPlay.items[lastSong].title + '*');
            }
            let voiceHandler = voiceConnection.playStream(stream, streamOptions).on('end', () => {
                vapor.play();
            });
        }
    }
}