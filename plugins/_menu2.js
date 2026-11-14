const {
    Sparky,
    commands,
    isPublic
} = require("../lib");
const {
    getBuffer
} = require("./pluginsCore");
const plugins = require("../lib");
const config = require("../config.js");
const font = require("@viper-x/fancytext");
const menust = config.MENU_FONT;
const style = font[menust] || (txt => txt);
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
const os = require("os");

// --- MULTI-IMAGE ROTATOR (All 3 Uguu Links) ---
const menuImages = [
    'https://d.uguu.se/pEvawsUymVpD.jpg',
    'https://n.uguu.se/ChKfLBwqcHwg.jpg',
    'https://n.uguu.se/tfXfnTlMKDlZ.jpg',
    'https://n.uguu.se/STdFjZFjkGat.jpg'
];

function getRandomMenuImage() {
    return menuImages[Math.floor(Math.random() * menuImages.length)];
}

function generateUniqueMenuV2(ownerName, prefixVal, workType, ramUsage, date, time, uptimeVal, type, commandsList) {
    const bulbs = ['💡', '🏮', '🌟', '⚡', '🔮', '💎', '🔥', '✨'];
    const randomBulb = bulbs[Math.floor(Math.random() * bulbs.length)];
    const dynamicSeed = Math.floor(Math.random() * 2000) + 1000;

    let h = `┏━━━✦ ⟨ *RAHUL-AI MENU v${dynamicSeed}* ⟩ ✦━━━┓\n` +
                 `┃ ${randomBulb} *Owner*  : ${ownerName}\n` +
                 `┃ ⚙️ *Mode*   : ${workType}\n` +
                 `┃ ⚡ *Prefix* : ${prefixVal}\n` +
                 `┃ 💾 *RAM*    : ${ramUsage}\n` +
                 `┃ 📅 *Date*   : ${date}\n` +
                 `┃ ⏰ *Time*   : ${time}\n` +
                 `┃ ⏱️ *Uptime* : ${uptimeVal}\n` +
                 `┃ 📂 *Plugins*: 100 Active\n` +
                 `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n${readMore}\n\n`;

    let b = "";
    type.forEach((cmmd) => {
        b += `\n┌───❖ *${cmmd.toUpperCase()}* ❖───┐\n`;
        commandsList.filter(c => c.category == cmmd).forEach(c => {
            b += `│ 🔹 ${prefixVal === 'false' ? '' : prefixVal}${c.Sparky}\n`;
        });
        b += `└──────────────────────────┘\n`;
    });

    return style(h + b);
}

async function sendMenu2Handler({ client, m, args }) {
    try {
        let [date, time] = new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata"
        }).split(",");
        
        let ownerName = config.BOT_INFO ? config.BOT_INFO.split(";")[1]?.toLowerCase() || "rahul master" : "rahul master";
        let workType = config.WORK_TYPE ? config.WORK_TYPE.toLowerCase() : "public";
        let uptimeVal = typeof m.uptime === 'function' ? await m.uptime() : "00:00:00";
        
        let totalMem = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
        let freeMem = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
        let ramUsage = `${(totalMem - freeMem).toFixed(2)}GB`;

        let cmnd = [];
        let type = [];
        let commandsList = [];

        if (Array.isArray(commands)) {
            commands.forEach((command) => {
                if (command && command.name) {
                    let KrizName = command.name;
                    let SparkyCmd = "";

                    if (typeof KrizName === "object" && KrizName && KrizName.source) {
                        try {
                            SparkyCmd = KrizName.source.split('\\s*')[1]?.toString().match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)?.[2];
                        } catch (err) {
                            SparkyCmd = "";
                        }
                    } else if (typeof KrizName === "string") {
                        SparkyCmd = KrizName;
                    }

                    if (!SparkyCmd && command.pattern) {
                        SparkyCmd = typeof command.pattern === "string" ? command.pattern : command.pattern.toString();
                    }

                    if (SparkyCmd && SparkyCmd !== "undefined" && SparkyCmd.trim() !== "" && !command.dontAddCommandList) {
                        let category = command.category ? command.category.toLowerCase() : "misc";
                        let cmdNameClean = SparkyCmd.trim();
                        cmnd.push({ Sparky: cmdNameClean, category: category });
                        commandsList.push({ Sparky: cmdNameClean, category: category });
                        if (!type.includes(category)) type.push(category);
                    }
                }
            });
        }
        cmnd.sort((a, b) => a.Sparky.localeCompare(b.Sparky));
        type.sort();

        let prefixVal = m.prefix || config.PREFIX || ".";
        let menuText = generateUniqueMenuV2(ownerName, prefixVal, workType, ramUsage, date, time, uptimeVal, type, commandsList);
        let imageUrl = getRandomMenuImage();

        try {
            return await client.sendMessage(m.jid, {
                image: { url: imageUrl },
                caption: menuText
            }, { quoted: m });
        } catch (err) {
            let imgBuffer = await getBuffer(imageUrl).catch(() => null);
            if (imgBuffer) {
                return await client.sendMessage(m.jid, {
                    image: imgBuffer,
                    caption: menuText
                }, { quoted: m });
            }
            return await client.sendMessage(m.jid, { text: menuText }, { quoted: m });
        }
    } catch (e) {
        console.log("Menu2 Error:", e);
        if (m && m.reply) await m.reply("❌ Menu 2 error: " + e.message);
    }
}

Sparky({ name: "menu2", category: "misc", fromMe: isPublic, desc: "List multi-layout dynamic menu" }, async (context) => { 
    await sendMenu2Handler(context); 
});
