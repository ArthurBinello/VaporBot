const command = require('./command.js');

module.exports = class eightball extends command {

    static match(message){
        return message.content.startsWith('-8ball');
    }

    static action(message){
        let command = message.content.split(' ');
        if(command.length < 2){ //not enough arguments
            message.channel.send("There isn't enough arguments.");
        }
        else if(command[command.length-1].endsWith('?')){
            var rand = Math.floor(Math.random() * 20) + 1;
            var answer;
            switch(rand){
                case 1 : answer = "it is certain.";
                    break;
                case 2 : answer = "it is decidedly so.";
                    break;
                case 3 : answer = "without a doubt.";
                    break;
                case 4 : answer = "yes definitely.";
                    break;
                case 5 : answer = "You may rely on it.";
                    break;
                case 6 : answer = "as I see it, yes.";
                    break;
                case 7 : answer = "most likely.";
                    break;
                case 8 : answer = "outlook good.";
                    break;
                case 9 : answer = "yes.";
                    break;
                case 10 : answer = "signs point to yes.";
                    break;
                case 11 : answer = "reply hazy try again.";
                    break;
                case 12 : answer = "ask again later.";
                    break;
                case 13 : answer = "better not tell you now.";
                    break;
                case 14 : answer = "cannot predict now.";
                    break;
                case 15 : answer = "concentrate and ask again.";
                    break;
                case 16 : answer = "don't count on it.";
                    break;
                case 17 : answer = "my reply is no.";
                    break;
                case 18 : answer = "my sources say no.";
                    break;
                case 19 : answer = "outlook not so good.";
                    break;
                case 20 : answer = "very doubtful.";
                    break;
            }
            message.reply(answer);
        }
        else{
            message.channel.send('This is not a question');
        }
    }
}