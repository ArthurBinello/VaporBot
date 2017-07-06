const command = require('./command.js');
const index = require('../index.js');

module.exports = class stop extends command {

    static match(message){
        return message.content.startsWith('-stop');
    }

    static action(message){
        let command = message.content.split(' ');
        if(command.length > 1){ //too many arguments
            message.channel.send('There is too many arguments.').then(msg => {
                msg.react('❌');
            });
        }
        else{
            if(index.channel != null){
                index.channel.leave();
                index.channel = null;
            }
        }
    }
}