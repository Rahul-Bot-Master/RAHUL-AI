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
    desc: "Checks bot latency with compact and dynamic styles."
},
async ({
    m
}) => {
    try {
        const start = Date.now();
        
        let pingMsg = await m.sendMsg(m.jid, "```ᴘɪɴɢ... ⏳```", {
            quoted: m
        });
        
        const latency = Date.now() - start;

        // --- COMPACT & UNIQUE PING STYLES BANK ---
        const bulbs = ['💡', '🏮', '🌟', '⚡', '🔮', '💎', '🔥', '✨'];
        const b1 = bulbs[Math.floor(Math.random() * bulbs.length)];
        const b2 = bulbs[Math.floor(Math.random() * bulbs.length)];
        const seed = Math.floor(Math.random() * 9000) + 1000;

        const compactPingBank = [
            // Style 1: Sleek Mini Box
            () => `╭───────────────╮\n` +
                  `│  ${b1} *RAHUL-AI*  ${b2}   │\n` +
                  `├───────────────┤\n` +
                  `│ ⏱️ Speed : \`${latency} ms\`  │\n` +
                  `│ 🌐 Status: \`Online\`    │\n` +
                  `╰───────────────╯`,

            // Style 2: Elegant Single Line Border
            () => `⚡ *RAHUL-AI PING* ⚡\n` +
                  `─────────────────\n` +
                  `${b1} Latency : \`${latency} ms\`\n` +
                  `${b2} Status  : \`Active 🟢\`\n` +
                  `─────────────────`,

            // Style 3: Clean Minimalist Compact
            () => `┌───────────────┐\n` +
                  `│ ${b1} *SPEED TEST* ${b2} │\n` +
                  `└───────────────┘\n` +
                  ` 📌 Response: \`${latency} ms\`\n` +
                  ` 👑 Owner   : \`Rahul Master\``,

            // Style 4: Modern Tag Style
            () => `🚀 *RAHUL-AI SPEED* 🚀\n` +
                  `• ${b1} **Ping:** \`${latency} ms\`\n` +
                  `• ${b2} **Mode:** \`Public\`\n` +
                  `• 🌐 **Status:** \`Connected\``
        ];

        // Randomly pick a compact layout
        const randomCompactLayout = compactPingBank[Math.floor(Math.random() * compactPingBank.length)];
        const finalPingText = randomCompactLayout();

        // Edit or send the final response
        return await m.sendMsg(m.jid, finalPingText, {
            quoted: m
        });

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
