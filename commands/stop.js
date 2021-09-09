module.exports = {
    name: "stop",
    description: "Stops the current song",
    execute(msg,args,client){
        msg.member.voice.channel.leave()
        msg.channel.send("`Stopped Music!`")
    }
}