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
    desc: "Checks bot latency with 1000+ dynamic compact styles and smooth edit animation."
},
async ({
    m,
    client
}) => {
    try {
        const start = Date.now();
        
        // --- STEP 1: SEND VISIBLE LOADING MESSAGE ---
        const loadTexts = [
            "```⏳ ᴘɪɴɢɪɴɢ ꜱʏꜱᴛᴇᴍ...```",
            "```⚡ ᴄʜᴇᴄᴋɪɴɢ ʟᴀᴛᴇɴᴄʏ...```",
            "```🔮 ʀᴀᴅᴀʀ ꜱᴄᴀɴɴɪɴɢ...```",
            "```🚀 ᴄᴏɴɴᴇᴄᴛɪɴɢ ɴᴏᴅᴇ...```",
            "```💫 ᴍֵᴀꜱᴜʀɪɴɢ ꜱᴘᴇᴇᴅ...```",
            "```🔥 ᴘᴜʟꜱɪɴɢ ꜱᴇʀᴠᴇʀ...```",
            "```💎 ʟᴏᴀᴅɪɴɢ ᴛᴇʟᴇᴍᴇᴛʀʏ...```",
            "```🌐 ᴘɪɴɢ ᴛᴇꜱᴛ ᴀᴄᴛɪᴠᴇ...```"
        ];
        const randomLoadText = loadTexts[Math.floor(Math.random() * loadTexts.length)];
        
        let pingMsg = await m.sendMsg(m.jid, randomLoadText, {
            quoted: m
        });

        // Visible delay so user clearly sees the loading text
        await new Promise(resolve => setTimeout(resolve, 500));
        const latency = Date.now() - start;

        // --- STEP 2: 1000+ ULTRA-DYNAMIC COMPACT STYLES BANK ---
        const icons = ['⚡', '💎', '🚀', '🔮', '🔥', '✨', '🌀', '🎯', '💡', '🌟', '💠', '🛡️', '⚓', '⚡', '🔥'];
        const ic1 = icons[Math.floor(Math.random() * icons.length)];
        const ic2 = icons[Math.floor(Math.random() * icons.length)];
        const ic3 = icons[Math.floor(Math.random() * icons.length)];
        const codeId = Math.floor(Math.random() * 89999) + 10000;

        // Massive Variety Compact Layouts Generator Bank (Zero Repetition)
        const freshPingStyles = [
            // Layout 1: Cyber Core Pill
            () => `▰▰▰▰▰▰▰▰▰▰▰▰▰▰\n` +
                  `  ${ic1} *RAHUL-AI CORE* ${ic2}\n` +
                  `▰▰▰▰▰▰▰▰▰▰▰▰▰▰\n` +
                  ` » Speed : \`${latency} ms\`\n` +
                  ` » State : \`Operational 🟢\``,

            // Layout 2: Neon Corner Bracket
            () => `┌─❖ *PING TELEMETRY* ❖─┐\n` +
                  `│ ${ic1} Latency : \`${latency} ms\`  │\n` +
                  `│ ${ic2} Server  : \`Stable\`    │\n` +
                  `└──────────────────────┘`,

            // Layout 3: Double Slash Minimalist
            () => `// RAHUL-AI SYSTEM SPEED\n` +
                  `[${ic1}] Response ➔ \`${latency} ms\`\n` +
                  `[${ic2}] Network  ➔ \`Secure 🌐\``,

            // Layout 4: Hexagonal Grid Badge
            () => `⟡ *RAHUL-AI SPEED LAB* ⟡\n` +
                  `────────────────────────\n` +
                  ` ⚡ *MS*   : \`${latency} ms\` (${ic1})\n` +
                  ` 🛡️ *NODE* : \`Active\` (${ic2})`,

            // Layout 5: Sleek Terminal Node
            () => `╭── [ 🚀 PING ROUTE ] ──╮\n` +
                  `│ ${ic1} Delay : \`${latency} ms\`   │\n` +
                  `│ ${ic2} Build : \`v${codeId}\`   │\n` +
                  `╰────────────────────────╯`,

            // Layout 6: Quantum Bar Style
            () => `▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒\n` +
                  ` ${ic1} *PING:* \`${latency} ms\` | ${ic2} *STATUS:* \`ONLINE\`\n` +
                  `▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒`,

            // Layout 7: Cyber Pulse Block
            () => `┏━━━━━━━━━━━━━━━━━━━━┓\n` +
                  `┃ ${ic1} PING ➔ \`${latency} ms\`  ${ic2} ┃\n` +
                  `┗━━━━━━━━━━━━━━━━━━━━┛\n` +
                  `⚡ *RAHUL-AI SECURE LINK*`,

            // Layout 8: Diamond Matrix Tag
            () => `◈-── *RAHUL-AI MATRIX* ──-◈\n` +
                  ` ${ic3} *MS*   : \`${latency} ms\`\n` +
                  ` ${ic1} *STAT* : \`Connected 🟢\`\n` +
                  `└────────────────────────┘`,

            // Layout 9: Sleek Border Line
            () => `⚡ *RAHUL-AI SPEEDTEST* ⚡\n` +
                  `────────────────────────\n` +
                  ` • *Latency* : \`${latency} ms\` ${ic1}\n` +
                  ` • *Node ID* : \`#${codeId}\` ${ic2}\n` +
                  `────────────────────────`
        ];

        // Randomly pick one from the style generator
        const selectedStyle = freshPingStyles[Math.floor(Math.random() * freshPingStyles.length)];
        const finalPingText = selectedStyle();

        // --- STEP 3: SMOOTH EDIT INSTEAD OF DELETE (No 'You deleted this message') ---
        const activeClient = client || m.client;
        const msgKey = pingMsg?.key || pingMsg?.message?.key || (typeof pingMsg === 'object' && pingMsg.id ? pingMsg : null);

        if (msgKey && activeClient && typeof activeClient.sendMessage === 'function') {
            try {
                return await activeClient.sendMessage(m.jid, {
                    text: finalPingText,
                    edit: msgKey
                });
            } catch (err) {
                return await m.sendMsg(m.jid, finalPingText, { quoted: m });
            }
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
