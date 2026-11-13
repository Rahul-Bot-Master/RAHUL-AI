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

// --- PREMIUM MENU 2 HANDLER ---
async function sendMenu2Handler(client, m, args) {
    try {
        if (args) {
            for (let i of plugins.commands) {
                if (i.name && i.name.test && i.name.test(args)) {
                    let cmdInfo = `╭───[ COMMAND INFO ]───◆\n│ 📌 *Command:* ${args.trim()}\n│ 📝 *Desc:* ${(i.desc || '').toLowerCase()}\n╰──────────────────────`;
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
        
        // --- SYSTEM STATS (RAM & CPU USAGE) ---
        let totalMem = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
        let freeMem = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
        let ramUsage = `${(totalMem - freeMem).toFixed(2)}GB / ${totalMem}GB`;

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

        // --- CLEAN NORMAL TEXT HEADER ---
        let header = `┏━━━✦ ⟨ RAHUL-AI ULTIMATE ⟩ ✦━━━┓\n` +
                     `┃ 👑 Owner  : ${ownerName}\n` +
                     `┃ ⚡ Prefix : ${prefixVal}\n` +
                     `┃ ⚙️ Mode   : ${workType}\n` +
                     `┃ 📊 RAM    : ${ramUsage}\n` +
                     `┃ 📅 Date   : ${date}\n` +
                     `┃ ⏰ Time   : ${time}\n` +
                     `┃ ⏱️ Uptime : ${uptimeVal}\n` +
                     `┃ 📂 Plugins: ${cmnd.length}\n` +
                     `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n${readMore}\n\n`;

        let body = "";
        type.forEach((cmmd) => {
            body += `\n┌───❖ ${cmmd.toUpperCase()} ❖───┐\n`;
            cmnd.filter(({ category }) => category == cmmd).forEach(({ Sparky }) => {
                body += `│ 🔹 ${prefixVal === 'false' ? '' : prefixVal}${Sparky.trim()}\n`;
            });
            body += `└──────────────────────────┘\n`;
        });

        let menuText = header + body;
        let imageUrl = getRandomMenuImage();
        let menuType = config.MENU_TYPE ? config.MENU_TYPE.toLowerCase() : "big";

        let sperky = {
            "key": {
                "participants": "0@s.s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "RAHUL-AI"
            },
            "message": {
                "conversation": "RAHUL AI MENU 2"
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
                            body: "RAHUL-AI SMART BOT",
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
                            body: "RAHUL-AI SMART BOT",
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
                    fileName: "RAHUL-AI-MENU.zip",
                    fileLength: "99999999999",
                    contextInfo: {
                        externalAdReply: {
                            title: `Hey ${m.pushName || 'Rahul'}!`,
                            body: "RAHUL-AI SMART BOT",
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
Sparky({ name: "menu2", category: "misc", fromMe: isPublic, desc: "List premium long menu" }, async ({ client, m, args }) => { 
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

// --- SETVAR COMMAND FOR MENU TYPE ---
Sparky({
  name: "setvar",
  category: "misc",
  fromMe: isPublic,
  desc: "Change menu style type dynamically (big, small, image, document, video, text)"
}, async ({ m, args }) => {
  const type = (args || "").toLowerCase().trim();
  const validTypes = ["big", "small", "image", "document", "video", "text"];
  
  if (!validTypes.includes(type)) {
    return await m.reply(`❌ Invalid menu type!\nVapra: _.setvar big_, _.setvar small_, _.setvar image_, _.setvar document_, _.setvar video_, or _.setvar text_`);
  }
  
  config.MENU_TYPE = type;
  return await m.reply(`✅ Menu type successfully changed to: *${type}*`);
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
