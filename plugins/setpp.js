const { Sparky, isPublic } = require("../lib");

Sparky({ 
    name: "setpp", 
    category: "owner", 
    fromMe: isPublic, 
    desc: "Set or update bot profile picture" 
}, async ({ m, client }) => {
    try {
        // Find media from quoted or current message
        let quoted = m.quoted ? m.quoted : m;
        let mime = (quoted.msg || quoted).mimetype || (quoted.message && quoted.message.imageMessage ? 'image/jpeg' : '');

        if (!mime || !mime.includes('image')) {
            return await m.reply("❌ कृपया एखादा फोटो पाठवा किंवा फोटोवर रिप्लाय करून _.setpp_ कमांड वापरा!");
        }

        let media;
        if (typeof client.downloadAndSaveMediaMessage === 'function') {
            media = await client.downloadAndSaveMediaMessage(quoted);
        } else if (typeof client.downloadMediaMessage === 'function') {
            media = await client.downloadMediaMessage(quoted);
        }

        if (!media) {
            return await m.reply("❌ फोटो डाउनलोड करताना एरर आला!");
        }

        // Update profile picture for the bot
        let botJid = client.user.id ? client.user.id.split(':')[0] + '@s.whatsapp.net' : client.user.jid;

        if (client.updateProfilePicture) {
            await client.updateProfilePicture(botJid, { url: media });
            return await m.reply("✅ बॉटचा प्रोफाईल फोटो यशस्वीरित्या बदलला आहे! 📸");
        } else {
            return await m.reply("❌ या Baileys व्हर्जनमध्ये प्रोफाईल पिक्चर अपडेटचे फंक्शन सपोर्ट करत नाही.");
        }

    } catch (err) {
        console.log("SetPP Error:", err);
        return await m.reply("❌ प्रोफाईल फोटो सेट करताना एरर आला!");
    }
});
