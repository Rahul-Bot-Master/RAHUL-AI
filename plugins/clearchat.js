const { Sparky, isPublic } = require("../lib");

Sparky({
  name: "clearchat",
  alias: ["clear", "clearall"],
  fromMe: true,
  category: "owner",
  desc: "Clear messages in current chat"
}, async ({ client, m }) => {
  try {
    // Method: Baileys chatModify clear payload with conversation delete
    await client.chatModify({
      delete: true,
      lastMessages: [{
        key: m.key,
        messageTimestamp: m.messageTimestamp
      }]
    }, m.jid);
    
    return m.reply("🧹 Chat successfully clear zali!");
  } catch (e) {
    try {
      // Fallback: If chatModify throws error, use store/messages deletion if available
      if (client.store && client.store.messages && client.store.messages[m.jid]) {
        client.store.messages[m.jid].array = [];
      }
      
      // WhatsApp standard clear chat protocol via modify
      await client.sendMessage(m.jid, { 
        delete: { remoteJid: m.jid, fromMe: false, id: m.key.id } 
      });
      
      return m.reply("🧹 Chat messages clear kele!");
    } catch (err) {
      return m.reply(`❌ Error: ${err.message}`);
    }
  }
});
