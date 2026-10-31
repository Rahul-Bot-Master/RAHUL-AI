const { Sparky, isPublic } = require("../lib");

Sparky({
  name: "apk",
  alias: ["modapk", "cracked", "mod"],
  fromMe: isPublic,
  category: "fun",
  desc: "Check someone's master-level skills at downloading sketchy modded APKs and catching viruses"
}, async ({ client, m, text }) => {
  try {
    let target = text ? text.trim() : (m.mentionedJid && m.mentionedJid[0] ? `@${m.mentionedJid[0].split('@')[0]}` : "Tu");

    let apkHabits = [
      "Play Store varun app download karanyachi aukaat asun pan fkt 'Premium Unlocked Mod APK' shodhnara hacker! 📱🦠",
      "Telegram varcha kontyahi unknown channel varun cracked app download karun swatahchya phone la virus deto.",
      "Mod APK install kelyanantar pop-up ads baghun samorchya la 'Bhai majha phone hack zala re' mhanun ratri radto.",
      "Modded Spotify/YouTube Vanced sathi aakha divas shady websites var search karnari danger machine!",
      "Certified Professional Mod APK Downloader & Virus Collector!",
      "Aayushyat ek pan official app vikat na ghenari ani fkt cracked file var jaganari machine!"
    ];

    let randomHabit = apkHabits[Math.floor(Math.random() * apkHabits.length)];
    let apkScore = Math.floor(Math.random() * 10) + 90; // 90% to 99%

    let responseText = `
┌─── ◇ *APK & MOD DOWNLOADER METER* ◇ ───
│
│ 👤 *Mod Fanatic:* ${target}
│ 🦠 *Virus Score:* \`${apkScore}%\`
│ 📉 *Top Habit:* ${randomHabit}
│ 🏆 *Verdict:* Certified Cracked APK Collector! 🤣
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
