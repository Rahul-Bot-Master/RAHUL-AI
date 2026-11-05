const {
    Sparky,
    isPublic
} = require("../lib/plugins.js");

// AutoVoice On/Off state thevnyasathi variable
let autoVoiceEnabled = true;

// Pratyek trigger word sathi tumhi alag alag Audio/Voice URL ithe taku shakta
const voiceMap = {
    "hi": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "hello": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "good morning": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "good night": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "hey": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "hii": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "bot": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
};

Sparky({on: "text", fromMe: isPublic, name: "rahul-ai-autovoice.js"},
    async ({m, client}) => {
    if (!m) return;

    // Safe text extraction sathi sarv possible properties check karat ahot
    let text = "";
    try {
        text = (m.text || m.body || m.msg?.text || m.message?.conversation || m.message?.extendedTextMessage?.text || "").toLowerCase().trim();
    } catch (err) {
        return;
    }

    if (!text) return;

    // 1. AutoVoice On/Off Command check karne
    if (text === "autovoice on") {
        autoVoiceEnabled = true;
        await client.sendMessage(m.jid, { text: "✅ Auto-Voice is now *ENABLED*!" }, { quoted: m });
        return;
    }
    if (text === "autovoice off") {
        autoVoiceEnabled = false;
        await client.sendMessage(m.jid, { text: "❌ Auto-Voice is now *DISABLED*!" }, { quoted: m });
        return;
    }

    // 2. Jar AutoVoice band asel kinva message status madhun ala asel tar return houn jail
    if (!autoVoiceEnabled) return;
    if (m.jid && m.jid.includes("status@broadcast")) return; // Status var reply nahi karnar

    // 3. Konta trigger word match hotoy te shodhe
    let matchedWord = Object.keys(voiceMap).find(word => text === word || text.includes(word));
    
    if (!matchedWord) return; // Jar kontach word match nahi zala tar kahich send honar nahi

    let selectedAudioUrl = voiceMap[matchedWord];

    // 4. Tyach word sathi tharleli voice note pathvne
    try {
        await client.sendMessage(m.jid, {
            audio: { url: selectedAudioUrl },
            mimetype: 'audio/mp4',
            ptt: true, // Voice note (PTT) sarkhi disel
            fileName: 'autovoice.mp3'
        }, { quoted: m });
        
    } catch (e) {
        console.error("AutoVoice error:", e);
    }
});
