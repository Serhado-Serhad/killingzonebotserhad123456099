let request = require('request');
const discord = require("discord.js");

const config = require("./tokens.json");
let apiKey = config.apiKey;

module.exports = {
    getStats: function(client, message, args) {
        let platform = args[0];
        let name = args.toString().replace(/\,/g, ' ').replace(platform, "").trim();

        if(name === "" || name.indexOf(":") > -1 ) {
            message.channel.send(`Illegal argument :(`);
            return;
        }

        let options = {
            method: "GET",
            url: `https://fortnite.y3n.co/v2/player/${name}`,
            headers: {
                'User-Agent': 'nodejs request',
                'X-Key': apiKey
            }
        };

        request(options, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let stats = JSON.parse(body);
                let matchesPlayed;
                let totalWins;
                let KDRatio;

                if(platform === "xb1") {
                    matchesPlayed = stats.br.stats.xb1.all.matchesPlayed;
                    totalWins = stats.br.stats.xb1.all.wins;
                    KDRatio = stats.br.stats.xb1.all.kpd;
                }
                if(platform === "ps4") {
                    matchesPlayed = stats.br.stats.ps4.all.matchesPlayed;
                    totalWins = stats.br.stats.ps4.all.wins;
                    KDRatio = stats.br.stats.ps4.all.kpd;
                }
                if(platform === "pc") {
                    matchesPlayed = stats.br.stats.pc.all.matchesPlayed;
                    totalWins = stats.br.stats.pc.all.wins;
                    KDRatio = stats.br.stats.pc.all.kpd;
                }
                checkRoles(message, KDRatio, totalWins, matchesPlayed, name);
            } else {
                console.log(response.statusCode);
                console.log("");
                console.log(body);
            }
        })
    }
};

function checkRoles(message, kd, wins, matchesPlayed, username) {
    let id = message.author.id;
    let role;
    let guildUser = message.guild.members.find("id", id);

    if (kd < 2 && wins > 25) {
        message.delete();
        message.reply("You have less than 25 wins, You cannot be ranked");
    }
    else if (kd < 2 && matchesPlayed >= 25) {
        role = message.guild.roles.find("name", "Player");
        guildUser.addRole(role);
        makeSure(message, guildUser, "Player");
        guildUser.setNickname("[Player] " + username);
        message.reply("You have been ranked");
        message.delete();
    }
    else if (kd < 3 && matchesPlayed >= 150) {
        role = message.guild.roles.find("name", "Player+");
        guildUser.addRole(role);
        makeSure(message, guildUser, "Player+");
        guildUser.setNickname("[Player+] " + username);
        message.reply("You have been ranked");
        message.delete();
    }
    else if (kd < 4 && matchesPlayed >= 500) {
        role = message.guild.roles.find("name", "Member");
        guildUser.addRole(role);
        makeSure(message, guildUser, "Member");
        guildUser.setNickname("[Member] " + username);
        message.reply("You have been ranked");
        message.delete();
    }
    else if (kd < 5 && matchesPlayed >= 700) {
        role = message.guild.roles.find("name", "Member+");
        guildUser.addRole(role);
        makeSure(message, guildUser, "Member+");
        guildUser.setNickname("[Member+] " + username);
        message.reply("You have been ranked");
        message.delete();
    }
    else if (kd < 6 && matchesPlayed >= 900) {
        role = message.guild.roles.find("name", "Vulcan");
        guildUser.addRole(role);
        makeSure(message, guildUser, "Vulcan");
        guildUser.setNickname("[Vulcan] " + username);
        message.reply("You have been ranked");
        message.delete();
    }
    else if (kd < 7 && matchesPlayed >= 1000) {
        role = message.guild.roles.find("name", "Unstoppable");
        guildUser.addRole(role);
        makeSure(message, guildUser, "Unstoppable");
        guildUser.setNickname("[Unstoppable] " + username);
        message.reply("You have been ranked");
        message.delete();
    }
    else if (kd >= 7 && matchesPlayed >= 1050) {
        role = message.guild.roles.find("name", "Elite");
        guildUser.addRole(role);
        makeSure(message, guildUser, "Elite");
        guildUser.setNickname("[Elite] " + username);
        message.reply("You have been ranked");
        message.delete();
    }
}

function makeSure(message, guildUser, currentRole) {
    let role;

    switch(currentRole) {
        case "Player":
            if(guildUser.roles.find("name", "Player+"))
                role = message.guild.roles.find('name', "Player+");
                guildUser.removeRole(role);
            if(guildUser.roles.find("name", "Member"))
                role = message.guild.roles.find('name', "Member");
                guildUser.removeRole(role);
            if(guildUser.roles.find("name", "Member+"))
                role = message.guild.roles.find('name', "Member+");
                guildUser.removeRole(role);
            if(guildUser.roles.find("name", "Vulcan"))
                role = message.guild.roles.find('name', "Vulcan");
                guildUser.removeRole(role);
            if(guildUser.roles.find("name", "Unstoppable"))
                role = message.guild.roles.find('name', "Unstoppable");
                guildUser.removeRole(role);
            if(guildUser.roles.find("name", "Elite"))
                role = message.guild.roles.find('name', "Elite");
                guildUser.removeRole(role);
            break;
        case "Player+":
            if(guildUser.roles.find("name", "Member"))
                role = message.guild.roles.find('name', "Member");
            guildUser.removeRole(role);
            if(guildUser.roles.find("name", "Member+"))
                role = message.guild.roles.find('name', "Member+");
            guildUser.removeRole(role);
            if(guildUser.roles.find("name", "Vulcan"))
                role = message.guild.roles.find('name', "Vulcan");
            guildUser.removeRole(role);
            if(guildUser.roles.find("name", "Unstoppable"))
                role = message.guild.roles.find('name', "Unstoppable");
            guildUser.removeRole(role);
            if(guildUser.roles.find("name", "Elite"))
                role = message.guild.roles.find('name', "Elite");
            guildUser.removeRole(role);
            break;
        case "Member":
            if(guildUser.roles.find("name", "Member+"))
                role = message.guild.roles.find('name', "Member+");
            guildUser.removeRole(role);
            if(guildUser.roles.find("name", "Vulcan"))
                role = message.guild.roles.find('name', "Vulcan");
            guildUser.removeRole(role);
            if(guildUser.roles.find("name", "Unstoppable"))
                role = message.guild.roles.find('name', "Unstoppable");
            guildUser.removeRole(role);
            if(guildUser.roles.find("name", "Elite"))
                role = message.guild.roles.find('name', "Elite");
            guildUser.removeRole(role);
            break;
        case "Member+":
            if(guildUser.roles.find("name", "Vulcan"))
                role = message.guild.roles.find('name', "Vulcan");
            guildUser.removeRole(role);
            if(guildUser.roles.find("name", "Unstoppable"))
                role = message.guild.roles.find('name', "Unstoppable");
            guildUser.removeRole(role);
            if(guildUser.roles.find("name", "Elite"))
                role = message.guild.roles.find('name', "Elite");
            guildUser.removeRole(role);
            break;
        case "Vulcan":
            if(guildUser.roles.find("name", "Unstoppable"))
                role = message.guild.roles.find('name', "Unstoppable");
            guildUser.removeRole(role);
            if(guildUser.roles.find("name", "Elite"))
                role = message.guild.roles.find('name', "Elite");
            guildUser.removeRole(role);
            break;
        case "Unstoppable":
            if(guildUser.roles.find("name", "Elite"))
                role = message.guild.roles.find('name', "Elite");
            guildUser.removeRole(role);
            break;
        default:
            break;
    }
}