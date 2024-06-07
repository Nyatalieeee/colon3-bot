require("dotenv/config");
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});
const quotes = [
    // amelia quotes (21)
    "> everything that is ballshaped will be consumed \n\n--amelia",
    ">>> NATALIE \n\ndo not \n\neat \n\ndilators \n\n--amelia",
    "> the tattoo could just end up being up ur pussy \n\n--amelia",
    "> like just a pile of boobs \n\n--amelia",
    "> like can human bodies even DIGEST fetuses \n\n--amelia",
    "> i didnt know wanting boobs can kill the entirety of europe \n\n--amelia",
    "> i guess u just need breeding /j \n\n--amelia",
    "> (it just releases gocks everywhere) \n\n--amelia",
    "> thats bc you'd be using this only inside nattie \n\n--amelia",
    "> the julie does NOT know about my habit of eating kids \n\n--amelia",
    "> just dont put it in \n\n--amelia",
    "> FOOT SERVER???? [#Unknown] \n\n--amelia",
    "> bro just invented edible cock \n\n--amelia",
    "> im going to shit myself \n\n--amelia",
    "> ok i busted out the foot \n\n--amelia",
    "> its just pink hole \n\n--amelia",
    "> MAYBE this head isnt good \n\n--amelia",
    "> and pussy hair. cant forget pussy hair. \n\n--amelia",
    '> ig theyd have their dreams of genocide "ruined" by sex \n\n--amelia',
    "> how would have they uh \n\n> gotten inside \n\n--amelia",
    "> pussy time :3c \n\n--amelia",

    // natalie quotes (4)
    "> i did NOT expect to be talking abt blending stolen fetuses today \n\n--natalie",
    "> wait wtf why are there like holes \n\n--natalie",
    "> 129 insertions(+) :weary: \n\n--natalie",
    "> i mean he had a fkn glass jar pop inside his ass and he didnt even SAY anything \n\n--natalie",
];

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
        console.log(`${client.user.username} said quote #${quoteNum++}`);
        return;
    }
    if (msg.content === ":3") {
        msgOutput = ":3";
        msg.channel.send(msgOutput);
        console.log(`:3`);
        return;
    }
});

client.login(process.env.TOKEN);
