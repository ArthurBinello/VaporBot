const command = require('./command.js');

module.exports = class flip extends command {

    static match(message){
        return message.content.startsWith('-flip');
    }

    static action(message){
        let command = message.content.split(' ');
        if(command.length > 2){ //too many arguments
            message.channel.send('There is too many arguments.').then(msg => {
                msg.react('❌');
            });
        }
        else if(command.length < 2){ //not enough arguments
            message.channel.send("There isn't enough arguments.").then(msg => {
                msg.react('❌');
            });
        }
        else if(command[1] != 'head' && command[1] != 'tails'){ //bad bet
            message.channel.send("The bet needs to be written *head* or *tails*").then(msg => {
                msg.react('❌');
            });
        }
        else{
            let coin = Math.floor(Math.random() * 2);
            let result;
            if(coin == 0){
                if(command[1] == 'head'){
                    result = 'ＳＵＣＣＥＳＳ！ ';
                }
                else{
                    result = 'ＦＡＩＬＵＲＥ！ ';
                }
                message.channel.send(result + message.author + ' flipped a coin and landed on **Head**').then(msg => {
                    msg.react('❌');
                });
            }
            else{
                if(command[1] == 'tails'){
                    result = 'ＳＵＣＣＥＳＳ！ ';
                }
                else{
                    result = 'ＦＡＩＬＵＲＥ！ ';
                }
                message.channel.send(result + message.author + ' flipped a coin and landed on **Tails**').then(msg => {
                    msg.react('❌');
                });
            }
        }
    }
}