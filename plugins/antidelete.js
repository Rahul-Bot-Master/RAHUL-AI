const { Sparky, isPublic } = require("../lib");

// Global State for Anti-Delete (Default: ON)
global.antiDeleteStatus = global.antiDeleteStatus !== undefined ? global.antiDeleteStatus : true;

// In-memory message store to keep track of incoming messages
const messageStore = new Map();

// --- ANTI-DELETE ON/OFF COMMAND ---
Sparky({
  name: "antidelete",
  alias: ["antideletemsg"],
  fromMe: isPublic,
  category: "owner",
  desc: "Turn Anti-Delete ON or OFF"
}, async ({ m, args, text }) => {
  let safeArgs = Array.isArray(args) ? args.join(" ") : (typeof args === "string" ? args : "");
  let fullQuery = (text || safeArgs || m.body || m.text || "").toLowerCase();
  
  if (fullQuery.includes("on")) {
    global.antiDeleteStatus = true;
    return m.reply("✅ Anti-Delete is now **ENABLED**!");
  } else if (fullQuery.includes("off")) {
    global.antiDeleteStatus = false;
    return m.reply("❌ Anti-Delete is now **DISABLED**!");
  } else {
    return m.reply(`ℹ️ Current Anti-Delete Status: *${global.antiDeleteStatus ? "ON ✅" : "OFF ❌"}*\n\nUse:\n• \`antidelete on\`\n• \`antidelete off\``);
  }
});

// --- STORE MESSAGES IN BACKGROUND ---
Sparky({
  name: "antidelete_store",
  on: "all",
  fromMe: false
}, async ({ m }) => {
  try {
    if (!m || !m.key || !m.key.id) return;
    
    // Store message data using message ID
    messageStore.set(m.key.id, {
      key: m.key,
      message: m.message,
      sender: m.participant || m.key.remoteJid,
      body: m.body || m.text || "",
      pushName: m.pushName || "User"
    });

    // Limit store size to prevent memory crash (keeps last 500 messages)
    if (messageStore.size > 500) {
      const firstKey = messageStore.keys().next().value;
      messageStore.delete(firstKey);
    }
  } catch (err) {
    console.log("Anti-Delete Store Error:", err);
  }
});

// --- ANTI-DELETE DETECTOR & RESENDER ---
Sparky({
  name: "antidelete_handler",
  on: "message_delete", // Baherchya framework nusar yala 'protocolMessage' kinva delete event asu shakto
  fromMe: false
}, async ({ client, m }) => {
  try {
    if (!global.antiDeleteStatus) return;
    if (!m || !m.key) return;

    let deletedMsgId = m.key.id || (m.message && m.message.protocolMessage?.key?.id);
    if (!deletedMsgId) return;

    let storedMessage = messageStore.get(deletedMsgId);
    if (!storedMessage) return;

    let chatJid = storedMessage.key.remoteJid;
    let sender = storedMessage.sender;

    let infoText = `⚠️ *ANTI-DELETE DETECTED* ⚠️\n\n👤 *Sender:* @${sender.split("@")[0]}\n💬 *Deleted Message:*`;

    // Resend the deleted message to the chat or owner chat
    await client.sendMessage(chatJid, {
      text: `${infoText}\n\n${storedMessage.body || "[Media Message]"}`
    }, { quoted: storedMessage.key });

    // Jar media (photo/video) asel tar ti pan punha pathvnyasathi:
    if (storedMessage.message) {
      await client.sendMessage(chatJid, {
        forward: storedMessage.key
      }).catch(() => {});
    }

  } catch (e) {
    console.log("Anti-Delete Handler Error:", e);
  }
});
