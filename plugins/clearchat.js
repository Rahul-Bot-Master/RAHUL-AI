const { Sparky, isPublic } = require("../lib");

Sparky({
  name: "clearchat",
  alias: ["clear", "clearall"],
  fromMe: true,
  category: "owner",
  desc: "Clear messages in current chat"
}, async ({ client, m }) => {
  try {
    // Exact Baileys multi-device chatModify payload for clearing chat messages
    await client.chatModify({
      delete: true,
      lastMessages: [{
        key: m.key,
        messageTimestamp: m.messageTimestamp
      }]
    }, m.jid);
    
    return m.reply("🧹 Chat successfully clear zali!");
  } catch (e1) {
    try {
      // Alternative Baileys method structure for newer versions
      await client.chatModify({ 
        clear: { 
          messages: [{ id: m.key.id, fromMe: m.key.fromMe, timestamp: m.messageTimestamp }] 
        } 
      }, m.jid);
      
      return m.reply("🧹 Chat messages successfully clear zale!");
    } catch (e2) {
      try {
        // Fallback: Fetch store messages and delete them one by one if chatModify fails
        if (client.store && client.store.loadMessage) {
          const messages = await client.store.loadMessage(m.jid, 50);
          if (messages) {
            for (let msg of messages) {
              await client.sendMessage(m.jid, { delete: msg.key });
            }
          }
        }
        return m.reply("🧹 Chat messages deleted via fallback loop!");
      } catch (err) {
        return m.reply(`❌ Error: ${err.message || e1.message}`);
      }
    }
  }
});
