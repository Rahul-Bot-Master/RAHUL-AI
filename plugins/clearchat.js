const { Sparky, isPublic } = require("../lib");

Sparky({
  name: "clearchat",
  alias: ["clear"],
  fromMe: true,
  category: "owner",
  desc: "Clear messages in current chat"
}, async ({ client, m }) => {
  try {
    // Method 1: Baileys chatModify standard format
    await client.chatModify(
      {
        clear: {
          messages: [{ id: m.key.id, fromMe: m.key.fromMe, timestamp: m.messageTimestamp }]
        }
      },
      m.jid
    );
    
    return m.reply("🧹 Chat successfully clear zali!");
  } catch (e) {
    try {
      // Method 2: Fallback jar chatModify fail zali tar message delete method vaprun
      await client.sendMessage(m.jid, { delete: m.key });
      return m.reply("🧹 Chat messages clear kele ahet!");
    } catch (err) {
      return m.reply("❌ Error ala: " + err.message);
    }
  }
});
