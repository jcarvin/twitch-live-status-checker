module.exports = {
    name: 'ping',
    description: 'this bot replies with ping to pong.',
    execute(message, args){
        message.channel.send('pong!');
    }
}