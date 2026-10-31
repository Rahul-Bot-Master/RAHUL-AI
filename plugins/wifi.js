const { Sparky, isPublic } = require("../lib");

Sparky({
  name: "wifi",
  alias: ["wifithief", "internet", "signal"],
  fromMe: isPublic,
  category: "fun",
  desc: "Check someone's master-level skills at stealing neighbor's Wi-Fi and begging for internet"
}, async ({ client, m, text }) => {
  try {
    let target = text ? text.trim() : (m.mentionedJid && m.mentionedJid[0] ? `@${m.mentionedJid[0].split('@')[0]}` : "Tu");

    let wifiHabits = [
      "Roj ratri shejaryachya gharachya khidki khali jaun Wi-Fi 1 bar signal sathi doke var karun ubha rahto! 📶😂",
      "Konalari bhetla ki pahila prashna asto: 'Bhava, tuza Wi-Fi password kay ahe sang na!'",
      "Data pack samplyavar shejaryacha broadband router hack karnyache WPS pin try karun thakto.",
      "Free public Wi-Fi bhetla ki aayushyacha sagla download (movies, apps, songs) ekach divasatchya aat karto!",
      "Certified Professional Wi-Fi Thief & Broadband Leecher!",
      "Router chya range madhe rahaychi aisi-taisi karun fokat internet vaparnari machine!"
    ];

    let randomHabit = wifiHabits[Math.floor(Math.random() * wifiHabits.length)];
    let thiefScore = Math.floor(Math.random() * 15) + 85; // 85% to 99%

    let responseText = `
┌─── ◇ *WI-FI THIEF DETECTOR* ◇ ───
│
│ 👤 *Network Leecher:* ${target}
│ 📶 *Wi-Fi Thief Score:* \`${thiefScore}%\`
│ 📉 *Top Habit:* ${randomHabit}
│ 🏆 *Verdict:* Certified Shejari Wi-Fi Chor! 🤣
│
└───────────────────────────
    `.trim();

    return client.sendMessage(m.jid, { 
      text: responseText, 
      mentions: m.mentionedJid || [] 
    }, { quoted: m });
  } catch (e) {
    return m.reply(`❌ Error: ${e.message}`);
  }
});
