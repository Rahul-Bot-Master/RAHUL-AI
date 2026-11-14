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
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
const os = require("os");

// --- MULTI-IMAGE ROTATOR (Backup working links) ---
const menuImages = [
    'https://i.imgur.com/391faub.jpeg',
    'https://i.imgur.com/196R8y1.jpeg',
    'https://i.imgur.com/2Y5R78o.jpeg'
];

function getRandomMenuImage() {
    return menuImages[Math.floor(Math.random() * menuImages.length)];
}

// --- ULTIMATE DYNAMIC V2 LAYOUT ENGINE ---
function generateUniqueMenuV2(ownerName, prefixVal, workType, ramUsage, date, time, uptimeVal, cmnd, type, commandsList) {
    const stylesLibrary = [
        // Layout Style A: Cyber Grid Matrix
        () => {
            let h = `╭──────────────────────────────╮\n` +
                    `│      [ ⚡ RAHUL-AI NEXUS ⚡ ]      │\n` +
                    `╰──────────────────────────────╯\n` +
                    ` ❖ Operator : ${ownerName}\n` +
                    ` ❖ Trigger  : ${prefixVal}\n` +
                    ` ❖ Network  : ${workType}\n` +
                    ` ❖ Memory   : ${ramUsage}\n` +
                    ` ❖ Calendar : ${date}\n` +
                    ` ❖ Clock    : ${time}\n` +
                    ` ❖ Runtime  : ${uptimeVal}\n` +
                    ` ❖ Modules  : ${cmnd.length} Loaded\n` +
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

        // Layout Style B: Diamond Terminal Style
        () => {
            let h = `◆══════════════════════════════◆\n` +
                    `    💎 RAHUL-AI CORE V2.0 💎    \n` +
                    `◆══════════════════════════════◆\n` +
                    ` ◈ Master   : ${ownerName}\n` +
                    ` ◈ Prefix   : ${prefixVal}\n` +
                    ` ◈ Status   : ${workType}\n` +
                    ` ◈ RAM Stat : ${ramUsage}\n` +
                    ` ◈ Today    : ${date}\n` +
                    ` ◈ Current  : ${time}\n` +
                    ` ◈ Uptime   : ${uptimeVal}\n` +
                    ` ◈ Total    : ${cmnd.length} Plugins\n` +
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

        // Layout Style C: Sleek Tech Minimalist
        () => {
            let h = `================================\n` +
                    `     ⚡ RAHUL-AI ADVANCED ⚡     \n` +
                    `================================\n` +
                    ` • User   : ${ownerName}\n` +
                    ` • Prefix : ${prefixVal}\n` +
                    ` • Mode   : ${workType}\n` +
                    ` • RAM    : ${ramUsage}\n` +
                    ` • Date   : ${date}\n` +
                    ` • Time   : ${time}\n` +
                    ` • Active : ${uptimeVal}\n` +
                    ` • Total  : ${cmnd.length} Commands\n` +
                    `================================\n${readMore}\n\n`;
            let b = "";
            type.forEach((cmmd) => {
                b += `\n>>> SECTION: ${cmmd.toUpperCase()} <<<\n`;
                commandsList.filter(c => c.category == cmmd).forEach(c => {
                    b += `    - ${prefixVal === 'false' ? '' : prefixVal}${c.Sparky}\n`;
                });
            });
            return h + b;
        }
    ];

    const randomSelector = stylesLibrary[Math.floor(Math.random() * stylesLibrary.length)];
    return randomSelector();
}

// --- PREMIUM MENU 2 HANDLER ---
async function sendMenu2Handler({ client, m, args }) {
    try {
        let queryArgs = Array.isArray(args) ? args.join(" ") : (args || "");
        
        if (queryArgs.trim()) {
            for (let i of plugins.commands) {
                if (i.name && i.name.test && i.name.test(queryArgs)) {
                    let cmdInfo = `════════════════════════════════\n📌 COMMAND : ${queryArgs.trim()}\n📝 DETAILS : ${(i.desc || '').toLowerCase()}\n════════════════════════════════`;
                    return await m.reply(cmdInfo);
                }
            }
        }

        let [date, time] = new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata"
        }).split(",");
        
        let ownerName = config.BOT_INFO ? config.BOT_INFO.split(";")[1]?.toLowerCase() || "rahul master" : "rahul master";
        let workType = config.WORK_TYPE ? config.WORK_TYPE.toLowerCase() : "public";
        let uptimeVal = typeof m.uptime === 'function' ? await m.uptime() : "00:00:00";
        
        let totalMem = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
        let freeMem = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
        let ramUsage = `${(totalMem - freeMem).toFixed(2)}GB / ${totalMem}GB`;

        let cmnd = [];
        let type = [];
        let commandsList = [];

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
                    let cmdNameClean = SparkyCmd.trim();
                    cmnd.push({ Sparky: cmdNameClean, category: category });
                    commandsList.push({ Sparky: cmdNameClean, category: category });
                    if (!type.includes(category)) type.push(category);
                }
            }
        });
        cmnd.sort();
        type.sort();

        let prefixVal = m.prefix || config.PREFIX || ".";

        let menuText = generateUniqueMenuV2(ownerName, prefixVal, workType, ramUsage, date, time, uptimeVal, cmnd, type, commandsList);
        let imageUrl = getRandomMenuImage();
        
        // Koyeb var config.MENU_TYPE kahi pan asu de, yithe apan forcefully 'image' set kela ahe!
        let menuType = "image"; 

        switch (menuType) {
            case 'big': {
                return await client.sendMessage(m.jid, {
                    text: menuText,
                    contextInfo: {
                        externalAdReply: {
                            title: `Hey ${m.pushName || 'Rahul'}!`,
                            body: "RAHUL-AI NEXUS V2",
                            mediaType: 1,
                            showAdAttribution: true,
                            renderLargerThumbnail: true,
                            thumbnailUrl: imageUrl
                        }
                    }
                }, { quoted: m });
            }
            case 'image':
            default: {
                try {
                    // Direct URL sending for Koyeb environment stability
                    return await client.sendMessage(m.jid, {
                        image: { url: imageUrl },
                        caption: menuText
                    }, { quoted: m });
                } catch (err) {
                    console.log("Image URL send failed, trying buffer:", err);
                    let imgBuffer = await getBuffer(imageUrl).catch(() => null);
                    if (imgBuffer) {
                        return await client.sendMessage(m.jid, {
                            image: imgBuffer,
                            caption: menuText
                        }, { quoted: m });
                    }
                    return await client.sendMessage(m.jid, { text: menuText }, { quoted: m });
                }
            }
            case 'small': {
                return await client.sendMessage(m.jid, {
                    text: menuText,
                    contextInfo: {
                        externalAdReply: {
                            title: `Hey ${m.pushName || 'Rahul'}!`,
                            body: "RAHUL-AI NEXUS V2",
                            mediaType: 1,
                            showAdAttribution: true,
                            renderLargerThumbnail: false,
                            thumbnailUrl: imageUrl
                        }
                    }
                }, { quoted: m });
            }
            case 'document': {
                let docBuffer;
                try {
                    docBuffer = await getBuffer(imageUrl);
                } catch (err) {
                    docBuffer = Buffer.from(menuText);
                }
                return await client.sendMessage(m.jid, {
                    document: docBuffer,
                    caption: menuText,
                    mimetype: 'application/zip',
                    fileName: "RAHUL-AI-NEXUS.zip",
                    fileLength: 99999999999
                }, { quoted: m });
            }
            case 'video': {
                return await client.sendMessage(m.jid, {
                    video: { url: imageUrl },
                    caption: menuText,
                    gifPlayback: true
                }, { quoted: m });
            }
        }

    } catch (e) {
        console.log("Menu2 Error:", e);
        if (m && m.reply) await m.reply("❌ Menu 2 error: " + e.message);
    }
}

// --- REGISTER MENU2 COMMAND ---
Sparky({ name: "menu2", category: "misc", fromMe: isPublic, desc: "List multi-layout dynamic menu" }, async (context) => { 
    await sendMenu2Handler(context); 
});

// --- PING / SPEEDTEST COMMAND ---
Sparky({ name: "ping", category: "misc", fromMe: isPublic, desc: "Check bot response speed" }, async ({ m }) => {
    const start = new Date().getTime();
    let msg = await m.reply("⚡ Testing Speed...");
    const end = new Date().getTime();
    const speed = end - start;
    return await m.reply(`*Response Speed:* ${speed}ms 🚀`);
});
