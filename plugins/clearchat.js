const { Sparky, isPublic } = require("../lib");

Sparky({
  name: "clearchat",
  alias: ["clear"],
  fromMe: true,
  category: "owner",
  desc: "Clear messages in current chat"
}, async ({ client, m }) => {
  try {
    // Baileys standard chat delete/clear payload
    await client.chatModify(
      { delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] },
      m.jid
    );
    
    return m.reply("🧹 Chat successfully clear zali!");
  } catch (e) {
    try {
      // Jar to fail zala tar chat archive/delete baghuya kinwa direct messages fetch karun delete karu
      await client.chatModify({ delete: true }, m.jid);
      return m.reply("🧹 Chat clear zali!");
    } catch (err) {
      return m.reply(`❌ Error: ${err.message}`);
    }
  }
});
