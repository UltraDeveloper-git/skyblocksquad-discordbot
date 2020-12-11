module.exports = {
    name: 'ss',
    description: 'The main command for Simon Says!',
    execute(client, message, args) {

        const discord = require("discord.js");
        const botConfig = require("../data/botconfig.json");

        var prefix = botConfig.prefix;

        var helpEmbed = new discord.MessageEmbed()
            .setTitle("SIMON SAYS")
            .setDescription("See a list of Simon Says commands below!")
            .setColor(botConfig.embedColor)
            .setFooter(botConfig.embedFooter)
            .addFields(
                { name: `**${prefix}ss enter`, value: "Enter a Simon Says event!" },
                { name: `**${prefix}ss startevent**`, value: "Start a new Simon Says event!" }
            )

        if (args.length < 1) return message.channel.send(helpEmbed);

        if (args[0].toLowerCase() === "startevent") {

            if (permissionLevel(message.member) < 4) return message.channel.send("**Error:** You don't have permission to do this!");

            var ssChannel = message.guild.channels.cache.find(ch => ch.name === "simon-says");

            if (!(ssChannel)) return message.channel.send("**Error:** Couldn't find the Simon Says channel!");

            // ssChannel.updateOverwrite(message.guild.roles.cache.find(role => role.name === "Verified"), {
            //     SEND_MESSAGES: false,
            //     VIEW_CHANNEL: true,
            //     READ_MESSAGE_HISTORY: true
            // });

            message.channel.send("**Succesfully started new Simon Says event!**");

            message.guild.me.roles.add("787001746139512842");

            ssChannel.send(`Starting a new **Simon Says** event in **5 minutes**! To enter the event, go to <#703168301634945097> and type: **${prefix}ss enter**!`);

            setTimeout(function () {
                ssChannel.send(`Starting a new **Simon Says** event in **1 minute**! To enter the event, go to <#703168301634945097> and type: **${prefix}ss enter**!`);

                setTimeout(function () {
                    ssChannel.updateOverwrite(message.guild.roles.cache.find(role => role.name === "SS: Participant"), {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
                    });

                    ssChannel.updateOverwrite(message.guild.roles.cache.find(role => role.name === "SS: Eliminated"), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
                    });

                    ssChannel.send(`The **Simon Says** event has started! You can now talk!`);

                }, 60000)
            }, 240000)

        } else if (args[0].toLowerCase() === "enter") {

            var eventActive = message.guild.me.roles.cache.has("787001746139512842");

            if (!(eventActive)) return message.channel.send("**Error:** There is no Simon Says event active at the moment!");

            var hasEntered = message.member.roles.cache.has("787001746139512842");

            if (hasEntered) return message.channel.send("**Error:** You have already entered the Simon Says event!");

            message.member.roles.add(message.guild.roles.cache.get("787001746139512842"));

            message.channel.send("**You have succesfully entered the event!");

        } else if (args[0].toLowerCase() === "eliminate") {

            if (permissionLevel(message.member) < 4) return message.channel.send("**Error:** You don't have permission to do this!");

            var eventActive = message.guild.me.roles.cache.has("787001746139512842");

            if (!(eventActive)) return message.channel.send("**Error:** There is no Simon Says event active at the moment!");

            var target = message.guild.members.cache.get(message.mentions.users.first().id);

            var targetIsAlive = target.roles.cache.has("787000309108965418");

            if (!(targetIsAlive)) return message.channel.send("**Error:** That person hasn't entered the event or is already dead!");

            target.roles.add("787000414246797352");
            target.roles.remove("787000309108965418");

            message.channel.send(`**${target.user.username}** has been eliminated!`);

        }

        function permissionLevel(member) {

            var helperRole = member.roles.cache.has("683206050048114728");
            var moderatorRole = member.roles.cache.has("683205888034603042");
            var administratorRole = member.roles.cache.has("683205637001183365");
            var guildMasterRole = member.roles.cache.has("683205412488478809");

            if (!helperRole && !moderatorRole && !administratorRole && !guildMasterRole) {
                return 1;
            } else if (helperRole && !moderatorRole && !administratorRole && !guildMasterRole) {
                return 2;
            } else if (!helperRole && moderatorRole && !administratorRole && !guildMasterRole) {
                return 3;
            } else if (!helperRole && !moderatorRole && administratorRole && !guildMasterRole) {
                return 4;
            } else if (!helperRole && !moderatorRole && !administratorRole && guildMasterRole) {
                return 5;
            }

        }

    },
};