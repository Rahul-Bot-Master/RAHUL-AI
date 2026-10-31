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
    // Free & Working DuckDuckGo AI / Pollinations API (No API Key Required)
    let apiUrl = `https://text.pollinations.ai/${encodeURIComponent(query)}`;
    let response = await axios.get(apiUrl);
    
    let answer = response.data;

    if (!answer || typeof answer !== "string") {
      let fallbackRes = await axios.get(`https://bk9.fun/ai/gptiv?q=${encodeURIComponent(query)}`);
      answer = fallbackRes.data.result || "Sorry, mala hyache uttar bhetle nahi!";
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
