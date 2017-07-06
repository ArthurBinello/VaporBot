const command = require('./command.js');

module.exports = class wave extends command {

    static match(message){
        return message.content.startsWith('-wave');
    }

    static action(message){
        let command = message.content.split(' ');
        if(command.length < 2){ //not enough arguments
            message.channel.send("There isn't enough arguments.").then(msg => {
                msg.react('❌');
            });
        }
        else{
            command.shift();
            var sentence = command.join(" ");
            var aesthetic = '';
            for(var i=0; i<sentence.length; i++){
                if(sentence[i] == ' '){
                    aesthetic += '   '
                }
                else if(sentence[i] >= '!' && sentence[i] <= '~'){
                    aesthetic += String.fromCharCode(sentence.charCodeAt(i)+65248);
                }
                else{
                    aesthetic += sentence[i];
                }
            }
            message.channel.send(aesthetic).then(msg => {
                msg.react('❌');
            });
        }
    }
}