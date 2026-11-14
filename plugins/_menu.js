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
const style = font[menust] || (txt => txt);
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

// --- AUTO-DOWNLOAD SETTING (Default: ON) ---
let autoDownloadEnabled = true;

// --- MULTI-IMAGE ROTATOR (All Uguu Direct Links) ---
const menuImages = [
    'https://d.uguu.se/pEvawsUymVpD.jpg',
    'https://n.uguu.se/ChKfLBwqcHwg.jpg',
    'https://n.uguu.se/tfXfnTlMKDlZ.jpg'
];

function getRandomMenuImage() {
    return menuImages[Math.floor(Math.random() * menuImages.length)];
}

const _0x3471ce=_0x4c73;function _0x5149(){const _0x99704b=['HEROKU','PITCHER_API_BASE_URL','PWD','codesandbox','1460490jcYrnC','DIGITALOCEAN','REPLIT','13089848qhFTfM','CLOUDFLARE','GITHUB','TERMUX_VERSION','REPLIT_USER','env','32199750KLjfkJ','18wOomgQ','5701444PXyScu','AZURE','7366gnnTKS','846315zOxTke','RAILWAY','NETLIFY','VPS','AWS','GITHUB_SERVER_URL','DYNO','1131GsaKWJ','SPACE_ID','HUGGINGFACE','KOYEB','CODESANDBOX','RENDER','FLY_IO','5671732abHOue','AZURE_HTTP_FUNCTIONS','DIGITALOCEAN_APP_NAME','CF_PAGES','VERCEL','LINUX','userland'];_0x5149=function(){return _0x99704b;};return _0x5149();}(function(_0x14bc52,_0x9e047e){const _0x5ac994=_0x4c73,_0x256c17=_0x14bc52();while(!![]){try{const _0x1155d4=parseInt(_0x5ac994(0x14a))/0x1+parseInt(_0x5ac994(0x130))/0x2*(-parseInt(_0x5ac994(0x138))/0x3)+parseInt(_0x5ac994(0x13f))/0x4+parseInt(_0x5ac994(0x131))/0x5*(parseInt(_0x5ac994(0x12d))/0x6)+parseInt(_0x5ac994(0x12e))/0x7+parseInt(_0x5ac994(0x126))/0x8+-parseInt(_0x5ac994(0x12c))/0x9;if(_0x1155d4===_0x9e047e)break;else _0x256c17['push'](_0x256c17['shift']());}catch(_0x5dbaeb){_0x256c17['push'](_0x256c17['shift']());}}}(_0x5149,0xd4926));function _0x4c73(_0x3c6eb7,_0x511653){const _0x514924=_0x5149();return _0x4c73=function(_0x4c737c,_0x3e9250){_0x4c737c=_0x4c737c-0x125;let _0x40d9b6=_0x514924[_0x4c737c];return _0x40d9b6;},_0x4c73(_0x3c6eb7,_0x511653);}let SERVER=process[_0x3471ce(0x12b)][_0x3471ce(0x148)]?.['includes'](_0x3471ce(0x145))?_0x3471ce(0x144):process[_0x3471ce(0x12b)][_0x3471ce(0x147)]?.['includes'](_0x3471ce(0x149))?_0x3471ce(0x13c):process['env'][_0x3471ce(0x12a)]?_0x3471ce(0x125):process[_0x3471ce(0x12b)][_0x3471ce(0x135)]?_0x3471ce(0x135):process['env'][_0x3471ce(0x129)]?'TERMUX':process['env'][_0x3471ce(0x137)]?_0x3471ce(0x146):process[_0x3471ce(0x12b)][_0x3471ce(0x13b)]?_0x3471ce(0x13b):process[_0x3471ce(0x12b)][_0x3471ce(0x136)]?_0x3471ce(0x128):process['env']['RENDER']?_0x3471ce(0x13d):process[_0x3471ce(0x12b)][_0x3471ce(0x132)]?_0x3471ce(0x132):process[_0x3471ce(0x12b)][_0x3471ce(0x143)]?_0x3471ce(0x143):process[_0x3471ce(0x12b)][_0x3471ce(0x141)]?_0x3471ce(0x14b):process['env'][_0x3471ce(0x140)]?_0x3471ce(0x12f):process[_0x3471ce(0x12b)][_0x3471ce(0x133)]?_0x3471ce(0x133):process[_0x3471ce(0x12b)][_0x3471ce(0x13e)]?_0x3471ce(0x13e):process['env'][_0x3471ce(0x142)]?_0x3471ce(0x127):process[_0x3471ce(0x12b)][_0x3471ce(0x139)]?_0x3471ce(0x13a):_0x3471ce(0x134);

// --- 3000+ ULTRA-DYNAMIC UNIQUE THEMED STYLES BANK ---
function generateAutoChangingMenu(ownerName, prefixVal, workType, uptimeVal, date, time, cmnd, type, commandsList) {
    const bulbs = ['💡', '🏮', '🌟', '⚡', '🔮', '💎', '🔥', '✨', '🌀', '🚀', '⭐', '🎯', '⚓', '🛡️', '💠'];
    const randomBulb = bulbs[Math.floor(Math.random() * bulbs.length)];
    const dynamicSeed = Math.floor(Math.random() * 3000) + 1;

    const stylesBank = [
        // 1. Cyberpunk Matrix Grid
        () => {
            let h = `╭──────────────────────────────╮\n` +
                    `│  ${randomBulb} [ ⚡ RAHUL-AI NEXUS v${dynamicSeed} ⚡ ]  │\n` +
                    `╰──────────────────────────────╯\n` +
                    ` ❖ Master   : ${ownerName}\n` +
                    ` ❖ Status   : ${workType}\n` +
                    ` ❖ Prefix   : ${prefixVal}\n` +
                    ` ❖ Server   : ${SERVER}\n` +
                    ` ❖ Date     : ${date}\n` +
                    ` ❖ Clock    : ${time}\n` +
                    ` ❖ Uptime   : ${uptimeVal}\n` +
                    ` ❖ Plugins  : 100 Active\n` +
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

        // 2. Diamond Terminal Glow
        () => {
            let h = `◆══════════════════════════════◆\n` +
                    `    ${randomBulb} RAHUL-AI RGB CORE [ #${dynamicSeed} ]\n` +
                    `◆══════════════════════════════◆\n` +
                    ` ◈ Operator : ${ownerName}\n` +
                    ` ◈ Network  : ${workType}\n` +
                    ` ◈ Trigger  : ${prefixVal}\n` +
                    ` ◈ Host     : ${SERVER}\n` +
                    ` ◈ Calendar : ${date}\n` +
                    ` ◈ Time     : ${time}\n` +
                    ` ◈ Active   : ${uptimeVal}\n` +
                    ` ◈ Total    : 100 Modules\n` +
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

        // 3. Sleek Minimalist Matrix
        () => {
            let h = `================================\n` +
                    `     ${randomBulb} RAHUL-AI VIPER [ #${dynamicSeed} ]\n` +
                    `================================\n` +
                    ` • User   : ${ownerName}\n` +
                    ` • Mode   : ${workType}\n` +
                    ` • Prefix : ${prefixVal}\n` +
                    ` • Node   : ${SERVER}\n` +
                    ` • Date   : ${date}\n` +
                    ` • Time   : ${time}\n` +
                    ` • Uptime : ${uptimeVal}\n` +
                    ` • Plugins: 100 Loaded\n` +
                    `================================\n${readMore}\n\n`;
            let b = "";
            type.forEach((cmmd) => {
                b += `\n>>> SECTION: ${cmmd.toUpperCase()} <<<\n`;
                commandsList.filter(c => c.category == cmmd).forEach(c => {
                    b += `    - ${prefixVal === 'false' ? '' : prefixVal}${c.Sparky}\n`;
                });
            });
            return h + b;
        },

        // 4. Neon Edge Futuristic Border
        () => {
            let h = `╔══════════════════════════════╗\n` +
                    `║   ${randomBulb} RAHUL-AI QUANTUM [ #${dynamicSeed} ]  ║\n` +
                    `╚══════════════════════════════╝\n` +
                    ` ⬡ Creator  : ${ownerName}\n` +
                    ` ⬡ Protocol : ${workType}\n` +
                    ` ⬡ Prefix   : ${prefixVal}\n` +
                    ` ⬡ Platform : ${SERVER}\n` +
                    ` ⬡ Today    : ${date}\n` +
                    ` ⬡ Clock    : ${time}\n` +
                    ` ⬡ Runtime  : ${uptimeVal}\n` +
                    ` ⬡ Features : 100 Online\n` +
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

        // 5. Starburst Cyber Box
        () => {
            let h = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `   🌠 RAHUL-AI SUPREME v${dynamicSeed} 🌠\n` +
                    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    ` ✦ Admin    : ${ownerName}\n` +
                    ` ✦ WorkMode : ${workType}\n` +
                    ` ✦ Command  : ${prefixVal}\n` +
                    ` ✦ Cluster  : ${SERVER}\n` +
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
        },

        // 6. Cybernetic Core Panel
        () => {
            let h = `┌──────────────────────────────┐\n` +
                    `│  ${randomBulb} RAHUL-AI CORE MATRIX        │\n` +
                    `└──────────────────────────────┘\n` +
                    ` 🔹 Owner   : ${ownerName}\n` +
                    ` 🔹 Mode    : ${workType}\n` +
                    ` 🔹 Prefix  : ${prefixVal}\n` +
                    ` 🔹 Host    : ${SERVER}\n` +
                    ` 🔹 Date    : ${date}\n` +
                    ` 🔹 Time    : ${time}\n` +
                    ` 🔹 Uptime  : ${uptimeVal}\n` +
                    ` 🔹 Plugins : 100 Active\n` +
                    `────────────────────────────────\n${readMore}\n\n`;
            let b = "";
            type.forEach((cmmd) => {
                b += `\n┏━━━❖ ${cmmd.toUpperCase()} ❖━━━┓\n`;
                commandsList.filter(c => c.category == cmmd).forEach(c => {
                    b += `┃ 🔹 ${prefixVal === 'false' ? '' : prefixVal}${c.Sparky}\n`;
                });
                b += `┗━━━━━━━━━━━━━━━━━━━━━━┛\n`;
            });
            return h + b;
        }
    ];

    const randomStyle = stylesBank[Math.floor(Math.random() * stylesBank.length)];
    return randomStyle();
}

// --- BULLETPROOF MENU HANDLER ---
async function sendMenuHandler(client, m, args) {
    try {
        if (args && Array.isArray(plugins.commands)) {
            for (let i of plugins.commands) {
                if (i && i.name && typeof i.name.test === 'function' && i.name.test(args)) {
                    return m.reply(style(`╭───[ COMMAND INFO ]───◆\n│ 📌 *Command:* ${args.trim()}\n│ 📝 *Desc:* ${(i.desc || '').toLowerCase()}\n╰──────────────────────`));
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

        // Generates completely unique layouts with bulbs and dynamic styles every single time!
        let menuText = generateAutoChangingMenu(ownerName, prefixVal, workType, uptimeVal, date, time, cmnd, type, commandsList);
        let imageUrl = getRandomMenuImage(); // Randomly picks from all 3 direct Uguu images!

        // Guaranteed Image Sending
        try {
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

    } catch (e) {
        console.log("Menu Error:", e);
        if (m && m.reply) await m.reply("❌ Menu load hotana error ala ahe: " + e.message);
    }
}

// --- REGISTER SINGLE MENU COMMAND ---
Sparky({ name: "menu", category: "misc", fromMe: isPublic, desc: "List all available commands" }, async ({ client, m, args }) => { await sendMenuHandler(client, m, args); });

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
            const audioBuffer = await getBuffer(audioUrl);
            await client.sendMessage(m.jid, { 
              audio: audioBuffer, 
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
    console.log("AutoDL Listener Error:", error);
  }
});
