const { Sparky, isPublic } = require("../lib");
const fs = require('fs');

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

        // Proper media downloading for Sparky/Baileys
        let media;
        try {
            media = await client.downloadAndSaveMediaMessage(quoted);
        } catch (e) {
            try {
                media = await quoted.download();
            } catch (err) {
                console.log("Download error:", err);
            }
        }

        if (!media) {
            return await m.reply("❌ फोटो डाऊनलोड करण्यात अपयशी ठरला!");
        }

        let botJid = client.user.id ? client.user.id.split(':')[0] + '@s.whatsapp.net' : client.user.jid;

        // Update profile picture using stream/file path
        await client.updateProfilePicture(botJid, { url: media });

        // Clean up downloaded file if it's a local path
        if (typeof media === 'string' && fs.existsSync(media)) {
            fs.unlinkSync(media);
        }

        return await m.reply("✅ बॉटचा प्रोफाईल फोटो यशस्वीरित्या बदलला आहे! 📸");

    } catch (err) {
        console.log("SetPP Final Error:", err);
        return await m.reply("❌ प्रोफाईल फोटो सेट करताना एरर आला!");
    }
});
