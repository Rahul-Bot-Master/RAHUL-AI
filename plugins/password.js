const { Sparky, isPublic } = require("../lib");

Sparky({
  name: "password",
  alias: ["genpass", "pass"],
  fromMe: isPublic,
  category: "tools",
  desc: "Generate password with custom text support"
}, async ({ client, m, text }) => {
  try {
    // Jar user ne kahi text dila asel (e.g. .password rahul9356) tar toch vaprel, nahitar random banwel
    let customText = text ? text.trim() : "";
    let password = "";

    if (customText) {
      // Custom text asel tar tyat thode numbers/symbols add karun secure banwel
      const symbols = "!@#$%^&*()_+0123456789";
      let randomSuffix = "";
      for (let i = 0; i < 4; i++) {
        randomSuffix += symbols.charAt(Math.floor(Math.random() * symbols.length));
      }
      password = `${customText}${randomSuffix}`;
    } else {
      // Normal random secure password (14 characters)
      const length = 14;
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
    }

    let responseText = `
┌─── ◇ *PASSWORD GENERATOR* ◇ ───
│
│ 🔑 *Password:* 
│ \`${password}\`
│
│ 💡 *(Tap above to copy)*
│ 🛡️ *Status:* Generated Successfully
│
└───────────────────────────
    `.trim();

    return client.sendMessage(m.jid, { text: responseText }, { quoted: m });
  } catch (e) {
    return m.reply(`❌ Error: ${e.message}`);
  }
});
