const { Sparky, isPublic } = require("../lib");

// Global State for Anti-Delete (Default: ON)
global.antiDeleteStatus = global.antiDeleteStatus !== undefined ? global.antiDeleteStatus : true;

// In-memory message store
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

// --- STORE MESSAGES ---
Sparky({
  name: "antidelete_store",
  on: "all"
}, async ({ client, m }) => {
  try {
    if (!m || !m.key || !m.key.id) return;
    
    let chatJid = m.key.remoteJid || "";
    if (chatJid.includes("status@broadcast") || chatJid === "broadcast") return;

    let messageText = m.body || m.text || "";
    
    if (!messageText && m.message) {
      if (m.message.imageMessage) messageText = "[📷 Photo / Image Message]";
      else if (m.message.videoMessage) messageText = "[📹 Video Message]";
      else if (m.message.audioMessage) messageText = "[🎵 Audio / Voice Message]";
      else if (m.message.documentMessage) messageText = "[📄 Document File]";
      else if (m.message.stickerMessage) messageText = "[✨ Sticker]";
      else messageText = "[Media Message]";
    }

    messageStore.set(m.key.id, {
      body: messageText,
      remoteJid: chatJid,
      sender: m.participant || m.key.participant || chatJid
    });

    if (messageStore.size > 300) {
      const firstKey = messageStore.keys().next().value;
      messageStore.delete(firstKey);
    }
  } catch (err) {
    console.log("Anti-Delete Store Error:", err);
  }
});

// --- ANTI-DELETE DETECTOR (Direct Plain Text - No Caption/Box) ---
Sparky({
  name: "antidelete_handler",
  on: "message_delete"
}, async ({ client, m }) => {
  try {
    if (!global.antiDeleteStatus) return;
    if (!m || !m.key) return;

    let deletedMsgId = m.key.id || (m.message && m.message.protocolMessage?.key?.id);
    if (!deletedMsgId) return;

    let storedMessage = messageStore.get(deletedMsgId);
    if (!storedMessage) return;

    let chatJid = storedMessage.remoteJid;
    let senderNum = storedMessage.sender ? storedMessage.sender.split("@")[0] : "Unknown";
    if (!chatJid) return;

    let deletedText = storedMessage.body || "[Deleted Content]";

    // Kontich box nahi, fukt plain text message pathvto
    let plainMsg = `@${senderNum} deleted: ${deletedText}`;

    await client.sendMessage(chatJid, {
      text: plainMsg,
      mentions: [storedMessage.sender]
    });

    messageStore.delete(deletedMsgId);

  } catch (e) {
    console.log("Anti-Delete Handler Error:", e);
  }
});
