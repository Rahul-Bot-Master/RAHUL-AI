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

  let answer = "";

  try {
    // Try primary API
    let response = await axios.get(`https://api.siputzx.my.id/api/ai/chatgpt?prompt=${encodeURIComponent(query)}`);
    answer = response.data.data || response.data.result || response.data.message;

    if (!answer || typeof answer !== "string" || answer.includes("grok api key") || answer.includes("api key")) {
      // Try secondary API
      let res2 = await axios.get(`https://api.vyturex.com/ai/chat?prompt=${encodeURIComponent(query)}`);
      answer = res2.data.answer || res2.data.result;
    }
  } catch (err) {
    // Ignore network error to fallback safely
  }

  // 🛡️ Ultimate Bulletproof Fallback: Jar API fail zali ya grok error aala, tar smart bot message deil
  if (!answer || typeof answer !== "string" || answer.includes("grok api key") || answer.includes("api key")) {
    answer = `Hello Rahul! Mi RAHUL-AI ahe. Sadha free AI server var traffic khup ahe kinwa key update suru ahe, pan tuzha message "${query}" mala milalay. Laukach apan ya la 100% stable karu! 🚀`;
  }

  let formattedReply = `╭━━━❖ 🤖 **RAHUL-AI** ❖━━━╮\n\n` +
                       `💬 **Query:** ${query}\n\n` +
                       `✨ **Answer:**\n${answer.trim()}\n\n` +
                       `╰━━━━━━━━━━━━━━━━━━━━━━╯`;

  await m.react("✅");
  return m.reply(formattedReply);
});
