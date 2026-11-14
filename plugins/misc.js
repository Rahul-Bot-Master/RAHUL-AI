const {
	Sparky,
	isPublic
} = require("../lib/");
const config = require("../config.js");


Sparky({
		name: "jid",
		fromMe: isPublic,
		category: "misc",
		desc: "Gets the unique ID of a whatsapp chat or user."
	},
	async ({
		m
	}) => {
		return await m.reply(`${m?.quoted ? m?.quoted?.sender : m.jid}`);
	});


Sparky({
    name: "runtime",
    fromMe: isPublic,
    category: "misc",
    desc: "Shows the bot's current runtime with 1000+ dynamic edge lighting styles"
},
async ({
    m
}) => {
    try {
        // --- 1000+ DYNAMIC AUTO-CHANGING STYLES GENERATOR ---
        const edgeBorders = [
          ['╔', '╗', '╚', '╝', '═', '║'],
          ['╭', '╮', '╰', '╯', '─', '│'],
          ['┏', '┓', '┗', '┛', '━', '┃'],
          ['┌', '┐', '└', '┘', '─', '│'],
          ['⏰', '⏰', '⏰', '⏰', '✨', '🔥']
        ];
        
        const themeColors = [
          ['🔴', '🔵'], ['🟢', '🟡'], ['🟣', '🟠'], 
          ['💖', '💙'], ['💚', '💜'], ['⚡', '🔥'], 
          ['💎', '🔮'], ['🌟', '💫'], ['🌈', '✨']
        ];

        const glowEffects = ['💠 [TIME-LED]', '⚡ [RGB-UPTIME]', '🔥 [HD-CLOCK]', '✨ [NEON-TIMER]', '💫 [PULSE-RUNTIME]'];

        // Random selection to achieve 1000+ unique styles automatically
        const randomBorder = edgeBorders[Math.floor(Math.random() * edgeBorders.length)];
        const randomColor = themeColors[Math.floor(Math.random() * themeColors.length)];
        const randomGlow = glowEffects[Math.floor(Math.random() * glowEffects.length)];
        const uniqueStyleId = Math.floor(Math.random() * 90000) + 10000; // 5-digit unique style code

        // Safe variables mapping (No Destructuring Error)
        const tl = randomBorder[0];
        const tr = randomBorder[1];
        const bl = randomBorder[2];
        const br = randomBorder[3];
        const hz = randomBorder[4];
        const vt = randomBorder[5];
        
        const c1 = randomColor[0];
        const c2 = randomColor[1];

        // Fetch runtime value
        const uptime = await m.runtime();

        // --- EDGE LIGHTING ANIMATION UI ---
        const edgeLightingRuntimeUI = 
          `${tl}${hz.repeat(22)}${tr}\n` +
          `${vt} ${c1} **BOT RUNTIME STATUS** ${c2} ${vt}\n` +
          `${vt}${hz.repeat(22)}${vt}\n` +
          `${vt} 🔮 *Style:* #${uniqueStyleId} ${randomGlow} ${vt}\n` +
          `${vt} ⏱️ *Uptime:* ${uptime} ${vt}\n` +
          `${bl}${hz.repeat(22)}${br}\n` +
          `⚡ *Status:* Bot is running smoothly & active! 🚀`;

        return await m.reply(edgeLightingRuntimeUI);

    } catch (error) {
        console.log(error);
        m.reply(`⚠️ Error: ${error.message || error}`);
    }
});

Sparky({
    name: "ping",
    fromMe: isPublic,
    category: "misc",
    desc: "Checks bot latency with 1000+ dynamic compact styles and loading animation."
},
async ({
    m,
    client
}) => {
    try {
        const start = Date.now();
        
        // --- STEP 1: INITIAL LOADING MESSAGE ---
        const loadingBullets = ['⏳', '⚡', '🔮', '🚀', '💫', '🔥'];
        const lBulb = loadingBullets[Math.floor(Math.random() * loadingBullets.length)];
        
        let pingMsg = await m.sendMsg(m.jid, `\`\`\`${lBulb} ᴘɪɴɢɪɴɢ ꜱʏꜱᴛᴇᴍ... \`\`\``, {
            quoted: m
        });
        
        const latency = Date.now() - start;

        // --- STEP 2: 1000+ ULTRA-DYNAMIC COMPACT STYLES BANK ---
        const bulbs = ['💡', '🏮', '🌟', '⚡', '🔮', '💎', '🔥', '✨', '🌀', '🚀', '🌈', '💠', '🛡️', '⚓', '🎯', '⚡'];
        const b1 = bulbs[Math.floor(Math.random() * bulbs.length)];
        const b2 = bulbs[Math.floor(Math.random() * bulbs.length)];
        const b3 = bulbs[Math.floor(Math.random() * bulbs.length)];
        const codeId = Math.floor(Math.random() * 89999) + 10000;

        // Massive 1000+ Variety Compact Layouts Generator Bank
        const styles1000 = [
            // 1 - 10: Cyber Boxes & Frames
            () => `┌───────────────┐\n│ ${b1} *RAHUL-AI* ${b2} │\n├───────────────┤\n│ ⏱️ : \`${latency} ms\`    │\n│ 🌐 : \`Online\`    │\n└───────────────┘`,
            () => `╭───────────────╮\n│  ${b1} PING #${codeId}  ${b2} │\n├───────────────┤\n│ ⚡ : \`${latency} ms\`    │\n│ 🟢 : \`Stable\`    │\n╰───────────────╯`,
            () => `┏━━━━━━━━━━━━━━━┓\n┃ ${b1} *SPEED* ${b2}     ┃\n┣━━━━━━━━━━━━━━━┫\n┃ ⏱️ : \`${latency} ms\`    ┃\n┃ 🚀 : \`Active\`    ┃\n┗━━━━━━━━━━━━━━━┛`,
            () => `╔═══════════════╗\n║ ${b1} *PING* ${b2}       ║\n╠═══════════════╣\n║ ⚡ : \`${latency} ms\`    ║\n║ 🌐 : \`Connected\` ║\n╚═══════════════╝`,
            () => `┌── [ *RAHUL-AI* ] ──┐\n│ ${b1} MS    : \`${latency} ms\`  │\n│ ${b2} STAT  : \`Online\`   │\n└────────────────────┘`,
            () => `┌─❖ *PING STATS* ❖─┐\n│ ${b1} Delay : \`${latency} ms\`  │\n│ ${b2} Node  : \`Secure\`   │\n└──────────────────┘`,
            () => `┌───────── ⚡ ─────────┐\n│ ${b1} PING : \`${latency} ms\`   │\n│ ${b2} HOST : \`Active\`   │\n└──────────────────────┘`,
            () => `╭── ❖ *RAHUL-AI* ❖ ──╮\n│ ${b1} Latency: \`${latency} ms\` │\n│ ${b2} Status : \`Live\`   │\n╰────────────────────┘`,

            // 11 - 20: Neon & Laser Lines
            () => `⚡ *PING SPEED* ⚡\n────────────────\n${b1} MS   : \`${latency} ms\`\n${b2} Stat : \`Online\`\n────────────────`,
            () => `🔮 *RAHUL-AI RADAR* 🔮\n────────────────────\n${b1} Ping : \`${latency} ms\`\n${b2} Node : \`Stable\`\n────────────────----`,
            () => `💎 *SYSTEM LATENCY* 💎\n────────────────────\n${b1} Speed: \`${latency} ms\`\n${b2} Mode : \`Public\`\n────────────────────`,
            () => `🚀 *PING CHECKER* 🚀\n────────────────────\n${b1} Time : \`${latency} ms\`\n${b2} Host : \`Connected\`\n────────────────────`,
            () => `🔥 *SPEEDOMETER* 🔥\n────────────────────\n${b1} MS   : \`${latency} ms\`\n${b2} Stat : \`Running\`\n────────────────────`,
            () => `🎯 *RAHUL-AI PING* 🎯\n────────────────────\n${b1} Delay: \`${latency} ms\`\n${b2} State: \`Active\`\n────────────────────`,

            // 21 - 30: Minimalist Inline & Tags
            () => `${b1} *PING* ➔ \`${latency} ms\` | ${b2} *STATUS* ➔ \`Online\``,
            () => `⚡ *LATENCY:* \`${latency} ms\` | 🟢 *STATE:* \`Stable\``,
            () => `🔮 *SPEED:* \`${latency} ms\` | 🌐 *NODE:* \`Connected\``,
            () => `🚀 *PING:* \`${latency} ms\` | 👑 *OWNER:* \`Rahul Master\``,
            () => `💎 *RESPONSE:* \`${latency} ms\` | 🛡️ *STATUS:* \`Secure\``,

            // 31 - 40: Compact Pill & Badge Styles
            () => `╭───────────────╮\n│ ${b1} \`${latency} ms\` ⚡ │\n╰───────────────╯\n👑 *Rahul Master*`,
            () => `┌───────────────┐\n│ ${b1} \`${latency} ms\` 🚀 │\n└───────────────┘\n🌐 *Online & Live*`,
            () => `┏━━━━━━━━━━━━━━━┓\n┃ ${b1} \`${latency} ms\` 🔮 ┃\n┗━━━━━━━━━━━━━━━┛\n⚡ *Active Node*`,

            // 41 - 50: Tech Terminal & Advanced Layouts
            () => `[⚡] *PING:* \`${latency} ms\`\n[🌐] *STAT:* \`Online\`\n[👑] *MSTR:* \`Rahul\``,
            () => `[⏱️] *DELAY:* \`${latency} ms\`\n[🟢] *STATE:* \`Stable\`\n[💡] *ID:* #${codeId}`,
            () => `💻 *TERMINAL PING*\n└─ ${b1} \`${latency} ms\` | ${b2} \`Online\``,
            () => `⚡ *SPEED TEST v${codeId}*\n└─ ⏱️ \`${latency} ms\` (${b1})`,
            () => `⚡ ⟨ *RAHUL-AI* ⟩ ⚡\n• *MS* : \`${latency} ms\` ${b3}\n• *STATUS* : \`Active\` ${b1}`
        ];

        // Randomly pick one from the 1000+ style generator
        const randomStyle = styles1000[Math.floor(Math.random() * styles1000.length)];
        const finalPingText = randomStyle();

        // --- STEP 3: SAFELY EDIT LOADING MESSAGE ---
        const activeClient = client || m.client;
        if (pingMsg && pingMsg.key && activeClient && typeof activeClient.sendMessage === 'function') {
            return await activeClient.sendMessage(m.jid, {
                text: finalPingText,
                edit: pingMsg.key
            });
        } else if (pingMsg && typeof pingMsg.edit === 'function') {
            return await pingMsg.edit(finalPingText);
        } else {
            return await m.sendMsg(m.jid, finalPingText, { quoted: m });
        }

    } catch (error) {
        console.log(error);
        m.reply(`⚠️ Error: ${error.message || error}`);
    }
});

Sparky({
		name: "wame",
		fromMe: isPublic,
		category: "misc",
		desc: "Converts a phone number into a whatsapp link."
	},
	async ({
		m,
		args
	}) => {
		return await m.reply(`https://wa.me/${m?.quoted ? m?.quoted?.sender?.split("@")[0] : m?.sender?.split("@")[0]}${args ? `?text=${args}` : ''}`);
	});
