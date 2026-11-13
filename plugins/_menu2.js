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

// --- MULTI-IMAGE ROTATOR (3 Custom Images) ---
const menuImages = [
    'https://d.uguu.se/hhbeXEcH.jpg',
    'https://d.uguu.se/RhhoOBfa.jpg',
    'https://h.uguu.se/vJvVMHCQ.jpg'
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
async function sendMenu2Handler(client, m, args) {
    try {
        if (args) {
            for (let i of plugins.commands) {
                if (i.name && i.name.test && i.name.test(args)) {
                    let cmdInfo = `════════════════════════════════\n📌 COMMAND : ${args.trim()}\n📝 DETAILS : ${(i.desc || '').toLowerCase()}\n════════════════════════════════`;
                    return m.reply(cmdInfo);
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
        let menuType = config.MENU_TYPE ? config.MENU_TYPE.toLowerCase() : "big";

        let sperky = {
            "key": {
                "participants": "0@s.s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "RAHUL-AI-V2"
            },
            "message": {
                "conversation": "RAHUL AI DYNAMIC MENU 2"
            },
            "participant": "0@s.whatsapp.net"
        };

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
            case 'image': {
                return await client.sendMessage(m.jid, {
                    image: { url: imageUrl },
                    caption: menuText
                }, { quoted: sperky });
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
                }, { quoted: sperky });
            }
            case 'document': {
                return await client.sendMessage(m.jid, {
                    document: { url: imageUrl },
                    caption: menuText,
                    mimetype: 'application/zip',
                    fileName: "RAHUL-AI-NEXUS.zip",
                    fileLength: "99999999999",
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
                }, { quoted: sperky });
            }
            case 'video': {
                return await client.sendMessage(m.jid, {
                    video: { url: imageUrl },
                    caption: menuText,
                    gifPlayback: true
                }, { quoted: sperky });
            }
            case 'text':
            default: {
                return await client.sendMessage(m.jid, { text: menuText }, { quoted: sperky });
            }
        }

    } catch (e) {
        console.log("Menu2 Error:", e);
        if (m && m.reply) await m.reply("❌ Menu 2 load hotana error ala ahe!");
    }
}

// --- REGISTER MENU2 COMMAND ---
Sparky({ name: "menu2", category: "misc", fromMe: isPublic, desc: "List multi-layout dynamic menu" }, async ({ client, m, args }) => { 
    await sendMenu2Handler(client, m, args); 
});

// --- PING / SPEEDTEST COMMAND ---
Sparky({ name: "ping", category: "misc", fromMe: isPublic, desc: "Check bot response speed" }, async ({ m }) => {
    const start = new Date().getTime();
    let msg = await m.reply("⚡ Testing Speed...");
    const end = new Date().getTime();
    const speed = end - start;
    return await m.reply(`*Response Speed:* ${speed}ms 🚀`);
});

// --- NEW: AUTO-BIO / PROFILE STATUS UPDATER ---
let autoBioInterval = null;

Sparky({ name: "autobio", category: "misc", fromMe: isPublic, desc: "Toggle automated live bio updates on the bot profile" }, async ({ m, client, args }) => {
    try {
        const action = (args || "").toLowerCase().trim();

        if (action === "on") {
            if (autoBioInterval) clearInterval(autoBioInterval);

            autoBioInterval = setInterval(async () => {
                try {
                    let d = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
                    let bioText = `🚀 RAHUL-AI Active | ⏰ ${d} | ⚡ Powered by Rahul Master`;
                    if (client.updateProfileStatus) {
                        await client.updateProfileStatus(bioText);
                    }
                } catch (e) {
                    // Silent catch for profile rate limits
                }
            }, 60000); // Updates every 1 minute

            return await m.reply("✅ Auto-Bio successfully ON zali ahe! (Pratyek 1 minitane bio update hoil)");
        } else if (action === "off") {
            if (autoBioInterval) {
                clearInterval(autoBioInterval);
                autoBioInterval = null;
            }
            return await m.reply("✅ Auto-Bio successfully OFF zali ahe!");
        } else {
            return await m.reply(`*Auto-Bio Status:* ${autoBioInterval ? "ON 🟢" : "OFF 🔴"}\n*Vapra:* _.autobio on_ kinva _.autobio off_`);
        }
    } catch (err) {
        console.log("Autobio Command Error:", err);
        return await m.reply("❌ Auto-Bio toggle hotana error ala!");
    }
});
