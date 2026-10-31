const { Sparky, isPublic } = require("../lib");

Sparky({
  name: "router",
  alias: ["restartrouter", "signal", "disconnect"],
  fromMe: isPublic,
  category: "fun",
  desc: "Simulate restarting someone's Wi-Fi router to cut off their internet connection"
}, async ({ client, m, text }) => {
  try {
    let target = text ? text.trim() : (m.mentionedJid && m.mentionedJid[0] ? `@${m.mentionedJid[0].split('@')[0]}` : "Target");

    let sentMsg = await client.sendMessage(m.jid, { 
      text: `📡 *CONNECTING TO ROUTER* of ${target}...`,
      mentions: m.mentionedJid || []
    }, { quoted: m });

    // Router steps simulation
    const steps = [
      "🔌 Accessing IP Gateway & bypassing admin login... [30%]",
      "⚠️ Flooding router with heavy ping packets & malicious data... [60%]",
      "🔥 Overheating processor & disconnecting all connected devices... [90%]",
      "✅ *Wi-Fi Router Restarted Successfully!* Connection dead."
    ];

    for (let step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1100));
      await client.sendMessage(m.jid, { text: step, edit: sentMsg.key });
    }

    let finalReport = `
┌─── ◇ *ROUTER KILLER REPORT* ◇ ───
│
│ 🎯 *Victim:* ${target}
│ 📶 *Signal Status:* \`0 Bars (No Internet)\`
│ 📉 *Reason:* Shejarachya router var extra load taklyamule!
│ 🏆 *Verdict:* Offline jhalay mhatla ki shanti! 🤣
│
└───────────────────────────
    `.trim();

    await new Promise(resolve => setTimeout(resolve, 900));
    return client.sendMessage(m.jid, { 
      text: finalReport,
      mentions: m.mentionedJid || []
    }, { quoted: sentMsg.key });

  } catch (e) {
    return m.reply(`❌ Error: ${e.message}`);
  }
});
