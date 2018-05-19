const config = require("./settings.json");

const discord = require("discord.js");
const fs = require("fs");
const client = new discord.Client();
const tokens = require("./tokens.json");

client.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        client.commands.set(f.replace(".js", ""), props);
    });
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}`);
});

client.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let msg = message.content.split(" ");
    let cmd = msg[0];
    let args = msg.slice(1);

    let commandToRun = client.commands.get(cmd.slice(config.prefix.length));
    if(commandToRun) commandToRun.run(client, message, args);
});

client.login(tokens.token);