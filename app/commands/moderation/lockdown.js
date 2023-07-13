const Discord = require('discord.js')

module.exports = {
    config: {
        name: "lockdown",
        description: "lock server",
        aliases: []
    },
    run: async (bot, message, args) => {
        let lockPermErr = new Discord.MessageEmbed()
        .setTitle("User Permission Error.")
        .setDescription("you don't have permissions to use this.")
        
        if(!message.channel.permissionsFor(message.member).has("BAN_MEMBERS") ) return message.channel.send(lockPermErr);

        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                })
            })
            
            let lockEmbed = new Discord.MessageEmbed()
                
                .setThumbnail(`https://cdn.discordapp.com/attachments/1124059133193232494/1129032300160626758/healbanner_8ISlARqu.jpg`)
                .setDescription(`**\n\nDone. Server Fully Locked. **`)
                .setColor('#262432')
            return message.channel.send(lockEmbed);

        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                })
            })
            
            let lockEmbed2 = new Discord.MessageEmbed()
                .setColor('#141efe')    
                .setThumbnail(`https://cdn.discordapp.com/attachments/1124059133193232494/1129032300160626758/healbanner_8ISlARqu.jpg`)
                .setDescription(`**\n\nDone. Server Fully Unlocked.`)
            return message.channel.send(lockEmbed2)
        }
    }
}