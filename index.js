// Setup discord.js and botconfig.json
const discord = require("discord.js");
const botConfig = require("./botconfig.json");

// Setup variables
var prefix = botConfig.prefix;
var embedColor = "#ed2121";
var embedFooter = "SkyblockSquad Bot, Made for the SkyblockSquad Discord Server";

// Login the bot
const client = new discord.Client();
client.login(process.env.token);

// Console log + set activity
client.on("ready", async () => {

    console.log(`${client.user.username} is ready.`);
    client.user.setActivity(",help", {type: "PLAYING"});

});

// Bot commands
client.on("message", async message => {
    
    if(message.author.bot) return;

    var messageArray = message.content.split(" ");
    var command = messageArray[0]

    if(command === `${prefix}help`) {

        var botEmbed = new discord.MessageEmbed()
            .setTitle("HELP")
            .setDescription("See a list of bot commands below!")
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addFields(
                {name: `${prefix}help`, value: "Display this list!"},
                {name: `${prefix}info`, value: "Display bot and server info!"},
                {name: `${prefix}me`, value: "Display info about yourself!"},
                {name: `${prefix}hello`, value: "Say hello to the bot!"},
                {name: `${prefix}fruits`, value: "See a list of delicious fruits!"},
                {name: `${prefix}hack`, value: "Hack the server!"}
            )

            return message.channel.send(botEmbed);
    }

    if(command === `${prefix}info`) {

        var botEmbed = new discord.MessageEmbed()
        .setTitle("INFO")
        .setDescription("See info about the bot below!")
        .setColor(embedColor)
        .setFooter(embedFooter)
        .setTimestamp()

        if(!(message.channel.type == "dm")) {

            botEmbed.addFields(
                {name: "Server Name", value:message.guild.name},
                {name: "Server Member Count", value:message.guild.memberCount},
                {name: "Server Owner", value: `${message.guild.owner} (${message.guild.ownerID})`},
                {name: "Server Channel", value:message.channel.name}
            );            

        }

        botEmbed.addFields(
            {name: "Bot Name", value:client.user},
            {name: "Bot Embed Color", value:embedColor},
            {name: "Bot Uptime", value:client.uptime}
        );

            return message.channel.send(botEmbed);
    }

    if(command === `${prefix}me`) {

        var botEmbed = new discord.MessageEmbed()
            .setTitle("ME")
            .setDescription("See info about you below!")
            .setColor(embedColor)
            .setFooter(embedFooter)
            .setTimestamp()
            .addFields(
                {name: `${message.author.username}'s Name`, value: `<@${message.author.id}>`},
                {name: `${message.author.username}'s User ID `, value:message.author.id},
                {name: `${message.author.username} Joined Discord At`, value:message.author.createdAt}
            );

            return message.channel.send(botEmbed);

    }

    if(command === `${prefix}hello`) {

        return message.channel.send(`Hello there, <@${message.author.id}>!`);

    }

    if(command === `${prefix}fruits`) {

        message.react('🍎');
        message.react('🍊');
        message.react('🍇');
    }

    if(command === `${prefix}hack`) {

        if(message.channel.type == "dm") {
            message.reply('This command has to be used in a server channel!');
        }

        message.react('👍').then(() => message.react('👎'));

    const filter = (reaction, user) => {
	    return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
    };

    message.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
	    .then(collected => {
		    const reaction = collected.first();

		    if (reaction.emoji.name === '👍') {
			    message.reply('You wish.');
		    } else {
			    message.reply('You are a good boy!');
		    }
	    })
	    .catch(collected => {
            message.reply('Command has been cancelled.');
            message.reply('Reason: No reaction within 30 seconds');
	    });

    }

    message.reactions.removeAll();
 
});