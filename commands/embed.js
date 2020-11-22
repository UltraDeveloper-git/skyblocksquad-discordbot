module.exports = {
    name: 'embed',
    description: '*Create a nice looking embed!*',
    category: 'Miscellaneous',
    execute(message, args, discord) {

        // ,embed title / description / color / footer / timestamp
        // x = nothing

        var seperator = " / ";

        var seperatedArgs = args.join(" ").split(seperator);

        if (seperatedArgs.length < 2) return message.channel.send("**Error:** You need to provide a title and a description!");

        if (seperatedArgs.length > 5) return message.channel.send("**Error:** Too much arguments provided!");

        var title;
        var description;
        var color;
        var footer;
        var timestamp;

        if (seperatedArgs.length >= 2) {
            title = seperatedArgs[0];
            description = seperatedArgs[1];
        }

        if (seperatedArgs.length >= 3) {
            color = seperatedArgs[2];
        }

        if (seperatedArgs.length >= 4) {
            footer = seperatedArgs[3];
        }

        if (seperatedArgs.length == 5) {
            timestamp = seperatedArgs[4];
        }

        console.log(color);

    },
};