const { Sparky, isPublic } = require("../lib"); // Path tumchya folder structure nusar adjust kara (e.g., "../lib" kiwa "./lib")

Sparky({
  name: "clearchat",
  alias: ["clear"],
  fromMe: true, // Only bot owner vapru shakel
  category: "owner",
  desc: "Clear messages in current chat"
}, async ({ client, m }) => {
  try {
    // Chat modify method Baileys/Sparky framework nusar chat clear karte
    await client.chatModify({ 
      delete: true, 
      lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] 
    }, m.jid);
    
    return m.reply("🧹 Chat successfully clear zali!");
  } catch (e) {
    return m.reply("❌ Chat clear hotana error ala. (Baileys version varun method wegli asu sakte)");
  }
});
