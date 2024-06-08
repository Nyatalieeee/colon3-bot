// import * as config from "../config.json" with { type: "json" };
// import { Client, GatewayIntentBits } from "discord.js";
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
    console.log(`\nAwaiting commands...\n`);
});

client.on("messageCreate", (msg) => {
    let msgOutput;
    
    if (msg.author.bot) {
        return;
    }
    if (msg.content === "!ping") {
        msgOutput = "pong!";
        msg.channel.send(msgOutput);
        console.log(`${client.user.username} said: "${msgOutput}"`);
        return;
    }
    if (msg.content === "!foo") {
        msgOutput = "bar";
        msg.channel.send(msgOutput);
        console.log(`${client.user.username} said: "${msgOutput}"`);
        return;
    }
    if (msg.content === "!quote") {
        let quoteNum = Math.floor(Math.random() * 25);
        msgOutput = quotes[quoteNum];
        msg.channel.send(msgOutput);
        quoteNum += 1;
        console.log(`${client.user.username} said quote #${quoteNum}`);
        return;
    }
    if (msg.content === ":3") {
        msgOutput = ":3";
        msg.channel.send(msgOutput);
        console.log(`:3`);
        return;
    }
});

client.login(config.token);
