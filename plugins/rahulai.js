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
    // Multiple free reliable AI endpoints as fallback
    let apis = [
      `https://api.siputzx.my.id/api/ai/chatgpt?prompt=${encodeURIComponent(query)}`,
      `https://deliriussapi-v2.vercel.app/api/openai?q=${encodeURIComponent(query)}`
    ];

    for (let apiUrl of apis) {
      try {
        let res = await axios.get(apiUrl, { timeout: 10000 });
        answer = res.data.data || res.data.result || res.data.message || res.data.answer;
        if (answer) break;
      } catch (err) {
        continue; // Jar ek API fail zali tar dusrya var switch hoil
      }
    }

  } catch (err) {
    console.error("AI API Error:", err.message);
  }

  // Fallback jar APIs kadun response ala nahi tar
  if (!answer || typeof answer !== "string") {
    answer = `Hello Rahul! Mi RAHUL-AI ahe. Tuzha message "${query}" mala milalay. 🚀`;
  }

  let formattedReply = `╭━━━❖ 🤖 **RAHUL-AI** ❖━━━╮\n\n` +
                       `💬 **Query:** ${query}\n\n` +
                       `✨ **Answer:**\n${answer.trim()}\n\n` +
                       `╰━━━━━━━━━━━━━━━━━━━━━━╯`;

  await m.react("✅");
  return m.reply(formattedReply);
});
