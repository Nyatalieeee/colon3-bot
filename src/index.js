const { Client, GatewayIntentBits } = require("discord.js");
const quotes = require("./modules/quotes");
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
    let rpsInput = msg.content.split(' ');
    const cmdInput = rpsInput[1];
    const rps = ["rock", "paper", "scissors"];
    const rock = rps[0];
    const paper = rps[1];
    const scissors = rps[2];
    // probably move the rps shit to another module tbh

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
    // blame amelia for this mess /lh
    if (rpsInput[0] === '!rps') {
        if (cmdInput === rock || cmdInput === paper || cmdInput === scissors) {
            let rpsNum = Math.floor(Math.random() * rps.length);
            msgOutput = rps[rpsNum];

            // checks if input is same as bot output
            if (msgOutput === cmdInput) {
                msg.channel.send(`${msgOutput}\n\nit's a tie!`);
                console.log(`\n${client.user.username} said ${rps[rpsNum]}`);
                return;
            } else {
                // paper covers rock (bot sends rock, player sends paper)
                if (msgOutput === rock && cmdInput === paper) {
                    msg.channel.send(`${msgOutput}\n\nyou win :)`);
                    console.log(`\n${client.user.username} said ${rps[rpsNum]}`);
                    return;
                // rock breaks scissors (bot sends rock, player sends scissors)
                } else if (msgOutput === rock && cmdInput === scissors) {
                    msg.channel.send(`${msgOutput}\n\nyou lose :(`);
                    console.log(`\n${client.user.username} said ${rps[rpsNum]}`);
                    return;
                // paper covers rock (bot sends paper, player sends rock)
                } else if (msgOutput === paper && cmdInput === rock) {
                    msg.channel.send(`${msgOutput}\n\nyou lose :(`);
                    console.log(`\n${client.user.username} said ${rps[rpsNum]}`);
                    return;
                // scissors cut paper (bot sends paper, player sends scissors)
                } else if (msgOutput === paper && cmdInput === scissors) {
                    msg.channel.send(`${msgOutput}\n\nyou win :)`);
                    console.log(`\n${client.user.username} said ${rps[rpsNum]}`);
                    return;
                // rock breaks scissors (bot sends scissors, player sends rock)
                } else if (msgOutput === scissors && cmdInput === rock) {
                    msg.channel.send(`${msgOutput}\n\nyou win :)`);
                    console.log(`\n${client.user.username} said ${rps[rpsNum]}`);
                    return;
                // scissors cut paper (bot sends scissors, player sends poper)
                } else if (msgOutput === scissors && cmdInput === paper) {
                    msg.channel.send(`${msgOutput}\n\nyou lose :(`);
                    console.log(`\n${client.user.username} said ${rps[rpsNum]}`);
                    return;
                }
            }
        } else if (cmdInput === "cutie") {
            msgOutput = "gayass";
            msg.channel.send(msgOutput);
            return;
        } else {
            msgOutput = "options are: \"rock\", \"paper\", \"scissors\"\n\nsyntax: \`!rps <option>\`";
            msg.channel.send(msgOutput);
            return;
        }
    }
});

client.login(config.token);
