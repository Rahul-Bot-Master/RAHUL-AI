const { Sparky, isPublic } = require("../lib");

Sparky({
  name: "alarm",
  alias: ["snooze", "sakali", "zopadpatti"],
  fromMe: isPublic,
  category: "fun",
  desc: "Check someone's master-level skills at setting 10 alarms and snoozing them all morning"
}, async ({ client, m, text }) => {
  try {
    let target = text ? text.trim() : (m.mentionedJid && m.mentionedJid[0] ? `@${m.mentionedJid[0].split('@')[0]}` : "Tu");

    let alarmHabits = [
      "Sakalchya 6 vajapasun dar 5 minutani alarm wajto, pan yaala fakt 10th alarm wajlyavarach jag yete! ⏰😴",
      "Alarm band karanyacha naadamat mobile wall la aaptun todnyachi tayari thevto.",
      "Aai-vadinchi chappal khanyasarakhi vel yeta paryant bed sodnyache naam ghet nahi!",
      "Sakalchya kamasathi uthnyachi vel zalyavar pan 'Fkt 2 min zopto' mhanun aakhi dupar zopun kadhto!",
      "Certified Professional Alarm Snoozer & Morning Sleepyhead!",
      "Kitihi motha alarm asu de, yaachya zope pudhe sagale mute hotat!"
    ];

    let randomHabit = alarmHabits[Math.floor(Math.random() * alarmHabits.length)];
    let snoozeScore = Math.floor(Math.random() * 10) + 90; // 90% to 99%

    let responseText = `
┌─── ◇ *ALARM SNOOZE METER* ◇ ───
│
│ 👤 *Sleepyhead:* ${target}
│ ⏰ *Snooze Score:* \`${snoozeScore}%\`
│ 📉 *Top Habit:* ${randomHabit}
│ 🏆 *Verdict:* Certified Sakalcha Aalsi King! 🤣
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
