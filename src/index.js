const { Client, GatewayIntentBits } = require("discord.js");
const config = require("../config.json");
const letters = require("./modules/letters");
const quotes = require("./modules/quotes");
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
    let cmd = msg.content.split(' ');
    const cmdInput = (cmd[1] ?? " ").toLowerCase();
    const rps = ["rock", "paper", "scissors"];
    const rock = rps[0];
    const paper = rps[1];
    const scissors = rps[2];
    // probably move the rps shit to another module tbh

    if (msg.author.bot) {
        return;
    }
    if (msg.content === "!help") {
        msgOutput = "- \"**!help**\" -> shows the list of commands\n\n- \"**!ping**\" -> responds with \"pong!\"\n\n- \"**!foo**\" -> responds with \"bar\"\n\n- \"**!quote**\" -> sends a random OOCQC Plus DMs quote\n\n- \"**!allquotes**\" -> sends a list of every OOCQC Plus DMs quote (use sparingly)\n\n- \"**!keysmash**\" -> sends a keysmash\n\n- \"**!temp**\" -> convert temperatures\n\n- \"**!rps**\" -> play rock paper scissors\n\n- \"**!c3**\" -> talk directly to Colon3\n\n- \"**:3**\" -> :3\n\n";
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
    if (msg.content === "!keysmash") {
        msg.channel.send(letters.keysmash());
        console.log(`\n${client.user.username} keysmashed`);
        return;
    }
    if (cmd[0] === "!c3") {
        if (msg.content.toLowerCase().includes("good bot")) {
            msg.channel.send(letters.keysmash());
            console.log(`\n${client.user.username} was called a good bot`);
            return;
        } else if (msg.content.toLowerCase().includes("what", "pronouns")) {
            msgOutput = "my pronouns are she/it :3";
            msg.channel.send(msgOutput);
            console.log(`\n${client.user.username} said her pronouns`);
            return;
        } else if (msg.content.toLowerCase().includes("is", "cute")) {
            if (msg.content.toLowerCase().includes("amelia")) {
                msgOutput = "of course she is :P\n\n(and just bc natalie programmed me to say this doesnt mean its not true)";
                msg.channel.send(msgOutput);
                console.log(`\n${client.user.username} agrees that amelia is cute`);
                return;    
            } else if (msg.content.toLowerCase().includes("natalie")) {
                msgOutput = "NOPE";
                msg.channel.send(msgOutput);
                console.log(`\n${client.user.username} agrees that natalie is not cute`);
                return;
            }
        } else {
            msgOutput = "heres everything u can say to me:\n\n- ask me what my pronouns are\n\n- call me a good bot :3\n\n- ask me if amelia is cute\n\n- ask me if natalie is cute";
            msg.channel.send(msgOutput);
            return;
        }
    }
    if (cmd[0] === "!temp") {
        if (cmdInput.toLowerCase().includes("f")) {
            let cTemp = Math.floor(((cmdInput.replace("f", "") - 32) / 1.8) * 10) / 10;
            msgOutput = `${cmdInput.replace("f", "")}f is ${cTemp}c`;
            msg.channel.send(msgOutput);
            console.log(`${client.user.username} converted ${cmdInput.replace("f", "")}f to ${cTemp}c`);
            return;
        } else if (cmdInput.toLowerCase().includes("c")) {
            let fTemp = Math.floor((cmdInput.replace("c", "") * 1.8) + 32);
            msgOutput = `${cmdInput.replace("c", "")}c is ${fTemp}f`;
            msg.channel.send(msgOutput);
            console.log(`${client.user.username} converted ${cmdInput.replace("c", "")}c to ${fTemp}f`);
            return;
        } else if (cmdInput >= 1000000000000000000000) {
            msgOutput = "idk lol";
            msg.channel.send(msgOutput);
            console.log(`${client.user.username}'s brain broke`);
            return;
        } else {
            msgOutput = `syntax: \`!temp <number><\"c\", \"f\">\`\n\nexamples: \`!temp 69f\`, \`!temp 21c\``;
            msg.channel.send(msgOutput);
            return;
        }
    }
    // blame amelia for this mess /lh
    if (cmd[0] === "!rps") {
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
        } else if (cmdInput === "cutie") { // iykyk
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
