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

// --- 100+ COLOR PALETTES & 10 ULTRA-STYLISTIC RGB EDGE LIGHTING BANKS ---
function generateEdgeLightingMenuV2(ownerName, prefixVal, workType, ramUsage, date, time, uptimeVal, type, commandsList) {
    const bulbSets = [
        ['💡', '🏮'], ['🌟', '⚡'], ['🔮', '💎'], ['🔥', '✨'], 
        ['🌀', '🚀'], ['🌈', '💠'], ['💖', '⚡'], ['🎯', '⚓'],
        ['🛡️', '💎'], ['🔥', '💡'], ['🌟', '🔮'], ['⚡', '🏮']
    ];
    const randomPair = bulbSets[Math.floor(Math.random() * bulbSets.length)];
    const dynamicSeed = Math.floor(Math.random() * 9000) + 1000;

    // 100+ Color Themes Mapping Pool
    const colorThemes = [
        { name: "Neon Cyan", tag: "【 🌐 NEON CYAN GLOW 】" },
        { name: "Cyber Purple", tag: "【 💜 CYBER PURPLE VIBE 】" },
        { name: "Electric Gold", tag: "【 ⚡ ELECTRIC GOLD LIGHT 】" },
        { name: "Emerald Matrix", tag: "【 🟢 EMERALD MATRIX LED 】" },
        { name: "Ruby Magenta", tag: "【 💖 RUBY MAGENTA PULSE 】" },
        { name: "Plasma Pink", tag: "【 🌸 PLASMA PINK LASER 】" },
        { name: "Laser Violet", tag: "【 🔮 LASER VIOLET CORE 】" },
        { name: "Solar Orange", tag: "【 🔥 SOLAR ORANGE BLAZE 】" },
        { name: "Quantum Blue", tag: "【 🔷 QUANTUM BLUE SHIELD 】" },
        { name: "Hyper Neon", tag: "【 🚀 HYPER NEON MATRIX 】" },
        { name: "Acid Green", tag: "【 🟢 ACID GREEN GRID 】" },
        { name: "Royal Indigo", tag: "【 👑 ROYAL INDIGO SHINE 】" },
        { name: "Sunset Crimson", tag: "【 🌇 SUNSET CRIMSON GLOW 】" },
        { name: "Deep Titanium", tag: "【 ⚙️ TITANIUM SILVER V2 】" },
        { name: "Toxic Yellow", tag: "【 ☣️ TOXIC YELLOW SPARK 】" }
    ];
    const activeTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)];

    const stylesBank = [
        // Style 1: Cyberpunk RGB Edge Box with Dynamic Color Tags
        () => {
            let h = `╭──────────────────────────────╮\n` +
                    `│  ${randomPair[0]} [ RAHUL-AI v${dynamicSeed} ] ${randomPair[1]}  │\n` +
                    `╰──────────────────────────────╯\n` +
                    ` ${activeTheme.tag}\n` +
                    ` ❖ Owner  : ${ownerName}\n` +
                    ` ❖ Status : ${workType}\n` +
                    ` ❖ Prefix : ${prefixVal}\n` +
                    ` ❖ RAM    : ${ramUsage}\n` +
                    ` ❖ Date   : ${date}\n` +
                    ` ❖ Clock  : ${time}\n` +
                    ` ❖ Uptime : ${uptimeVal}\n` +
                    ` ❖ Plugins: 100 Active\n` +
                    `────────────────────────────────\n${readMore}\n\n`;
            let b = "";
            type.forEach((cmmd) => {
                b += `\n┌─❖ [ ${cmmd.toUpperCase()} MODULES ]\n`;
                commandsList.filter(c => c.category == cmmd).forEach(c => {
                    b += `│ 🔹 ${prefixVal === 'false' ? '' : prefixVal}${c.Sparky}\n`;
                });
                b += `└──────────────────────────────\n`;
            });
            return h + b;
        },

        // Style 2: Neon Edge Glow Terminal
        () => {
            let h = `◆══════════════════════════════◆\n` +
                    `    ${randomPair[0]} RAHUL-AI CORE [ #${dynamicSeed} ] ${randomPair[1]}\n` +
                    `◆══════════════════════════════◆\n` +
                    ` ${activeTheme.tag}\n` +
                    ` ◈ Master : ${ownerName}\n` +
                    ` ◈ Network: ${workType}\n` +
                    ` ◈ Trigger: ${prefixVal}\n` +
                    ` ◈ Memory : ${ramUsage}\n` +
                    ` ◈ Date   : ${date}\n` +
                    ` ◈ Time   : ${time}\n` +
                    ` ◈ Uptime : ${uptimeVal}\n` +
                    ` ◈ Total  : 100 Modules\n` +
                    `────────────────────────────────\n${readMore}\n\n`;
            let b = "";
            type.forEach((cmmd) => {
                b += `\n✦═══ • ${cmmd.toUpperCase()} • ═══✦\n`;
                commandsList.filter(c => c.category == cmmd).forEach(c => {
                    b += `  » ${prefixVal === 'false' ? '' : prefixVal}${c.Sparky}\n`;
                });
            });
            return h + b;
        },

        // Style 3: Cybernetic Edge Lighting Grid
        () => {
            let h = `╔══════════════════════════════╗\n` +
                    `║   ${randomPair[0]} RAHUL-AI QUANTUM v${dynamicSeed} ${randomPair[1]}  ║\n` +
                    `╚══════════════════════════════╝\n` +
                    ` ${activeTheme.tag}\n` +
                    ` ⬡ Creator: ${ownerName}\n` +
                    ` ⬡ Mode   : ${workType}\n` +
                    ` ⬡ Prefix : ${prefixVal}\n` +
                    ` ⬡ RAM    : ${ramUsage}\n` +
                    ` ⬡ Today  : ${date}\n` +
                    ` ⬡ Clock  : ${time}\n` +
                    ` ⬡ Runtime: ${uptimeVal}\n` +
                    ` ⬡ Online : 100 Features\n` +
                    `────────────────────────────────\n${readMore}\n\n`;
            let b = "";
            type.forEach((cmmd) => {
                b += `\n╭───❖ [ ${cmmd.toUpperCase()} ]\n`;
                commandsList.filter(c => c.category == cmmd).forEach(c => {
                    b += `│ 🔸 ${prefixVal === 'false' ? '' : prefixVal}${c.Sparky}\n`;
                });
                b += `╰──────────────────────────────\n`;
            });
            return h + b;
        },

        // Style 4: Royal RGB Holographic Panel
        () => {
            let h = `┏━━━✦ ⟨ *RAHUL-AI HOLOGRAPHIC* ⟩ ✦━━━┓\n` +
                    `┃ ${activeTheme.tag}\n` +
                    `┃ ${randomPair[0]} *Owner*  : ${ownerName}\n` +
                    `┃ ⚙️ *Mode*   : ${workType}\n` +
                    `┃ ⚡ *Prefix* : ${prefixVal}\n` +
                    `┃ 💾 *RAM*    : ${ramUsage}\n` +
                    `┃ 📅 *Date*   : ${date}\n` +
                    `┃ ⏰ *Time*   : ${time}\n` +
                    `┃ ⏱️ *Uptime* : ${uptimeVal}\n` +
                    `┃ 📂 *Plugins*: 100 Active ${randomPair[1]}\n` +
                    `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n${readMore}\n\n`;
            let b = "";
            type.forEach((cmmd) => {
                b += `\n┌───❖ *${cmmd.toUpperCase()}* ❖───┐\n`;
                commandsList.filter(c => c.category == cmmd).forEach(c => {
                    b += `│ 🔹 ${prefixVal === 'false' ? '' : prefixVal}${c.Sparky}\n`;
                });
                b += `└──────────────────────────┘\n`;
            });
            return h + b;
        },

        // Style 5: Starburst Cyber Edge Box
        () => {
            let h = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `   ${randomPair[0]} RAHUL-AI SUPREME v${dynamicSeed} ${randomPair[1]}\n` +
                    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    ` ${activeTheme.tag}\n` +
                    ` ✦ Admin    : ${ownerName}\n` +
                    ` ✦ WorkMode : ${workType}\n` +
                    ` ✦ Command  : ${prefixVal}\n` +
                    ` ✦ Memory   : ${ramUsage}\n` +
                    ` ✦ Session  : ${date}\n` +
                    ` ✦ Timer    : ${time}\n` +
                    ` ✦ Uptime   : ${uptimeVal}\n` +
                    ` ✦ Modules  : 100 Armed\n` +
                    `────────────────────────────────\n${readMore}\n\n`;
            let b = "";
            type.forEach((cmmd) => {
                b += `\n📌 [ *${cmmd.toUpperCase()}* ]\n`;
                commandsList.filter(c => c.category == cmmd).forEach(c => {
                    b += `  ⚡ ${prefixVal === 'false' ? '' : prefixVal}${c.Sparky}\n`;
                });
            });
            return h + b;
        }
    ];

    const selectedStyle = stylesBank[Math.floor(Math.random() * stylesBank.length)];
    return style(selectedStyle());
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
