const { Client, MessageEmbed, Channel, Message } = require('discord.js');
const client = new Client;
const {updateStatus} = require("./utils/")
global.config = require("./config.json")
const query = require("samp-query");
const PREFIX = "?";
let Samp_IP = "192.46.229.39";
let Samp_Port = 5555;
var channelid = '847686663832469593';

var options = {
    host: Samp_IP,
    port: Samp_Port
}

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} is going online!!`);
    updateStatus(client, 5);
});

function getServerInfo(msg)
{
    query(options, function(error, response){
        if(error)
        {
            const embedColor = 0xff0000;

            const logMessage = {
                embed: {
                    title: 'JAWA ROLEPLAY',
                    color: embedColor,
                    url: 'https://discord.gg/tNJKVXMYAU',
                    fields: [
                        { name: 'Server Name', value: 'Unknown', inline: false },
                        { name: 'Website', value: 'Unknown', inline: false },
                        { name: 'Ip', value: 'Unknown', inline: false },
                        { name: 'Gamemode', value: 'Unknown', inline: false },
                        { name: 'Mapname', value: 'Unknown', inline: false },
                        { name: 'Status', value: '🔴Offline', inline: false },
                        { name: 'Players', value: '0/0', inline: false },
                    ],
                }
            }
            msg.edit(logMessage);
        }
        else
        {
            const embedColor = 0x800080;

            const logMessage = {
                embed: {
                    title: 'JAWA ROLEPLAY',
                    color: embedColor,
                    url: 'https://discord.gg/tNJKVXMYAU',
                    fields: [
                        { name: 'Server Name', value: response['hostname'], inline: false },
                        { name: 'Website', value: 'ComingSoon', inline: false },
                        { name: 'Ip', value: 'kepo lo', inline: false },
                        { name: 'Gamemode', value: response['gamemode'], inline: false },
                        { name: 'Mapname', value: response['mapname'], inline: false },
                        { name: 'Status', value: ':green_circle:Online', inline: false },
                        { name: 'Players', value: `${response['online']}/${response['maxplayers']}`, inline: false },
                    ],
                }
            }
            msg.edit(logMessage);
        }
    })
}
function helpinfo(msg)
{
    const embedColor = 0x800080;

    const logMessage = {
        embed: {
            title: 'List Command',
            color: embedColor,
            fields: [
                { name: '?help', value: 'list cmd', inline: false },
                { name: '?info', value: 'get server info', inline: false },
                { name: '?players', value: 'get players online', inline: false },
                { name: '?test', value: 'starting a live stats (beta)', inline: false },
            ],
        }
    }
    msg.channel.send(logMessage);
}

client.on('message', msg => {
  let args = msg.content.substring(PREFIX.length).split(' ');
    if(!msg.content.startsWith(PREFIX)) return;
    switch (args[0]) {
    }
        const request = msg.content.substr(1);
        let command, parameters = [];

        if(request.indexOf(" ") !== -1)
        {
            command = request.substr(0, request.indexOf(" "));
            parameters = request.split(" ");
            parameters.shift();
        }
        else
        {
            command = request;
        }
        switch(command.toLowerCase())
        {
            case "players":
                msg.channel.send(`Checking players...`)
                .then(msg => {
                    setTimeout(function(){
                        query(options, function (error, response) {
                            if(error)
                            {
                                msg.edit(`Server is now offline`)
                            }
                            else
                            {
                                msg.edit(`Players: ${response['online']}`)
                            }
                        })
                    }, 3000)
                })
                 break;
            case "info":
                msg.channel.send(`Getting server info...`)
                .then(msg => {
                    setTimeout(function() {
                        getServerInfo(msg)
                    }, 3000)
})
                break;
            case "test":
                if(msg.member.roles.find("name","DEV"))
                {
                    msg.delete(command)
                    msg.channel.send('ONLINE STATUS')
                    .then(msg => {
                        setInterval(function() {
                            getServerInfo(msg)
                        }, 2000)
                    })
                }
                else
                {
                    msg.reply("You don't have permission to use this command")
                }
                break;
            case "req":
                let role = msg.guild.roles.find(r => r.id == "846357441683390469");
                let member = msg.mentions.members.first();
                if(msg.member.roles.find(role => role.id === "846357441683390469")) return msg.reply("You can't use the command!")
                if(msg.channel.type == "dm") return msg.channel.send("You can't use that on dm!!")
                if(!parameters.length) return msg.channel.send("Masukan Nama Roleplay Kamu Yang benar")
                    const nick = "[WARGA]" + parameters.join("_")
                if(nick.length > 32) return msg.channel.send("Nama Kamu Terlalu Panjang")
                msg.member.addRoles(role).catch(console.error)
                msg.member.setNickname(nick)
                msg.channel.send("KAMU BERHASIL MELAKUKAN REGISTRASI DI SERVER #JRP, KAMU SEKARANG BISA MENDOWNLOAD CLIENT <@&846357441683390469>");
                break;
            case "help":
                helpinfo(msg)
                break;
            default:
                msg.reply(`Unknown command`);
        }
    }) 


client.login(process.env.BOT_TOKEN);