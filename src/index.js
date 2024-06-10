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
    const rps = ["rock", "paper", "scissors"]; // TODO: rock paper scissors (jfc what do i even do with this)
    let rpsInput = msg.content.split(' ')
    let msgOutput;

    if (msg.author.bot) {
        return;
    }
    if (msg.content === "!help") {
        msgOutput = "- \"**!help**\" -> shows the list of commands\n\n- \"**!ping**\" -> responds with \"pong!\"\n\n- \"**!foo**\" -> responds with \"bar\"\n\n- \"**!quote**\" -> sends a random OOCQC Plus DMs quote\n\n- \"**!allquotes**\" -> sends a list of every OOCQC Plus DMs quote (use sparingly)\n\n- \"**!rps <'rock', 'paper', 'scissors'>**\" -> play rock paper scissors (doesnt fully work yet)\n\n- \"**:3**\" -> :3\n\n";
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
    // blame amelia for this /lh
    if (rpsInput[0] === '!rps') {
        if (rpsInput[1] === rps[0] || rpsInput[1] === rps[1] || rpsInput[1] === rps[2]) {
            let rpsNum = Math.floor(Math.random() * rps.length);
            msgOutput = rps[rpsNum];

            if (msgOutput === rpsInput[1]) {
                msg.channel.send(`${msgOutput}\n\nit's a tie!`);
                console.log(`\n${client.user.username} said ${rps[rpsNum]}`);
                return;
            } else {
                // if (msgOutput === rps[0] && something else idfk) {
                //     end me
                // }
            }
            return;

        } else if (rpsInput[1] === "cutie") {
            msgOutput = "gayass"
            msg.channel.send(msgOutput);
            return;
        }
    }
});

client.login(config.token);
