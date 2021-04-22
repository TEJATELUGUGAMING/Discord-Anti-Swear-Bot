// Request the discord.js modules
// To install do npm install discord.js
const Discord = require("discord.js");

// Request the Discord Client
const client = new Discord.Client();

// Find the config file/request it.
// If you're file from the config is located
// somewhere else please change it here.
const config = require("./config.json");

// Request the FileServer
const fs = require("fs");

// Login the discord bot using Discord Client
client.login(config.token)
client.on('ready', () => {
  console.log(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`);
});
// Log the startup + make a status
client.on("ready", async => {
    // Log that the bot started
    console.log(`Antiswear-bot started.`)
})

// Create the antiswear message event
client.on("message", async message  => {
    
    // Request the file
    var noWords = JSON.parse(fs.readFileSync("./words/blockedWords.json"));
    // Check if CAPS or cApS are
    var msg = message.content.toLowerCase();

    // Check the blockedWords, and if so remove the message 
    // And tell the user to not say that.

    for (let i = 0; i < noWords["blockedWords"].length; i++) {

        // Check the message
        if (msg.includes(noWords["blockedWords"] [i])) {
            // Remove message
             const  warn = message.guild.roles.cache.find(guild => guild.name === 'warn');
        const Muted = message.guild.roles.cache.find(guild => guild.name === 'Muted');

if(message.member.roles.cache.some(role => role.name === 'warn')) {
      if (!message.guild.me.hasPermission('MANAGE_ROLES')) return;
      if (!message.guild.me.hasPermission('MANAGE_GUILD')) return;
     
    message.delete()
    message.reply(`:zipper_mouth:  You were given a 5-minute death for using inappropriate words`, message.channel);
	   
    message.member.roles.add(Muted);
    setTimeout(() => {    
    message.member.roles.remove(Muted);
    message.member.roles.remove(warn);
},  300000)//لتغير مدة لميوت
}

    else{
      if (!message.guild.me.hasPermission('MANAGE_ROLES')) return;
      if (!message.guild.me.hasPermission('MANAGE_GUILD')) return;
    message.delete()
   
    message.reply(`:angry: You've been given an ultimatum to use bad words.`, message.channel);
  return  message.member.roles.add(warn);
    
  }
        
            // Send the message and remove the message after 1 second.
        

        }
    }
})


