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
  on: "all",
  fromMe: false
}, async ({ client, m }) => {
  try {
    if (!m || !m.key || !m.key.id) return;
    
    let chatJid = m.key.remoteJid || "";
    let botNumber = client.user ? client.user.id.split(":")[0] + "@s.whatsapp.net" : "";

    if (
      chatJid.includes("status@broadcast") || 
      chatJid === "broadcast" || 
      m.key.fromMe === true || 
      m.fromMe === true ||
      chatJid === botNumber
    ) {
      return;
    }

    messageStore.set(m.key.id, {
      key: m.key,
      message: m.message,
      remoteJid: chatJid
    });

    if (messageStore.size > 300) {
      const firstKey = messageStore.keys().next().value;
      messageStore.delete(firstKey);
    }
  } catch (err) {
    console.log("Anti-Delete Store Error:", err);
  }
});

// --- ANTI-DELETE DETECTOR (Direct Resend - No Caption) ---
Sparky({
  name: "antidelete_handler",
  on: "message_delete",
  fromMe: false
}, async ({ client, m }) => {
  try {
    if (!global.antiDeleteStatus) return;
    if (!m || !m.key) return;

    let deletedMsgId = m.key.id || (m.message && m.message.protocolMessage?.key?.id);
    if (!deletedMsgId) return;

    let storedMessage = messageStore.get(deletedMsgId);
    if (!storedMessage) return;

    let chatJid = storedMessage.remoteJid;
    if (!chatJid) return;

    // Direct original message resend karnar without any extra text/caption
    if (storedMessage.message) {
      await client.sendMessage(chatJid, storedMessage.message).catch(() => {});
    }

    messageStore.delete(deletedMsgId);

  } catch (e) {
    console.log("Anti-Delete Handler Error:", e);
  }
});
