const { Sparky, isPublic } = require("../lib");

Sparky({
  name: "channelreact",
  alias: ["creact"],
  fromMe: isPublic,
  category: "owner",
  desc: "React to a WhatsApp channel message using link"
}, async ({ client, m, args, text }) => {
  try {
    let inputArgs = Array.isArray(args) ? args : text ? text.split(" ") : [];
    let link = inputArgs.find(arg => arg.includes("whatsapp.com/channel/"));
    let emoji = inputArgs.reverse().find(arg => !arg.includes("whatsapp.com/channel/")) || "⚡";

    if (!link) {
      return m.reply("❌ Krupaya valid WhatsApp channel message link ani emoji dya.\n*Example:* `.channelreact <link> ⚡`");
    }

    // Link madhun message ID ani handle/invite code extract karne
    // Format: https://whatsapp.com/channel/CODE/MESSAGE_ID
    let urlParts = link.split("/channel/");
    if (urlParts.length < 2) return m.reply("❌ Link chukiye ahe!");
    
    let subParts = urlParts[1].split("/");
    let inviteCode = subParts[0];
    let serverMessageId = subParts[1];

    if (!serverMessageId) {
      return m.reply("❌ Link madhe message ID bhetla nahi. Krupaya exact message chi link dya.");
    }

    // Channel metadata fetch karun Newsletter JID milavne
    let newsletterJid;
    try {
      let meta = await client.newsletterMetadata("invite", inviteCode);
      newsletterJid = meta.id;
    } catch (err) {
      // Fallback jar invite code direct handle asel
      newsletterJid = inviteCode;
    }

    if (!newsletterJid) {
      return m.reply("❌ Channel info milavnyat apash yash ale.");
    }

    // Baileys newsletter reaction payload send karne
    await client.sendMessage(newsletterJid, {
      react: {
        text: emoji,
        key: {
          remoteJid: newsletterJid,
          id: serverMessageId,
          fromMe: false
        }
      }
    });

    return m.reply(`✅ Successfully reacted with ${emoji} to the channel message!`);

  } catch (e) {
    console.error(e);
    return m.reply(`❌ Error: ${e.message || e}`);
  }
});
