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

// --- MULTI-IMAGE ROTATOR (All Uguu Direct Links) ---
const menuImages = [
    'https://d.uguu.se/pEvawsUymVpD.jpg',
    'https://n.uguu.se/ChKfLBwqcHwg.jpg',
    'https://n.uguu.se/tfXfnTlMKDlZ.jpg',
    'https://n.uguu.se/STdFjZFjkGat.jpg'
];

function getRandomMenuImage() {
    return menuImages[Math.floor(Math.random() * menuImages.length)];
}

// --- COMPLETELY UNIQUE & DIFFERENT LAYOUTS (RGB EDGE LIGHTING & MULTI-COLOR STYLES) ---
function generateEdgeLightingMenuV2(ownerName, prefixVal, workType, ramUsage, date, time, uptimeVal, type, commandsList) {
    const rgbBulbs = ['💡', '🏮', '🌟', '⚡', '🔮', '💎', '🔥', '✨', '🌀', '🚀', '🌈', '💠', '💖', '🎯'];
    const b1 = rgbBulbs[Math.floor(Math.random() * rgbBulbs.length)];
    const b2 = rgbBulbs[Math.floor(Math.random() * rgbBulbs.length)];
    const b3 = rgbBulbs[Math.floor(Math.random() * rgbBulbs.length)];
    const seed = Math.floor(Math.random() * 8000) + 1000;

    const uniqueLayouts = [
        // Layout 1: Cyber-Shield Diamond Style
        () => {
            let h = `⚡ ⟨⟨ *RAHUL-AI CYBER SHIELD v${seed}* ⟩⟩ ⚡\n` +
                    `├──────────────────────────────\n` +
                    `│ ${b1} **Owner**  : ${ownerName}\n` +
                    `│ ${b2} **Status** : ${workType}\n` +
                    `│ ⚙️ **Prefix** : ${prefixVal}\n` +
                    `│ 💾 **RAM**    : ${ramUsage}\n` +
                    `│ 📅 **Date**   : ${date}\n` +
                    `│ ⏰ **Time**   : ${time}\n` +
                    `│ ⏱️ **Uptime** : ${uptimeVal}\n` +
                    `│ 📂 **Plugins**: 100 Active ${b3}\n` +
                    `└──────────────────────────────\n${readMore}\n\n`;
            let b = "";
            type.forEach((cmmd) => {
                b += `\n🎯 *[ ${cmmd.toUpperCase()} ZONE ]*\n`;
                commandsList.filter(c => c.category == cmmd).forEach(c => {
                    b += `  ⚡ ${prefixVal === 'false' ? '' : prefixVal}${c.Sparky}\n`;
                });
            });
            return h + b;
        },

        // Layout 2: Neon RGB Hexagon Frame Style
        () => {
            let h = `╔══════════════════════════════╗\n` +
                    `║   ${b1} RAHUL-AI NEON MATRIX #${seed} ${b2}   ║\n` +
                    `╚══════════════════════════════╝\n` +
                    ` 🌟 *Operator Info & Stats* 🌟\n` +
                    `» Creator : ${ownerName}\n` +
                    `» Mode    : ${workType}\n` +
                    `» Trigger : ${prefixVal}\n` +
                    `» Memory  : ${ramUsage}\n` +
                    `» Today   : ${date}\n` +
                    `» Clock   : ${time}\n` +
                    `» Runtime : ${uptimeVal}\n` +
                    `» Modules : 100 Loaded ${b3}\n` +
                    `────────────────────────────────\n${readMore}\n\n`;
            let b = "";
            type.forEach((cmmd) => {
                b += `\n✦---⟨ ${cmmd.toUpperCase()} MODULES ⟩---✦\n`;
                commandsList.filter(c => c.category == cmmd).forEach(c => {
                    b += `  🔥 ${prefixVal === 'false' ? '' : prefixVal}${c.Sparky}\n`;
                });
            });
            return h + b;
        },

        // Layout 3: Dual-Bar Laser Edge Lighting Style
        () => {
            let h = `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n` +
                    `  ${b1} RAHUL-AI LASER v${seed} ${b2}\n` +
                    `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\n` +
                    ` 🔹 Master  : ${ownerName}\n` +
                    ` 🔹 Network : ${workType}\n` +
                    ` 🔹 Prefix  : ${prefixVal}\n` +
                    ` 🔹 RAM Use : ${ramUsage}\n` +
                    ` 🔹 Date    : ${date}\n` +
                    ` 🔹 Time    : ${time}\n` +
                    ` 🔹 Uptime  : ${uptimeVal}\n` +
                    ` 🔹 Plugins : 100 Secured ${b3}\n` +
                    `────────────────────────────────\n${readMore}\n\n`;
            let b = "";
            type.forEach((cmmd) => {
                b += `\n🔮 *${cmmd.toUpperCase()} SECTION* 🔮\n`;
                commandsList.filter(c => c.category == cmmd).forEach(c => {
                    b += `  👉 ${prefixVal === 'false' ? '' : prefixVal}${c.Sparky}\n`;
                });
            });
            return h + b;
        },

        // Layout 4: Minimalist Cyber Vault Style
        () => {
            let h = `╭──────────────────────────────╮\n` +
                    `│  ${b1} RAHUL-AI VAULT #${seed} ${b2}    │\n` +
                    `╰──────────────────────────────╯\n` +
                    ` 🚀 [ SYSTEM TELEMETRY ]\n` +
                    ` • User   : ${ownerName}\n` +
                    ` • Work   : ${workType}\n` +
                    ` • Prefix : ${prefixVal}\n` +
                    ` • Memory : ${ramUsage}\n` +
                    ` • Date   : ${date}\n` +
                    ` • Clock  : ${time}\n` +
                    ` • Uptime : ${uptimeVal}\n` +
                    ` • Total  : 100 Commands ${b3}\n` +
                    `────────────────────────────────\n${readMore}\n\n`;
            let b = "";
            type.forEach((cmmd) => {
                b += `\n⚙️ *[ ${cmmd.toUpperCase()} ]*\n`;
                commandsList.filter(c => c.category == cmmd).forEach(c => {
                    b += `  💎 ${prefixVal === 'false' ? '' : prefixVal}${c.Sparky}\n`;
                });
            });
            return h + b;
        }
    ];

    const chosenLayout = uniqueLayouts[Math.floor(Math.random() * uniqueLayouts.length)];
    return style(chosenLayout());
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
        let menuText = generateEdgeLightingMenuV2(ownerName, prefixVal, workType, ramUsage, date, time, uptimeVal, type, commandsList);
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

Sparky({ name: "menu2", category: "misc", fromMe: isPublic, desc: "List multi-layout dynamic edge lighting menu" }, async (context) => { 
    await sendMenu2Handler(context); 
});
