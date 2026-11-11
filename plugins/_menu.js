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
const menust = config.MENU_FONT;
const style = font[menust];
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

// --- AUTO-DOWNLOAD SETTING (Default: ON) ---
let autoDownloadEnabled = true;

const _0x3471ce=_0x4c73;function _0x5149(){const _0x99704b=['HEROKU','PITCHER_API_BASE_URL','PWD','codesandbox','1460490jcYrnC','DIGITALOCEAN','REPLIT','13089848qhFTfM','CLOUDFLARE','GITHUB','TERMUX_VERSION','REPLIT_USER','env','32199750KLjfkJ','18wOomgQ','5701444PXyScu','AZURE','7366gnnTKS','846315zOxTke','RAILWAY','NETLIFY','VPS','AWS','GITHUB_SERVER_URL','DYNO','1131GsaKWJ','SPACE_ID','HUGGINGFACE','KOYEB','CODESANDBOX','RENDER','FLY_IO','5671732abHOue','AZURE_HTTP_FUNCTIONS','DIGITALOCEAN_APP_NAME','CF_PAGES','VERCEL','LINUX','userland'];_0x5149=function(){return _0x99704b;};return _0x5149();}(function(_0x14bc52,_0x9e047e){const _0x5ac994=_0x4c73,_0x256c17=_0x14bc52();while(!![]){try{const _0x1155d4=parseInt(_0x5ac994(0x14a))/0x1+parseInt(_0x5ac994(0x130))/0x2*(-parseInt(_0x5ac994(0x138))/0x3)+parseInt(_0x5ac994(0x13f))/0x4+parseInt(_0x5ac994(0x131))/0x5*(parseInt(_0x5ac994(0x12d))/0x6)+parseInt(_0x5ac994(0x12e))/0x7+parseInt(_0x5ac994(0x126))/0x8+-parseInt(_0x5ac994(0x12c))/0x9;if(_0x1155d4===_0x9e047e)break;else _0x256c17['push'](_0x256c17['shift']());}catch(_0x5dbaeb){_0x256c17['push'](_0x256c17['shift']());}}}(_0x5149,0xd4926));function _0x4c73(_0x3c6eb7,_0x511653){const _0x514924=_0x5149();return _0x4c73=function(_0x4c737c,_0x3e9250){_0x4c737c=_0x4c737c-0x125;let _0x40d9b6=_0x514924[_0x4c737c];return _0x40d9b6;},_0x4c73(_0x3c6eb7,_0x511653);}let SERVER=process[_0x3471ce(0x12b)][_0x3471ce(0x148)]?.['includes'](_0x3471ce(0x145))?_0x3471ce(0x144):process[_0x3471ce(0x12b)][_0x3471ce(0x147)]?.['includes'](_0x3471ce(0x149))?_0x3471ce(0x13c):process['env'][_0x3471ce(0x12a)]?_0x3471ce(0x125):process[_0x3471ce(0x12b)][_0x3471ce(0x135)]?_0x3471ce(0x135):process['env'][_0x3471ce(0x129)]?'TERMUX':process['env'][_0x3471ce(0x137)]?_0x3471ce(0x146):process[_0x3471ce(0x12b)][_0x3471ce(0x13b)]?_0x3471ce(0x13b):process[_0x3471ce(0x12b)][_0x3471ce(0x136)]?_0x3471ce(0x128):process['env']['RENDER']?_0x3471ce(0x13d):process[_0x3471ce(0x12b)][_0x3471ce(0x132)]?_0x3471ce(0x132):process[_0x3471ce(0x12b)][_0x3471ce(0x143)]?_0x3471ce(0x143):process[_0x3471ce(0x12b)][_0x3471ce(0x141)]?_0x3471ce(0x14b):process['env'][_0x3471ce(0x140)]?_0x3471ce(0x12f):process[_0x3471ce(0x12b)][_0x3471ce(0x133)]?_0x3471ce(0x133):process[_0x3471ce(0x12b)][_0x3471ce(0x13e)]?_0x3471ce(0x13e):process['env'][_0x3471ce(0x142)]?_0x3471ce(0x127):process[_0x3471ce(0x12b)][_0x3471ce(0x139)]?_0x3471ce(0x13a):_0x3471ce(0x134);

// --- MENU ROTATION & ENGINE ---
let menuStyleIndex = 0;

async function sendMenuHandler(client, m, args, forcedIndex = null) {
    try {
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

        const generate10MenuStyles = () => {
            let stylesArray = [];

            // MENU 1: CLASSIC OLDS NEON BOX STYLE
            stylesArray.push((prefixVal) => {
                let header = `┏━━━✦ ⟨ *RAHUL AI : OLD MENU* ⟩ ✦━━━┓\n` +
                             `┃ 👑 *Owner*  : ${ownerName}\n` +
                             `┃ ⚙️ *Mode*   : ${workType}\n` +
                             `┃ ⚡ *Prefix* : ${prefixVal}\n` +
                             `┃ 🌐 *Server* : ${SERVER}\n` +
                             `┃ 📅 *Date*   : ${date}\n` +
                             `┃ ⏰ *Time*   : ${time}\n` +
                             `┃ ⏱️ *Uptime* : ${uptimeVal}\n` +
                             `┃ 📂 *Plugins*: ${cmnd.length}\n` +
                             `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n${readMore}\n\n`;
                let body = "";
                type.forEach((cmmd) => {
                    body += `\n┌───❖ *${cmmd.toUpperCase()}* ❖───┐\n`;
                    cmnd.filter(({ category }) => category == cmmd).forEach(({ Sparky }) => {
                        body += `│ 🔹 ${prefixVal === 'false' ? '' : prefixVal}${Sparky.trim()}\n`;
                    });
                    body += `└──────────────────────────┘\n`;
                });
                return header + body;
            });

            // MENU 2: FIRE ANIMATION STYLE
            stylesArray.push((prefixVal) => {
                let header = `╔═🔴═🟠═🟡═🟢═🔵═🟣══╗\n` +
                             `║🔥║ 👑 *Owner*  : ${ownerName}\n` +
                             `║🔥║ ⚙️ *Mode*   : ${workType}\n` +
                             `║🔥║ ⚡ *Prefix* : ${prefixVal}\n` +
                             `║🔥║ 🌐 *Server* : ${SERVER}\n` +
                             `║🔥║ 📅 *Date*   : ${date}\n` +
                             `║🔥║ ⏰ *Time*   : ${time}\n` +
                             `║🔥║ ⏱️ *Uptime* : ${uptimeVal}\n` +
                             `║🔥║ 📂 *Plugins*: ${cmnd.length}\n` +
                             `╚═🟣═🔵═🟢═🟡═🟠═🔴══╝\n${readMore}\n\n`;
                let body = "";
                type.forEach((cmmd) => {
                    body += `\n⚡ ─── 🌟 *${cmmd.toUpperCase()}* 🌟 ─── ⚡\n`;
                    cmnd.filter(({ category }) => category == cmmd).forEach(({ Sparky }) => {
                        body += `┃ 🟠 ⚡ ${prefixVal === 'false' ? '' : prefixVal}${Sparky.trim()}\n`;
                    });
                    body += `╰──────────────────────╯\n`;
                });
                return header + body;
            });

            // MENU 3 TO 10
            for (let i = 3; i <= 10; i++) {
                stylesArray.push((prefixVal) => {
                    let header = `╔══════════════════════════╗\n║     👑 RAHUL AI : MENU ${i} 👑    ║\n╚══════════════════════════╝\n✨ 👑 *Owner*  : ${ownerName}\n✨ ⚡ *Prefix* : ${prefixVal}\n✨ 📂 *Plugins*: ${cmnd.length}\n════════════════════════════\n${readMore}\n\n`;
                    let body = "";
                    type.forEach((cmmd) => {
                        body += `\n⚜️ ── *${cmmd.toUpperCase()}* ── ⚜️\n`;
                        cmnd.filter(({ category }) => category == cmmd).forEach(({ Sparky }) => {
                            body += `⚜️ ◈ ${prefixVal === 'false' ? '' : prefixVal}${Sparky.trim()}\n`;
                        });
                        body += `────────────────────────────\n`;
                    });
                    return header + body;
                });
            }

            return stylesArray;
        };

        const autoStyles = generate10MenuStyles();
        let targetIndex = forcedIndex !== null ? forcedIndex : menuStyleIndex;
        let pfx = m.prefix || config.PREFIX || ".";
        let selectedMenuStyle = autoStyles[targetIndex](pfx);
        
        if (forcedIndex === null) {
            menuStyleIndex = (menuStyleIndex + 1) % autoStyles.length;
        }

        let menuText = style(selectedMenuStyle);

        let sperky = {
            "key": {
                "participants": "0@s.s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Hey!"
            },
            "message": {
                "contactMessage": {
                    "displayName": `${config.BOT_INFO ? config.BOT_INFO.split(";")[0] : "RAHUL-AI"}`,
                    "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            },
            "participant": "0@s.whatsapp.net"
        };

        return await client.sendMessage(m.jid, { 
            text: menuText,
            contextInfo: {
                externalAdReply: {
                    title: style(`Hey ${m.pushName || 'Swedar'}!`),
                    body: style(`RAHUL-AI SYSTEM`),
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: true,
                    thumbnailUrl: config.BOT_INFO ? config.BOT_INFO.split(";")[2] : 'https://i.ibb.co/pnPNhMZ/2843ad26fd25.jpg'
                }
            }
        }, { quoted: sperky });

    } catch (e) {
        console.log("Menu Error:", e);
        if (m && m.reply) await m.reply("❌ Menu load hotana error ala ahe!");
    }
}

// --- REGISTER COMMANDS & TEXT FALLBACK LISTENER ---
Sparky({ name: "menu", category: "misc", fromMe: isPublic, desc: "List all available commands" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, null); });
Sparky({ name: "menu1", category: "misc", fromMe: isPublic, desc: "Menu Style 1" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 0); });
Sparky({ name: "menu2", category: "misc", fromMe: isPublic, desc: "Menu Style 1" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 1); });
Sparky({ name: "menu3", category: "misc", fromMe: isPublic, desc: "Menu Style 1" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 2); });
Sparky({ name: "menu4", category: "misc", fromMe: isPublic, desc: "Menu Style 1" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 3); });
Sparky({ name: "menu5", category: "misc", fromMe: isPublic, desc: "Menu Style 1" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 4); });
Sparky({ name: "menu6", category: "misc", fromMe: isPublic, desc: "Menu Style 1" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 5); });
Sparky({ name: "menu7", category: "misc", fromMe: isPublic, desc: "Menu Style 1" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 6); });
Sparky({ name: "menu8", category: "misc", fromMe: isPublic, desc: "Menu Style 1" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 7); });
Sparky({ name: "menu9", category: "misc", fromMe: isPublic, desc: "Menu Style 1" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 8); });
Sparky({ name: "menu10", category: "misc", fromMe: isPublic, desc: "Menu Style 1" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args, 9); });

// --- DIRECT TEXT TRIGGER LISTENER (Handles 'menu' or 'MENU' instantly) ---
Sparky({
  on: "text",
  dontAddCommandList: true
}, async ({ m, client }) => {
  try {
    const rawText = m.body || m.text || (m.message && (m.message.conversation || m.message.extendedTextMessage?.text)) || "";
    const text = rawText.toLowerCase().trim();
    
    if (text === "menu") {
      await sendMenuHandler(client, m, "", null);
    } else if (text.startsWith("menu") && !isNaN(text.replace("menu", ""))) {
      let idx = parseInt(text.replace("menu", "")) - 1;
      if (idx >= 0 && idx <= 9) {
        await sendMenuHandler(client, m, "", idx);
      }
    }
  } catch (err) {
    console.log("Text Listener Error:", err);
  }
});

// --- AUTODL ON/OFF COMMAND ---
let autoDownloadEnabled = true;
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

// --- AUTOMATIC YOUTUBE DOWNLOAD LISTENER ---
Sparky({
  on: "text",
  dontAddCommandList: true
}, async ({ m, client }) => {
  try {
    if (!autoDownloadEnabled) return;

    const remoteJid = m.jid || m.key?.remoteJid || "";
    if (remoteJid.includes("status@broadcast") || remoteJid === "status@broadcast") return;

    const rawText = m.body || m.text || (m.message && (m.message.conversation || m.message.extendedTextMessage?.text)) || "";
    if (!rawText) return;

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matchUrls = rawText.match(urlRegex);
    
    if (matchUrls) {
      const ytUrl = matchUrls.find(word => word.includes("youtube.com") || word.includes("youtu.be"));
      if (ytUrl) {
        try { await m.react('⬇️'); } catch (e) {}
        
        try {
          const videoUrl = await ytv(ytUrl);
          await client.sendMessage(m.jid, { video: { url: videoUrl }, mimetype: "video/mp4" }, { quoted: m });
        } catch (err) {
          console.log("AutoDL Video Error:", err);
        }

        try {
          const audioRes = await yta(ytUrl);
          const audioUrl = typeof audioRes === 'object' ? (audioRes.dl_url || audioRes.url || audioRes.audio) : audioRes;
          
          if (audioUrl) {
            const audioButton = await getBuffer(audioUrl);
            await client.sendMessage(m.jid, { 
              audio: audioButton, 
              mimetype: "audio/mpeg", 
              ptt: false 
            }, { quoted: m });
          }
        } catch (err) {
          console.log("AutoDL Audio Error:", err);
        }

        try { await m.react('✅'); } catch (e) {}
      }
    }
  } catch (error) {
    console.error("AutoDL Listener Error:", error);
  }
});
