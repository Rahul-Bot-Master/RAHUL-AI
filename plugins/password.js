const { Sparky, isPublic } = require("../lib");

Sparky({
  name: "password",
  alias: ["genpass", "pass"],
  fromMe: isPublic,
  category: "tools",
  desc: "Generate a strong random password with easy copy"
}, async ({ client, m }) => {
  try {
    const length = 14; // Length thodi vadhvli ahe security sathi
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    let responseText = `
┌─── ◇ *PASSWORD GENERATOR* ◇ ───
│
│ 🔑 *Password:* 
│ \`${password}\`
│
│ 💡 *(Tap above to copy)*
│ 📏 *Length:* ${length} Characters
│ 🛡️ *Strength:* Ultra Secure
│
└───────────────────────────
    `.trim();

    return client.sendMessage(m.jid, { text: responseText }, { quoted: m });
  } catch (e) {
    return m.reply(`❌ Error: ${e.message}`);
  }
});
