const { Sparky, isPublic } = require("../lib");
const { getBuffer } = require("./pluginsCore"); // जर कोर फाईल असेल तर

Sparky({ 
    name: "setpp", 
    category: "owner", 
    fromMe: isPublic, 
    desc: "Set or update bot profile picture" 
}, async ({ m, client }) => {
    try {
        let quoted = m.quoted ? m.quoted : m;
        let mime = (quoted.msg || quoted).mimetype || (quoted.message && quoted.message.imageMessage ? 'image/jpeg' : '');

        if (!mime || !mime.includes('image')) {
            return await m.reply("❌ कृपया एखादा फोटो पाठवा किंवा फोटोवर रिप्लाय करून _.setpp_ कमांड वापरा!");
        }

        // Direct media download using built-in method or buffer
        let mediaBuffer;
        if (typeof quoted.download === 'function') {
            mediaBuffer = await quoted.download();
        } else if (typeof m.download === 'function') {
            mediaBuffer = await m.download();
        } else {
            // Fallback using direct stream/buffer downloader
            mediaBuffer = await client.downloadMediaMessage(quoted);
        }

        if (!mediaBuffer) {
            return await m.reply("❌ फोटो डाउनलोड करताना एरर आला!");
        }

        let botJid = client.user.id ? client.user.id.split(':')[0] + '@s.whatsapp.net' : client.user.jid;

        if (client.updateProfilePicture) {
            await client.updateProfilePicture(botJid, mediaBuffer);
            return await m.reply("✅ बॉटचा प्रोफाईल फोटो यशस्वीरित्या बदलला आहे! 📸");
        } else {
            return await m.reply("❌ या Baileys व्हर्जनमध्ये प्रोफाईल पिक्चर अपडेटचे फंक्शन सपोर्ट करत नाही.");
        }

    } catch (err) {
        console.log("SetPP Error:", err);
        return await m.reply("❌ प्रोफाईल फोटो सेट करताना एरर आला!");
    }
});
