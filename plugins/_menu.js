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
const style = font[menust];
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

// --- AUTO-ROTATING & MENU 1 TO 10 ENGINE ---
let menuStyleIndex = 0;

async function sendMenuHandler(client, m, args, forcedIndex = null) {
    try {
        if (args && forcedIndex === null) {
            for (let i of plugins.commands) {
                if (i.name.test(args)) {
                    return m.reply(style(`╭───[ COMMAND INFO ]───◆\n│ 📌 *Command:* ${args.trim()}\n│ 📝 *Desc:* ${i.desc.toLowerCase()}\n╰──────────────────────`));
                }
            }
        }

        let [date, time] = new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata"
        }).split(",");
        
        let ownerName = config.BOT_INFO.split(";")[1].toLowerCase();
        let workType = config.WORK_TYPE.toLowerCase();
        let uptimeVal = await m.uptime();

        let cmnd = [];
        let type = [];

        commands.map((command) => {
            if (command.name) {
                let KrizName = command.name;
                let SparkyCmd = KrizName.source.split('\\s*')[1]?.toString().match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)?.[2];
                if (SparkyCmd && !command.dontAddCommandList) {
                    let category = command.category ? command.category.toLowerCase() : "misc";
                    cmnd.push({ Sparky: SparkyCmd, category: category });
                    if (!type.includes(category)) type.push(category);
                }
            }
        });
        cmnd.sort();
        type.sort();

        const generate10MenuStyles = () => {
            let stylesArray = [];

            stylesArray.push((prefixVal) => {
                let header = `┏━━━✦ ⟨ *RAHUL AI : MENU 1* ⟩ ✦━━━┓\n` +
                             `┃ 👑 *Owner*  : ${ownerName}\n` +
                             `┃ ⚙️ *Mode*   : ${workType}\n` +
                             `┃ ⚡ *Prefix* : ${prefixVal}\n` +
                             `┃ 📅 *Date*   : ${date}\n` +
                             `┃ ⏰ *Time*   : ${time}\n` +
                             `┃ ⏱️ *Uptime* : ${uptimeVal}\n` +
                             `┃ 📂 *Plugins*: ${commands.length}\n` +
                             `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n${readMore}\n\n`;
                let body = "";
                type.forEach((cmmd) => {
                    body += `\n┌───❖ *${cmmd.toUpperCase()}* ❖───┐\n`;
                    cmnd.filter(({ category }) => category == cmmd).forEach(({ Sparky }) => {
                        body += `│ 🔹 ${Sparky.trim()}\n`;
                    });
                    body += `└──────────────────────────┘\n`;
                });
                return header + body;
            });

            stylesArray.push((prefixVal) => {
                let header = `╔═🔴═🟠═🟡═🟢═🔵═🟣══╗\n` +
                             `║🔥║ 👑 *Owner*  : ${ownerName}\n` +
                             `║🔥║ ⚙️ *Mode*   : ${workType}\n` +
                             `║🔥║ ⚡ *Prefix* : ${prefixVal}\n` +
                             `║🔥║ 📅 *Date*   : ${date}\n` +
                             `║🔥║ ⏰ *Time*   : ${time}\n` +
                             `║🔥║ ⏱️ *Uptime* : ${uptimeVal}\n` +
                             `║🔥║ 📂 *Plugins*: ${commands.length}\n` +
                             `╚═🟣═🔵═🟢═🟡═🟠═🔴══╝\n${readMore}\n\n`;
                let body = "";
                type.forEach((cmmd) => {
                    body += `\n⚡ ─── 🌟 *${cmmd.toUpperCase()}* 🌟 ─── ⚡\n`;
                    cmnd.filter(({ category }) => category == cmmd).forEach(({ Sparky }) => {
                        body += `┃ 🟠 ⚡ ${Sparky.trim()}\n`;
                    });
                    body += `╰──────────────────────╯\n`;
                });
                return header + body;
            });

            stylesArray.push((prefixVal) => {
                let header = `╭──⚡ [ 🌟 RAHUL AI : MENU 3 🌟 ] ⚡──╮\n` +
                             `│⚡│ 👑 *Owner*  : ${ownerName}\n` +
                             `│⚡│ ⚙️ *Mode*   : ${workType}\n` +
                             `│⚡│ ⚡ *Prefix* : ${prefixVal}\n` +
                             `│⚡│ 📅 *Date*   : ${date}\n` +
                             `│⚡│ ⏰ *Time*   : ${time}\n` +
                             `│⚡│ ⏱️ *Uptime* : ${uptimeVal}\n` +
                             `│⚡│ 📂 *Plugins*: ${commands.length}\n` +
                             `╰──⚡ [ 🌟 END_EDGE 🌟 ] ⚡──╯\n${readMore}\n\n`;
                let body = "";
                type.forEach((cmmd) => {
                    body += `\n🟦 ┌───「 *${cmmd.toUpperCase()}* 」 🟦\n`;
                    cmnd.filter(({ category }) => category == cmmd).forEach(({ Sparky }) => {
                        body += `┃ 🟡 ◈ ${Sparky.trim()}\n`;
                    });
                    body += `┗━━━━━━━━━━━━━━━━━━━━━━┛\n`;
                });
                return header + body;
            });

            stylesArray.push((prefixVal) => {
                let header = `┏━━🔴━━━━━━━━━━━━━━━━━━━━🔴┓\n` +
                             `┃✨┃ 👑 *Owner*  : ${ownerName}\n` +
                             `┃✨┃ ⚙️ *Mode*   : ${workType}\n` +
                             `┃✨┃ ⚡ *Prefix* : ${prefixVal}\n` +
                             `┃✨┃ 📅 *Date*   : ${date}\n` +
                             `┃✨┃ ⏰ *Time*   : ${time}\n` +
                             `┃✨┃ ⏱️ *Uptime* : ${uptimeVal}\n` +
                             `┃✨┃ 📂 *Plugins*: ${commands.length}\n` +
                             `┗━━🔴━━━━━━━━━━━━━━━━━━━━🔴┛\n${readMore}\n\n`;
                let body = "";
                type.forEach((cmmd) => {
                    body += `\n🚀 ─── 🛸 *${cmmd.toUpperCase()}* 🛸 ─── 🚀\n`;
                    cmnd.filter(({ category }) => category == cmmd).forEach(({ Sparky }) => {
                        body += `┃ 🟢 🚀 ${Sparky.trim()}\n`;
                    });
                    body += `╰──────────────────────╯\n`;
                });
                return header + body;
            });

            stylesArray.push((prefixVal) => {
                let header = `⚡ ── [ 🔥 RAHUL AI: MENU 5 🔥 ] ── ⚡\n` +
                             `║💎║ 👑 *Owner*  : ${ownerName}\n` +
                             `║💎║ ⚙️ *Mode*   : ${workType}\n` +
                             `║💎║ ⚡ *Prefix* : ${prefixVal}\n` +
                             `║💎║ 📅 *Date*   : ${date}\n` +
                             `║💎║ ⏰ *Time*   : ${time}\n` +
                             `║💎║ ⏱️ *Uptime* : ${uptimeVal}\n` +
                             `║💎║ 📂 *Plugins*: ${commands.length}\n` +
                             `⚡ ── [ 🔥 MATRIX_END 🔥 ] ── ⚡\n${readMore}\n\n`;
                let body = "";
                type.forEach((cmmd) => {
                    body += `\n👑 ━━━❮ *${cmmd.toUpperCase()}* ❯━━━ 👑\n`;
                    cmnd.filter(({ category }) => category == cmmd).forEach(({ Sparky }) => {
                        body += `┃ 🟣 👑 ${Sparky.trim()}\n`;
                    });
                    body += `┗━━━━━━━━━━━━━━━━━━━━━━┛\n`;
                });
                return header + body;
            });

            stylesArray.push((prefixVal) => {
                let header = `┌──────────────────────────┐\n` +
                             `│ 💎 *RAHUL AI: MENU 6*     │\n` +
                             `├──────────────────────────┤\n` +
                             `│ 👑 *Owner*  : ${ownerName}\n` +
                             `│ ⚙️ *Mode*   : ${workType}\n` +
                             `│ ⚡ *Prefix* : ${prefixVal}\n` +
                             `│ 📅 *Date*   : ${date}\n` +
                             `│ ⏰ *Time*   : ${time}\n` +
                             `│ ⏱️ *Uptime* : ${uptimeVal}\n` +
                             `│ 📂 *Plugins*: ${commands.length}\n` +
                             `└──────────────────────────┘\n${readMore}\n\n`;
                let body = "";
                type.forEach((cmmd) => {
                    body += `\n💎 ───「 *${cmmd.toUpperCase()}* 」─── 💎\n`;
                    cmnd.filter(({ category }) => category == cmmd).forEach(({ Sparky }) => {
                        body += `│ 🔹 ${Sparky.trim()}\n`;
                    });
                    body += `└──────────────────────────┘\n`;
                });
                return header + body;
            });

            stylesArray.push((prefixVal) => {
                let header = `🔮 ═════ [ RAHUL AI: MENU 7 ] ═════ 🔮\n` +
                             `🔮 👑 *Owner*  : ${ownerName}\n` +
                             `🔮 ⚙️ *Mode*   : ${workType}\n` +
                             `🔮 ⚡ *Prefix* : ${prefixVal}\n` +
                             `🔮 📅 *Date*   : ${date}\n` +
                             `🔮 ⏰ *Time*   : ${time}\n` +
                             `🔮 ⏱️ *Uptime* : ${uptimeVal}\n` +
                             `🔮 📂 *Plugins*: ${commands.length}\n` +
                             `🔮 ══════════════════════════ 🔮\n${readMore}\n\n`;
                let body = "";
                type.forEach((cmmd) => {
                    body += `\n🔮 ── *${cmmd.toUpperCase()}* ── 🔮\n`;
                    cmnd.filter(({ category }) => category == cmmd).forEach(({ Sparky }) => {
                        body += `🔮 ➔ ${Sparky.trim()}\n`;
                    });
                    body += `🔮 ────────────────────────── 🔮\n`;
                });
                return header + body;
            });

            stylesArray.push((prefixVal) => {
                let header = `╔══════════════════════════╗\n` +
                             `║   🛡️ RAHUL AI: MENU 8 🛡️  ║\n` +
                             `╚══════════════════════════╝\n` +
                             `💻 👑 *Owner*  : ${ownerName}\n` +
                             `💻 ⚙️ *Mode*   : ${workType}\n` +
                             `💻 ⚡ *Prefix* : ${prefixVal}\n` +
                             `💻 📅 *Date*   : ${date}\n` +
                             `💻 ⏰ *Time*   : ${time}\n` +
                             `💻 ⏱️ *Uptime* : ${uptimeVal}\n` +
                             `💻 📂 *Plugins*: ${commands.length}\n` +
                             `════════════════════════════\n${readMore}\n\n`;
                let body = "";
                type.forEach((cmmd) => {
                    body += `\n🌐 [ *${cmmd.toUpperCase()}* ] 🌐\n`;
                    cmnd.filter(({ category }) => category == cmmd).forEach(({ Sparky }) => {
                        body += `  💻 ➔ ${Sparky.trim()}\n`;
                    });
                    body += `────────────────────────────\n`;
                });
                return header + body;
            });

            stylesArray.push((prefixVal) => {
                let header = `🌟 ━━━━━━━━━━━━━━━━━━━━━━━━ 🌟\n` +
                             `✨ *RAHUL AI : MENU 9* ✨\n` +
                             `🌟 ━━━━━━━━━━━━━━━━━━━━━━━━ 🌟\n` +
                             `⭐ 👑 *Owner*  : ${ownerName}\n` +
                             `⭐ ⚙️ *Mode*   : ${workType}\n` +
                             `⭐ ⚡ *Prefix* : ${prefixVal}\n` +
                             `⭐ 📅 *Date*   : ${date}\n` +
                             `⭐ ⏰ *Time*   : ${time}\n` +
                             `⭐ ⏱️ *Uptime* : ${uptimeVal}\n` +
                             `⭐ 📂 *Plugins*: ${commands.length}\n` +
                             `🌟 ━━━━━━━━━━━━━━━━━━━━━━━━ 🌟\n${readMore}\n\n`;
                let body = "";
                type.forEach((cmmd) => {
                    body += `\n🌟 *${cmmd.toUpperCase()}* 🌟\n`;
                    cmnd.filter(({ category }) => category == cmmd).forEach(({ Sparky }) => {
                        body += `⭐ ${Sparky.trim()}\n`;
                    });
                    body += `────────────────────────────\n`;
                });
                return header + body;
            });

            stylesArray.push((prefixVal) => {
                let header = `╔══════════════════════════╗\n` +
                             `║     👑 RAHUL AI : MENU 10 👑    ║\n` +
                             `╚══════════════════════════╝\n` +
                             `✨ 👑 *Owner*  : ${ownerName}\n` +
                             `✨ ⚙️ *Mode*   : ${workType}\n` +
                             `✨ ⚡ *Prefix* : ${prefixVal}\n` +
                             `✨ 📅 *Date*   : ${date}\n` +
                             `✨ ⏰ *Time*   : ${time}\n` +
                             `✨ ⏱️ *Uptime* : ${uptimeVal}\n` +
                             `✨ 📂 *Plugins*: ${commands.length}\n` +
                             `════════════════════════════\n${readMore}\n\n`;
                let body = "";
                type.forEach((cmmd) => {
                    body += `\n⚜️ ── *${cmmd.toUpperCase()}* ── ⚜️\n`;
                    cmnd.filter(({ category }) => category == cmmd).forEach(({ Sparky }) => {
                        body += `⚜️ ◈ ${Sparky.trim()}\n`;
                    });
                    body += `────────────────────────────\n`;
                });
                return header + body;
            });

            return stylesArray;
        };

        const autoStyles = generate10MenuStyles();
        let targetIndex = forcedIndex !== null ? forcedIndex : menuStyleIndex;
        let selectedMenuStyle = autoStyles[targetIndex](m.prefix);
        
        if (forcedIndex === null) {
            menuStyleIndex = (menuStyleIndex + 1) % autoStyles.length;
        }

        let menu = selectedMenuStyle;
        let sperky = {
            "key": {
                "participants": "0@s.s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Hey!"
            },
            "message": {
                "contactMessage": {
                    "displayName": `${config.BOT_INFO.split(";")[0]}`,
                    "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            },
            "participant": "0@s.whatsapp.net"
        };

        let imageUrl = config.BOT_INFO.split(";")[2] || 'https://n.uguu.se/mZAKwZrP.jpg';

        switch (config.MENU_TYPE.toLowerCase()) {
            case 'big':
                return await client.sendMessage(m.jid, { 
                    text: style(menu), 
                    contextInfo: { 
                        externalAdReply: { 
                            title: style(`Hey ${m.pushName}!`), 
                            body: style(`${config.BOT_INFO.split(";")[0]}`), 
                            mediaType: 1, 
                            showAdAttribution: true, 
                            renderLargerThumbnail: true, 
                            thumbnailUrl: imageUrl,
                            sourceUrl: "https://whatsapp.com" 
                        } 
                    } 
                }, { quoted: m });

            case 'image':
                return await client.sendMessage(m.jid, { 
                    image: { url: imageUrl }, 
                    caption: style(menu) 
                }, { quoted: sperky });

            case 'small':
                return await client.sendMessage(m.jid, { 
                    text: style(menu), 
                    contextInfo: { 
                        externalAdReply: { 
                            title: style(`Hey ${m.pushName}!`), 
                            body: style(`${config.BOT_INFO.style || config.BOT_INFO.split(";")[0]}`), 
                            mediaType: 1, 
                            showAdAttribution: true, 
                            renderLargerThumbnail: false, 
                            thumbnailUrl: imageUrl,
                            sourceUrl: "https://whatsapp.com" 
                        } 
                    } 
                }, { quoted: sperky });

            case 'document':
                return await client.sendMessage(m.jid, { 
                    document: { url: imageUrl }, 
                    caption: menu, 
                    mimetype: 'application/zip', 
                    fileName: style(config.BOT_INFO.split(";")[0]), 
                    fileLength: "99999999999", 
                    contextInfo: { 
                        externalAdReply: { 
                            title: style(`Hey ${m.pushName}!`), 
                            body: style(`${config.BOT_INFO.split(";")[0]}`), 
                            mediaType: 1, 
                            showAdAttribution: true, 
                            renderLargerThumbnail: true, 
                            thumbnailUrl: imageUrl,
                            sourceUrl: "https://whatsapp.com" 
                        } 
                    } 
                }, { quoted: sperky });

            case 'video':
                return await client.sendMessage(m.jid, { 
                    video: { url: imageUrl }, 
                    caption: style(menu), 
                    gifPlayback: true 
                }, { quoted: sperky });

            default:
                return await client.sendMessage(m.jid, { text: style(menu) }, { quoted: sperky });
        }
    } catch (e) {
        console.log("Menu Error:", e);
    }
}

// --- REGISTER MAIN MENU & MENU 1 TO MENU 10 COMMANDS ---
Sparky({ name: "menu", category: "misc", fromMe: isPublic, desc: "List all available commands" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, null); });
Sparky({ name: "menu1", category: "misc", fromMe: isPublic, desc: "Menu Style 1" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 0); });
Sparky({ name: "menu2", category: "misc", fromMe: isPublic, desc: "Menu Style 2" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 1); });
Sparky({ name: "menu3", category: "misc", desc: "Menu Style 3" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 2); });
Sparky({ name: "menu4", category: "misc", fromMe: isPublic, desc: "Menu Style 4" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 3); });
Sparky({ name: "menu5", category: "misc", fromMe: isPublic, desc: "Menu Style 5" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 4); });
Sparky({ name: "menu6", category: "misc", fromMe: isPublic, desc: "Menu Style 6" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 5); });
Sparky({ name: "menu7", category: "misc", fromMe: isPublic, desc: "Menu Style 7" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 6); });
Sparky({ name: "menu8", category: "misc", fromMe: isPublic, desc: "Menu Style 8" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 7); });
Sparky({ name: "menu9", category: "misc", fromMe: isPublic, desc: "Menu Style 9" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 8); });
Sparky({ name: "menu10", category: "misc", fromMe: isPublic, desc: "Menu Style 10" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 9); });
