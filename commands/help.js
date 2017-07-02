const command = require('./command.js');

module.exports = class ping extends command {

    static match(message){
        return message.content.startsWith('-help');
    }

    static action(message){
        //TODO
        message.channel.send('Ｌｉｓｔ   ｏｆ   ｃｏｍｍａｎｄｓ   ：\n \
        -roll [number]\n \
        -flip\n \
        -ping\n \
        -vapor\n \
        -stop\n \
        -wave [text]\n \
        -weather [city]\n \
        -anime [name]\n\ \
        -manga [name]\n \
        -movie [name]\n \
        -donald\n \
        -8ball [question]\n \
        -aesthetic\n');
    }
}