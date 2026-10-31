const { Sparky, isPublic } = require("../lib");

Sparky({
  name: "password",
  alias: ["genpass", "pass"],
  fromMe: isPublic,
  category: "tools",
  desc: "Generate a strong random password with interactive buttons"
}, async ({ client, m }) => {
  try {
    const length = 14;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // Baileys interactive / button message format (Baileys version nusar support bagha)
    const buttonMessage = {
      text: `🔑 *Generated Password:*\n\n\`${password}\`\n\n🛡️ *Strength:* Ultra Secure (14 Chars)`,
      footer: "Rahul AI Password Manager",
      buttons: [
        { buttonId: `pass ${password}`, buttonText: { displayText: "🔄 Generate New" }, type: 1 },
        { buttonId: `copy_${password}`, buttonText: { displayText: "📋 Copy Password" }, type: 1 }
      ],
      headerType: 1
    };

    return client.sendMessage(m.jid, buttonMessage, { quoted: m });
  } catch (e) {
    // Fallback jar button support nasel tar text pathvel
    return m.reply(`🔑 Password: \`${password}\``);
  }
});
