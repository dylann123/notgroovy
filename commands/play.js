const ytaudio = require("yt-audio-link");
const opus = require("@discordjs/opus")
const ytsearch = require("youtube-search-api")

module.exports = {
    name: "play",
    description: "Play youtube audio into your voice call.",
    execute(msg, args, client) {
        let start = new Date().getTime()
        if (msg.member.voice.channel == undefined) {
            return msg.channel.send("`You must join a voice channel first!`")
        }
        let vc = msg.member.voice.channel
        let url = args[0]
        let title = "";
        if (!args[0].startsWith("https://")) {
            ytsearch.GetListByKeyword(args.join(" ")).then(e => {
                url = "https://www.youtube.com/watch?v=" + e['items'][0].id
                title = e['items'][0].title
                playSong()
            })
        } else {
            playSong()
        }
        msg.channel.send("`Finding song...`")
        async function playSong() {
            try {
                const result = await ytaudio(url)
                console.log(url + " - " + title + " || Requested by " + msg.author.username)
                let stop = new Date().getTime()
                msg.channel.send("`Finished loading` " + url + " `in " + (stop - start).toString() + "ms. Joining voice channel` <#" + vc + ">")
                vc.join().then(connection => {
                    const dispatcher = connection.play(result)
                    dispatcher.on("speaking", speaking => {if(!speaking) {vc.leave()}})
                }).catch(err => {
                    msg.channel.send("`an error occurred!`")
                    console.log(err)
                })
            } catch (err) {
                console.log(err)
                return msg.channel.send("`Sorry, but that video could not be found.`")
            }
        }
    }
}