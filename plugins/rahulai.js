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
    // 100% Working Free AI Endpoint (BK9 API)
    let apiUrl = `https://bk9.fun/ai/gptiv?q=${encodeURIComponent(query)}`;
    let response = await axios.get(apiUrl);
    
    let answer = response.data.result || response.data.response;

    if (!answer || answer.includes("api key")) {
      // Fallback to another public free endpoint
      let fallbackRes = await axios.get(`https://api.siputzx.my.id/api/ai/chatgpt?prompt=${encodeURIComponent(query)}`);
      answer = fallbackRes.data.data || fallbackRes.data.result || "Sorry, mala hyache uttar bhetle nahi!";
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
