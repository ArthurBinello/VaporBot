module.exports = {
    flip : function flip(message){
        var coin = Math.floor(Math.random() * 2);
        var side;
        if(coin == 0){
            side = 'Head';
        }
        else{
            side = 'Tail';
        }
        message.channel.sendMessage(message.author + ' flipped a coin and landed on ' + side);
    }
}
//flip a coin
