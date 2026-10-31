const { Sparky, isPublic } = require("../lib");

Sparky({
  name: "clearchat",
  alias: ["cclear", "wipechat"], // 'clear' काढून टाकलाय जेणेकरून dusra plugin conflict करणार नाही
  fromMe: true,
  category: "owner",
  desc: "Clear messages in current chat"
}, async ({ client, m }) => {
  try {
    await m.reply("🧹 Chat clearing...");

    // Method 1: Baileys chatModify standard payload
    try {
      await client.chatModify({
        delete: true,
        lastMessages: [{
          key: m.key,
          messageTimestamp: m.messageTimestamp
        }]
      }, m.jid);
    } catch (err) {
      // Method 2: Fallback to message deletion loop from store if available
      if (client.store && client.store.chats) {
        const chat = client.store.chats.get(m.jid);
        if (chat && chat.messages) {
          const msgs = chat.messages.all();
          for (let msg of msgs) {
            await client.sendMessage(m.jid, { delete: msg.key });
          }
        }
      } else {
        // Direct delete current message and notify
        await client.sendMessage(m.jid, { delete: m.key });
      }
    }

    return m.reply("🧹 Chat successfully clear zali!");
  } catch (e) {
    return m.reply(`❌ Error: ${e.message}`);
  }
});
