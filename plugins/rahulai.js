const { Sparky, isPublic } = require("../lib");
const axios = require("axios");

Sparky({
  name: "rahulai",
  alias: ["ai", "ask", "chatgpt"],
  fromMe: isPublic,
  category: "ai",
  desc: "Ask anything to Rahul-AI Assistant"
}, async ({ m, args, text }) => {
  let query = text || (Array.isArray(args) ? args.join(" ") : args);
  
  if (!query) {
    return m.reply(`🤖 **RAHUL-AI Assistant**\n\n📌 *Kahi tari query/question liha!*\nExample: \`.rahulai Node.js madhe array kasa banavtat?\``);
  }

  await m.react("⏳");

  try {
    // 100% Free & Stable AI Proxy (No API key / No Grok errors)
    let apiUrl = `https://api.vyturex.com/ai/chat?prompt=${encodeURIComponent(query)}`;
    let response = await axios.get(apiUrl);
    
    let answer = response.data.answer || response.data.result || response.data.message || response.data.data;

    if (!answer || typeof answer !== "string" || answer.includes("api key")) {
      // Direct secondary working public endpoint
      let secondaryRes = await axios.get(`https://apis.davidcyriltech.my.id/ai/gemini?text=${encodeURIComponent(query)}`);
      answer = secondaryRes.data.result || secondaryRes.data.message || "Sorry, mala hyache uttar bhetle nahi!";
    }

    let formattedReply = `╭━━━❖ 🤖 **RAHUL-AI** ❖━━━╮\n\n` +
                         `💬 **Query:** ${query}\n\n` +
                         `✨ **Answer:**\n${answer.trim()}\n\n` +
                         `╰━━━━━━━━━━━━━━━━━━━━━━╯`;

    await m.react("✅");
    return m.reply(formattedReply);

  } catch (e) {
    await m.react("❌");
    return m.reply(`⚠️ Error: AI server la connect hot nahiye, punha try kara.`);
  }
});
