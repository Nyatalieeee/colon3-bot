const { Client, GatewayIntentBits } = require("discord.js");
const quotes = require("./quotes");
const config = require("../config.json");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on("ready", () => {
    console.log(`\n✅ ${client.user.username} is now online.`);
    console.log(`\n✅ Awaiting commands...`);
});

client.on("messageCreate", (msg) => {
    let msgOutput;

    if (msg.author.bot) {
        return;
    }
    if (msg.content === "!help") {
        msgOutput = "- \"**!help**\" -> shows the list of commands\n\n- \"**!ping**\" -> responds with \"pong!\"\n\n- \"**!foo**\" -> responds with \"bar\"\n\n- \"**!quote**\" -> sends a random OOCQC Plus DMs quote\n\n- \"**!allquotes**\" -> sends a list of every OOCQC Plus DMs quote (use sparingly)\n\n- \"**:3**\" -> :3\n\n";
        msg.channel.send(msgOutput);
        console.log(`\n${client.user.username} sent the help message`);
        return;
    }
    if (msg.content === "!ping") {
        msgOutput = "pong!";
        msg.channel.send(msgOutput);
        console.log(`\n${client.user.username} said: "${msgOutput}"`);
        return;
    }
    if (msg.content === "!foo") {
        msgOutput = "bar";
        msg.channel.send(msgOutput);
        console.log(`\n${client.user.username} said: "${msgOutput}"`);
        return;
    }
    if (msg.content === "!quote") {
        let quoteNum = Math.floor(Math.random() * 25);
        msgOutput = quotes[quoteNum];
        msg.channel.send(`> ${msgOutput}`);
        quoteNum += 1;
        console.log(`\n${client.user.username} said quote #${quoteNum}`);
        return;
    }
    if (msg.content === "!allquotes") {
        msgOutput = quotes.join('\n');
        msg.channel.send(`\`\`\`${msgOutput}\`\`\``);
        console.log(`\n${client.user.username} said every quote`);
        return;
    }
    if (msg.content === ":3") {
        msgOutput = ":3";
        msg.channel.send(msgOutput);
        console.log(`\n:3`);
        return;
    }
});

client.login(config.token);
