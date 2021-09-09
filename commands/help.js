const { MessageEmbed, Collection } = require("discord.js")
const { readdirSync } = require("fs")
require('dotenv').config()


module.exports = {
    name: "help",
    description: "Help",
    execute(msg, args, client) {
        const commands = new Collection()
        const files = readdirSync(__dirname).filter(file => file.endsWith('.js'))
        for (i of files) {
            const command = require(__dirname + `\\${i}`)
            commands.set(i.slice(0, -3), command);
        }
        const embed = new MessageEmbed()
            .setColor("#000000")
            .setTitle("Help")
            .setDescription("help for youuu")
            .setTimestamp()
            .setFooter('by dip#1851')
        for(e of commands){
            embed.addField(process.env.prefix+e[1].name,e[1].description)
        }
        msg.channel.send(embed)
    }
}