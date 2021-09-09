const Discord = require("discord.js");
const fs = require("fs")
require('dotenv').config()
const client = new Discord.Client();
client.commands = new Discord.Collection();
const files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for(i of files){ 
    const command = require(`./commands/${i}`)
    client.commands.set(i.slice(0,-3), command);
}

client.on("ready", () => {
    console.log(client.user.tag + " is ready!")
})

client.on("message", msg => {
    if (!msg.content.startsWith(process.env.prefix) || msg.author.bot) {
        return
    }
    let args = msg.content.slice(process.env.prefix.length).trim().split(/ +/);
    let command = args.shift().toLowerCase()
    if(!client.commands.has(command)) return
    try {
        client.commands.get(command).execute(msg,args,client)
    } catch (err) {
        console.log(err);
        msg.channel.send("hehe error contact dip lmao")
    }
})



client.login(process.env.TOKEN)