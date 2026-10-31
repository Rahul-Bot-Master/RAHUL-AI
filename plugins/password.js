const { Sparky, isPublic } = require("../lib");

Sparky({
  name: "password",
  alias: ["genpass", "pass"],
  fromMe: isPublic,
  category: "tools",
  desc: "Generate a strong random password"
}, async ({ client, m }) => {
  try {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }

    let responseText = `
┌─── ◇ *PASSWORD GENERATOR* ◇ ───
│
│ 🔑 *Password:* \`${password}\`
│ 📏 *Length:* ${length} Characters
│ 🛡️ *Strength:* Strong / Secure
│
└───────────────────────────
    `.trim();

    return client.sendMessage(m.jid, { text: responseText }, { quoted: m });
  } catch (e) {
    return m.reply(`❌ Error: ${e.message}`);
  }
});
