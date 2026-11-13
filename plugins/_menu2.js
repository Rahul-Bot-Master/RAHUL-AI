const {
    Sparky,
    commands,
    isPublic,
    ytv,
    yta
} = require("../lib");
const {
    getBuffer
} = require("./pluginsCore");
const plugins = require("../lib");
const config = require("../config.js");
const font = require("@viper-x/fancytext");
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

// --- DYNAMIC MULTI-STYLE RANDOMIZER ---
function getRandomStyleText(text) {
    try {
        // Available fancy styles keys from font library
        const availableStyles = Object.keys(font).filter(k => typeof font[k] === 'function');
        if (availableStyles.length === 0) return text;
        
        // Pick a random font style key
        const randomKey = availableStyles[Math.floor(Math.random() * availableStyles.length)];
        return font[randomKey](text);
    } catch (e) {
        return text;
    }
}

// --- PREMIUM MENU 2 HANDLER (With Auto-Changing Unique Styles) ---
async function sendMenu2Handler(client, m, args) {
    try {
        if (args) {
            for (let i of plugins.commands) {
                if (i.name && i.name.test && i.name.test(args)) {
                    let cmdInfo = `╭───[ COMMAND INFO ]───◆\n│ 📌 *Command:* ${args.trim()}\n│ 📝 *Desc:* ${(i.desc || '').toLowerCase()}\n╰──────────────────────`;
                    return m.reply(getRandomStyleText(cmdInfo));
                }
            }
        }

        let [date, time] = new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata"
        }).split(",");
        
        let ownerName = config.BOT_INFO ? config.BOT_INFO.split(";")[1]?.toLowerCase() || "rahul master" : "rahul master";
        let workType = config.WORK_TYPE ? config.WORK_TYPE.toLowerCase() : "public";
        let uptimeVal = typeof m.uptime === 'function' ? await m.uptime() : "00:00:00";

        let cmnd = [];
        let type = [];

        commands.map((command) => {
            if (command.name) {
                let KrizName = command.name;
                let SparkyCmd = "";

                if (typeof KrizName === "object" && KrizName.source) {
                    SparkyCmd = KrizName.source.split('\\s*')[1]?.toString().match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)?.[2];
                } else if (typeof KrizName === "string") {
                    SparkyCmd = KrizName;
                }

                if (!SparkyCmd && command.pattern) {
                    SparkyCmd = typeof command.pattern === "string" ? command.pattern : command.pattern.toString();
                }

                if (SparkyCmd && SparkyCmd !== "undefined" && SparkyCmd.trim() !== "" && !command.dontAddCommandList) {
                    let category = command.category ? command.category.toLowerCase() : "misc";
                    cmnd.push({ Sparky: SparkyCmd.trim(), category: category });
                    if (!type.includes(category)) type.push(category);
                }
            }
        });
        cmnd.sort();
        type.sort();

        let prefixVal = m.prefix || config.PREFIX || ".";

        // --- ATTRACTIVE & LONG CLEAN HEADER ---
        let header = `┌──────────────────────────┐\n` +
                     `│    ✨ *R A H U L - A I*    ✨\n` +
                     `└──────────────────────────┘\n` +
                     `│ 👑 *Owner*  : ${ownerName}\n` +
                     `│ ⚡ *Prefix* : ${prefixVal}\n` +
                     `│ ⚙️ *Mode*   : ${workType}\n` +
                     `│ 📅 *Date*   : ${date}\n` +
                     `│ ⏰ *Time*   : ${time}\n` +
                     `│ ⏱️ *Uptime* : ${uptimeVal}\n` +
                     `│ 📂 *Plugins*: ${cmnd.length}\n` +
                     `────────────────────────────\n${readMore}\n`;

        let body = "";
        type.forEach((cmmd) => {
            body += `\n╭───『 *${cmmd.toUpperCase()}* 』───◆\n`;
            cmnd.filter(({ category }) => category == cmmd).forEach(({ Sparky }) => {
                body += `│ ◈ ${prefixVal === 'false' ? '' : prefixVal}${Sparky.trim()}\n`;
            });
            body += `╰────────────────────────◆\n`;
        });

        // Automatically applies a fresh, random unique style every time menu2 is opened!
        let menuText = getRandomStyleText(header + body);
        let imageUrl = 'https://n.uguu.se/dRMhpzhU.jpg';

        // --- SMALL THUMBNAIL ADREPLY ---
        return await client.sendMessage(m.jid, {
            text: menuText,
            contextInfo: {
                externalAdReply: {
                    title: getRandomStyleText(`Hey ${m.pushName || 'Rahul'}!`),
                    body: getRandomStyleText("RAHUL-AI ULTIMATE MENU"),
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: false, // Small thumbnail view
                    thumbnailUrl: imageUrl
                }
            }
        }, { quoted: m });

    } catch (e) {
        console.log("Menu2 Error:", e);
        if (m && m.reply) await m.reply("❌ Menu 2 load hotana error ala ahe!");
    }
}

// --- REGISTER MENU2 COMMAND ---
Sparky({ name: "menu2", category: "misc", fromMe: isPublic, desc: "List premium long menu with rotating styles" }, async ({ client, m, args }) => { 
    await sendMenu2Handler(client, m, args); 
});

// --- DIRECT TEXT TRIGGER FOR 'menu2' ---
Sparky({
  on: "text",
  dontAddCommandList: true
}, async ({ m, client }) => {
  try {
    const rawText = m.body || m.text || (m.message && (m.message.conversation || m.message.extendedTextMessage?.text)) || "";
    const text = rawText.toLowerCase().trim();
    
    if (text === "menu2") {
      await sendMenu2Handler(client, m, "");
    }
  } catch (err) {
    console.log("Text Listener Error:", err);
  }
});
