const {
    Sparky,
    isPublic
} = require("../lib/plugins.js");

// AutoVoice On/Off state thevnyasathi variable
let autoVoiceEnabled = true;

// Pratyek trigger word sathi tumhi alag alag Audio/Voice URL ithe taku shakta
const voiceMap = {
    "hi": "ITHE_HI_SAATHI_AUDIO_URL_TAKA.mp3",
    "hello": "ITHE_HELLO_SAATHI_AUDIO_URL_TAKA.mp3",
    "good morning": "ITHE_GOOD_MORNING_SAATHI_AUDIO_URL_TAKA.mp3",
    "good night": "ITHE_GOOD_NIGHT_SAATHI_AUDIO_URL_TAKA.mp3",
    "hey": "ITHE_HEY_SAATHI_AUDIO_URL_TAKA.mp3",
    "hii": "ITHE_HII_SAATHI_AUDIO_URL_TAKA.mp3",
    "bot": "ITHE_BOT_SAATHI_AUDIO_URL_TAKA.mp3"
};

Sparky({on: "text", fromMe: isPublic, name: "rahul-ai-autovoice.js"},
    async ({m, client, args}) => {
    args = typeof args === "string" ? args : "";
    let text = args.toLowerCase().trim();

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
    if (m.jid.includes("status@broadcast")) return; // Status var reply nahi karnar

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
