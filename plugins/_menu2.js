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
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
const os = require("os");

const menuImages = [
    'https://n.uguu.se/STdFjZFjkGat.jpg'
];

function getRandomMenuImage() {
    return menuImages[Math.floor(Math.random() * menuImages.length)];
}

function generateUniqueMenuV2(ownerName, prefixVal, workType, ramUsage, date, time, uptimeVal, cmnd, type, commandsList) {
    const stylesLibrary = [
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
        }
    ];
    return stylesLibrary[0]();
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
        let ramUsage = `${(totalMem - freeMem).toFixed(2)}GB / ${totalMem}GB`;

        let cmnd = [];
        let type = [];
        let commandsList = [];

        commands.map((command) => {
            if (command.name) {
                let SparkyCmd = typeof command.name === "string" ? command.name : (command.pattern || "");
                if (SparkyCmd && !command.dontAddCommandList) {
                    let category = command.category ? command.category.toLowerCase() : "misc";
                    cmnd.push({ Sparky: SparkyCmd, category: category });
                    commandsList.push({ Sparky: SparkyCmd, category: category });
                    if (!type.includes(category)) type.push(category);
                }
            }
        });

        let prefixVal = m.prefix || config.PREFIX || ".";
        let menuText = generateUniqueMenuV2(ownerName, prefixVal, workType, ramUsage, date, time, uptimeVal, cmnd, type, commandsList);
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
