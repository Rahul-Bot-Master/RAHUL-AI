const { Sparky, isPublic } = require("../lib");

Sparky({
  name: "password",
  alias: ["genpass", "pass"],
  fromMe: isPublic,
  category: "tools",
  desc: "Generate password with native Copy Code button"
}, async ({ client, m }) => {
  try {
    const length = 14;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // Native WhatsApp Interactive Copy Code Button Payload
    const interactiveMessage = {
      text: `🔑 *Generated Password:*`,
      footer: "Rahul AI Password Manager",
      interactiveMessage: {
        body: { text: `\`${password}\`` },
        footer: { text: "Tap button below to copy password" },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "📋 Copy Password",
                copy_code: password
              })
            }
          ]
        }
      }
    };

    return client.sendMessage(m.jid, interactiveMessage, { quoted: m });
  } catch (e) {
    // Fallback in case native flow isn't supported by the current client wrapper
    return client.sendMessage(m.jid, { 
      text: `🔑 *Password:* \`${password}\`\n\n*(Tap above text to copy)*` 
    }, { quoted: m });
  }
});
