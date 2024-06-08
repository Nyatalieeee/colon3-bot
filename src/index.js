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

    function ping() {
        msgOutput = "pong!";
        msg.channel.send(msgOutput);
        console.log(`\n${client.user.username} said: "${msgOutput}"`);
        return;
    }
    function foo() {
        msgOutput = "bar";
        msg.channel.send(msgOutput);
        console.log(`\n${client.user.username} said: "${msgOutput}"`);
        return;
    }
    function quote() {
        let quoteNum = Math.floor(Math.random() * 25);
        msgOutput = quotes[quoteNum];
        msg.channel.send(msgOutput);
        quoteNum += 1;
        console.log(`\n${client.user.username} said quote #${quoteNum}`);
        return;
    }
    function colonThree() {
        msgOutput = ":3";
        msg.channel.send(msgOutput);
        console.log(`\n:3`);
        return;
    }
    
    if (msg.author.bot) {
        return;
    }
    if (msg.content === "!ping") {
        return ping();
    }
    if (msg.content === "!foo") {
        return foo();
    }
    if (msg.content === "!quote") {
        return quote();
    }
    if (msg.content === ":3") {
        return colonThree();
    }
});

client.login(config.token);
