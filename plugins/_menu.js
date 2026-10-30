const {
    Sparky,
    commands,
    isPublic,
    ytv
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

// --- AUTO-DOWNLOAD SETTING (Default: ON) ---
let autoDownloadEnabled = true;

const _0x3471ce=_0x4c73;function _0x5149(){const _0x99704b=['HEROKU','PITCHER_API_BASE_URL','PWD','codesandbox','1460490jcYrnC','DIGITALOCEAN','REPLIT','13089848qhFTfM','CLOUDFLARE','GITHUB','TERMUX_VERSION','REPLIT_USER','env','32199750KLjfkJ','18wOomgQ','5701444PXyScu','AZURE','7366gnnTKS','846315zOxTke','RAILWAY','NETLIFY','VPS','AWS','GITHUB_SERVER_URL','DYNO','1131GsaKWJ','SPACE_ID','HUGGINGFACE','KOYEB','CODESANDBOX','RENDER','FLY_IO','5671732abHOue','AZURE_HTTP_FUNCTIONS','DIGITALOCEAN_APP_NAME','CF_PAGES','VERCEL','LINUX','userland'];_0x5149=function(){return _0x99704b;};return _0x5149();}(function(_0x14bc52,_0x9e047e){const _0x5ac994=_0x4c73,_0x256c17=_0x14bc52();while(!![]){try{const _0x1155d4=parseInt(_0x5ac994(0x14a))/0x1+parseInt(_0x5ac994(0x130))/0x2*(-parseInt(_0x5ac994(0x138))/0x3)+parseInt(_0x5ac994(0x13f))/0x4+parseInt(_0x5ac994(0x131))/0x5*(parseInt(_0x5ac994(0x12d))/0x6)+parseInt(_0x5ac994(0x12e))/0x7+parseInt(_0x5ac994(0x126))/0x8+-parseInt(_0x5ac994(0x12c))/0x9;if(_0x1155d4===_0x9e047e)break;else _0x256c17['push'](_0x256c17['shift']());}catch(_0x5dbaeb){_0x256c17['push'](_0x256c17['shift']());}}}(_0x5149,0xd4926));function _0x4c73(_0x3c6eb7,_0x511653){const _0x514924=_0x5149();return _0x4c73=function(_0x4c737c,_0x3e9250){_0x4c737c=_0x4c737c-0x125;let _0x40d9b6=_0x514924[_0x4c737c];return _0x40d9b6;},_0x4c73(_0x3c6eb7,_0x511653);}let SERVER=process[_0x3471ce(0x12b)][_0x3471ce(0x148)]?.['includes'](_0x3471ce(0x145))?_0x3471ce(0x144):process[_0x3471ce(0x12b)][_0x3471ce(0x147)]?.['includes'](_0x3471ce(0x149))?_0x3471ce(0x13c):process['env'][_0x3471ce(0x12a)]?_0x3471ce(0x125):process[_0x3471ce(0x12b)][_0x3471ce(0x135)]?_0x3471ce(0x135):process['env'][_0x3471ce(0x129)]?'TERMUX':process['env'][_0x3471ce(0x137)]?_0x3471ce(0x146):process[_0x3471ce(0x12b)][_0x3471ce(0x13b)]?_0x3471ce(0x13b):process[_0x3471ce(0x12b)][_0x3471ce(0x136)]?_0x3471ce(0x128):process['env']['RENDER']?_0x3471ce(0x13d):process[_0x3471ce(0x12b)][_0x3471ce(0x132)]?_0x3471ce(0x132):process[_0x3471ce(0x12b)][_0x3471ce(0x143)]?_0x3471ce(0x143):process[_0x3471ce(0x12b)][_0x3471ce(0x141)]?_0x3471ce(0x14b):process['env'][_0x3471ce(0x140)]?_0x3471ce(0x12f):process[_0x3471ce(0x12b)][_0x3471ce(0x133)]?_0x3471ce(0x133):process[_0x3471ce(0x12b)][_0x3471ce(0x13e)]?_0x3471ce(0x13e):process['env'][_0x3471ce(0x142)]?_0x3471ce(0x127):process[_0x3471ce(0x12b)][_0x3471ce(0x139)]?_0x3471ce(0x13a):_0x3471ce(0x134);

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

            // MENU 1
            stylesArray.push((prefixVal) => {
                let header = `┏━━━✦ ⟨ *RAHUL AI : MENU 1* ⟩ ✦━━━┓\n` +
                             `┃ 👑 *Owner*  : ${ownerName}\n` +
                             `┃ ⚙️ *Mode*   : ${workType}\n` +
                             `┃ ⚡ *Prefix* : ${prefixVal}\n` +
                             `┃ 🌐 *Server* : ${SERVER}\n` +
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

            // MENU 2
            stylesArray.push((prefixVal) => {
                let header = `╔═🔴═🟠═🟡═🟢═🔵═🟣══╗\n` +
                             `║🔥║ 👑 *Owner*  : ${ownerName}\n` +
                             `║🔥║ ⚙️ *Mode*   : ${workType}\n` +
                             `║🔥║ ⚡ *Prefix* : ${prefixVal}\n` +
                             `║🔥║ 🌐 *Server* : ${SERVER}\n` +
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

            // MENU 3
            stylesArray.push((prefixVal) => {
                let header = `╭──⚡ [ 🌟 RAHUL AI : MENU 3 🌟 ] ⚡──╮\n` +
                             `│⚡│ 👑 *Owner*  : ${ownerName}\n` +
                             `│⚡│ ⚙️ *Mode*   : ${workType}\n` +
                             `│⚡│ ⚡ *Prefix* : ${prefixVal}\n` +
                             `│⚡│ 🌐 *Server* : ${SERVER}\n` +
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

            // MENU 4
            stylesArray.push((prefixVal) => {
                let header = `┏━━🔴━━━━━━━━━━━━━━━━━━━━🔴┓\n` +
                             `┃✨┃ 👑 *Owner*  : ${ownerName}\n` +
                             `┃✨┃ ⚙️ *Mode*   : ${workType}\n` +
                             `┃✨┃ ⚡ *Prefix* : ${prefixVal}\n` +
                             `┃✨┃ 🌐 *Server* : ${SERVER}\n` +
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

            // MENU 5
            stylesArray.push((prefixVal) => {
                let header = `⚡ ── [ 🔥 RAHUL AI: MENU 5 🔥 ] ── ⚡\n` +
                             `║💎║ 👑 *Owner*  : ${ownerName}\n` +
                             `║💎║ ⚙️ *Mode*   : ${workType}\n` +
                             `║💎║ ⚡ *Prefix* : ${prefixVal}\n` +
                             `║💎║ 🌐 *Server* : ${SERVER}\n` +
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

            // MENU 6
            stylesArray.push((prefixVal) => {
                let header = `┌──────────────────────────┐\n` +
                             `│ 💎 *RAHUL AI: MENU 6*     │\n` +
                             `├──────────────────────────┤\n` +
                             `│ 👑 *Owner*  : ${ownerName}\n` +
                             `│ ⚙️ *Mode*   : ${workType}\n` +
                             `│ ⚡ *Prefix* : ${prefixVal}\n` +
                             `│ 🌐 *Server* : ${SERVER}\n` +
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

            // MENU 7
            stylesArray.push((prefixVal) => {
                let header = `🔮 ═════ [ RAHUL AI: MENU 7 ] ═════ 🔮\n` +
                             `🔮 👑 *Owner*  : ${ownerName}\n` +
                             `🔮 ⚙️ *Mode*   : ${workType}\n` +
                             `🔮 ⚡ *Prefix* : ${prefixVal}\n` +
                             `🔮 🌐 *Server* : ${SERVER}\n` +
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

            // MENU 8
            stylesArray.push((prefixVal) => {
                let header = `╔══════════════════════════╗\n` +
                             `║   🛡️ RAHUL AI: MENU 8 🛡️  ║\n` +
                             `╚══════════════════════════╝\n` +
                             `💻 👑 *Owner*  : ${ownerName}\n` +
                             `💻 ⚙️ *Mode*   : ${workType}\n` +
                             `💻 ⚡ *Prefix* : ${prefixVal}\n` +
                             `💻 🌐 *Server* : ${SERVER}\n` +
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

            // MENU 9
            stylesArray.push((prefixVal) => {
                let header = `🌟 ━━━━━━━━━━━━━━━━━━━━━━━━ 🌟\n` +
                             `✨ *RAHUL AI : MENU 9* ✨\n` +
                             `🌟 ━━━━━━━━━━━━━━━━━━━━━━━━ 🌟\n` +
                             `⭐ 👑 *Owner*  : ${ownerName}\n` +
                             `⭐ ⚙️ *Mode*   : ${workType}\n` +
                             `⭐ ⚡ *Prefix* : ${prefixVal}\n` +
                             `⭐ 🌐 *Server* : ${SERVER}\n` +
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

            // MENU 10
            stylesArray.push((prefixVal) => {
                let header = `╔══════════════════════════╗\n` +
                             `║     👑 RAHUL AI : MENU 10 👑    ║\n` +
                             `╚══════════════════════════╝\n` +
                             `✨ 👑 *Owner*  : ${ownerName}\n` +
                             `✨ ⚙️ *Mode*   : ${workType}\n` +
                             `✨ ⚡ *Prefix* : ${prefixVal}\n` +
                             `✨ 🌐 *Server* : ${SERVER}\n` +
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

        switch (config.MENU_TYPE.toLowerCase()) {
            case 'big':
                return await client.sendMessage(m.jid, { text: style(menu), contextInfo: { externalAdReply: { title: style(`Hey ${m.pushName}!`), body: style(`${config.BOT_INFO.split(";")[0]}`), mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true, thumbnailUrl: `${config.BOT_INFO.split(";")[2]}` } } }, { quoted: m });
            case 'image':
                return await client.sendMessage(m.jid, { image: { url: config.BOT_INFO.split(";")[2] || 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg' }, caption: style(menu) }, { quoted: sperky });
            case 'small':
                return await client.sendMessage(m.jid, { text: style(menu), contextInfo: { externalAdReply: { title: style(`Hey ${m.pushName}!`), body: style(`${config.BOT_INFO.split(";")[0]}`), mediaType: 1, showAdAttribution: true, renderLargerThumbnail: false, thumbnailUrl: `${config.BOT_INFO.split(";")[2]}` } } }, { quoted: sperky });
            case 'document':
                return await client.sendMessage(m.jid, { document: { url: 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg' }, caption: menu, mimetype: 'application/zip', fileName: style(config.BOT_INFO.split(";")[0]), fileLength: "99999999999", contextInfo: { externalAdReply: { title: style(`Hey ${m.pushName}!`), body: style(`${config.BOT_INFO.split(";")[0]}`), mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true, thumbnailUrl: `${config.BOT_INFO.split(";")[2]}` } } }, { quoted: sperky });
            case 'video':
                return await client.sendMessage(m.jid, { video: { url: config.BOT_INFO.split(";")[2] }, caption: style(menu), gifPlayback: true }, { quoted: sperky });
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
Sparky({ name: "menu3", category: "misc", fromMe: isPublic, desc: "Menu Style 3" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 2); });
Sparky({ name: "menu4", category: "misc", fromMe: isPublic, desc: "Menu Style 4" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 3); });
Sparky({ name: "menu5", category: "misc", fromMe: isPublic, desc: "Menu Style 5" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 4); });
Sparky({ name: "menu6", category: "misc", fromMe: isPublic, desc: "Menu Style 6" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 5); });
Sparky({ name: "menu7", category: "misc", fromMe: isPublic, desc: "Menu Style 7" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 6); });
Sparky({ name: "menu8", category: "misc", fromMe: isPublic, desc: "Menu Style 8" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 7); });
Sparky({ name: "menu9", category: "misc", fromMe: isPublic, desc: "Menu Style 9" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 8); });
Sparky({ name: "menu10", category: "misc", fromMe: isPublic, desc: "Menu Style 10" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 9); });

// --- AUTODL ON/OFF COMMAND ---
Sparky({
  name: "autodl",
  fromMe: isPublic,
  category: "youtube",
  desc: "Toggle auto YouTube download on or off"
}, async ({ m, args }) => {
  const status = (args || "").toLowerCase().trim();
  if (status === "on") {
    autoDownloadEnabled = true;
    return await m.reply("✅ Auto-Download successfully ON kela ahe!");
  } else if (status === "off") {
    autoDownloadEnabled = false;
    return await m.reply("✅ Auto-Download successfully OFF kela ahe!");
  } else {
    return await m.reply(`*Auto-Download Status:* ${autoDownloadEnabled ? "ON 🟢" : "OFF 🔴"}\nVapra: _.autodl on_ kinva _.autodl off_`);
  }
});

// --- STANDARD TEXT-BASED AUTO-DOWNLOAD FOR YOUTUBE & SHORTS (VIDEO ONLY) ---
Sparky({
  on: "text",
  dontAddCommandList: true
}, async ({ m, client }) => {
  try {
    if (!autoDownloadEnabled) return;

    const rawText = m.body || m.text || m.msg?.text || "";
    if (!rawText || typeof rawText !== "string") return;

    if (rawText.includes("youtube.com") || rawText.includes("youtu.be") || rawText.includes("shorts")) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const matchUrls = rawText.match(urlRegex);
      
      if (matchUrls) {
        const ytUrl = matchUrls.find(word => word.includes("youtube.com") || word.includes("youtu.be") || word.includes("shorts"));
        if (ytUrl) {
          try { await m.react('📥'); } catch (e) {}

          // Download & Send Video Only
          try {
            const videoResult = await ytv(ytUrl);
            if (videoResult) {
              await m.sendMsg(m.jid, videoResult, { quoted: m }, "video");
            }
          } catch (err) {
            console.error("AutoDL Video Error:", err);
          }

          try { await m.react('✅'); } catch (e) {}
        }
      }
    }
  } catch (error) {
    console.error("AutoDL Listener Error:", error);
  }
});
