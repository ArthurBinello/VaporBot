const command = require('./command.js');

module.exports = class roll extends command {

    static match(message){
        return message.content.startsWith('-roll');
    }

    static action(message){
        let command = message.content.split(' ');
        let value = Number.parseInt(command[1]);
        if(command.length == 1){ //no arguments specified
            value = 6;
        }
        if(command.length > 2){ //too many arguments
            message.channel.send('There is too many arguments.').then(msg => {
                msg.react('❌');
            });
        }
        else if(Number.isInteger(value)){ //is an integer
            if(value < 2){ //number too low
                return message.channel.send('A dice needs at least two sides.').then(msg => {
                    msg.react('❌');
                });
            }
            else{
                let random = Math.floor(Math.random() * value) + 1;
                message.channel.send(message.author + ' rolled a **' + random + '** from a D' + value).then(msg => {
                    msg.react('❌');
                });
            }
        }
        else{ //not an integer
            message.channel.send("The argument specified isn't an integer.").then(msg => {
                msg.react('❌');
            });
        }
    }
}