const { Sparky, isPublic } = require("../lib");

Sparky({ 
    name: "setpp", 
    category: "owner", 
    fromMe: isPublic, 
    desc: "Set or update bot profile picture" 
}, async ({ m, client }) => {
    try {
        // Check if quoted message or current message has an image
        let quoted = m.quoted ? m.quoted : m;
        let mime = (quoted.msg || quoted).mimetype || '';

        if (!mime || !mime.startsWith('image/')) {
            return await m.reply("❌ कृपया एखादा फोटो पाठवा किंवा फोटोला रिप्लाय करून _.setpp_ कमांड वापरा!");
        }

        let media = await client.downloadAndSaveMediaMessage(quoted);
        if (!media) {
            return await m.reply("❌ फोटो डाउनलोड करताना एरर आला!");
        }

        // Update profile picture for the bot
        if (client.updateProfilePicture) {
            await client.updateProfilePicture(client.user.id, { url: media });
            return await m.reply("✅ बॉटचा प्रोफाईल फोटो यशस्वीरित्या बदलला आहे! 📸");
        } else {
            return await m.reply("❌ या Baileys व्हर्जनमध्ये प्रोफाईल पिक्चर अपडेटचे फंक्शन सपोर्ट करत नाही.");
        }

    } catch (err) {
        console.log("SetPP Error:", err);
        return await m.reply("❌ प्रोफाईल फोटो सेट करताना एरर आला!");
    }
});
