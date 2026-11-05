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
        await client.sendMessage(m.from || m.jid, { text: "✅ Auto-Voice is now *ENABLED*!" }, { quoted: m });
        return;
    }
    if (text === "autovoice off") {
        autoVoiceEnabled = false;
        await client.sendMessage(m.from || m.jid, { text: "❌ Auto-Voice is now *DISABLED*!" }, { quoted: m });
        return;
    }

    // 2. Jar AutoVoice band asel kinva message status madhun ala asel tar return houn jail
    if (!autoVoiceEnabled) return;
    let remoteJid = m.from || m.jid;
    if (remoteJid && remoteJid.includes("status@broadcast")) return;

    // 3. Konta trigger word match hotoy te shodhe
    let matchedWord = Object.keys(voiceMap).find(word => text === word || text.includes(word));
    
    if (!matchedWord) return;

    let selectedAudioUrl = voiceMap[matchedWord];
    let targetJid = m.from || m.jid;

    // 4. Audio URL fetch karun Buffer madhe convert karun pathvne (relayMessage error fix sathi)
    try {
        const response = await fetch(selectedAudioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        await client.sendMessage(targetJid, {
            audio: buffer,
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: m });
        
    } catch (e) {
        console.error("AutoVoice error:", e);
    }
});
