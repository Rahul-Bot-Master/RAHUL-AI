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
  let grokApiKey = "grok_e9715fa89c13fb9eea2de47d02e1b010_a48d9ea0bbe0191f0e9ba85398147ef40370c5e2c7edeee7fd74e5deb4607de8";

  try {
    // 1. Direct Grok / xAI API Endpoint integration
    let response = await axios.post(`https://api.x.ai/v1/chat/completions`, {
      model: "grok-beta",
      messages: [{ role: "user", content: query }],
      stream: false
    }, {
      headers: {
        "Authorization": `Bearer ${grokApiKey}`,
        "Content-Type": "application/json"
      }
    });

    answer = response.data.choices[0].message.content;

  } catch (err) {
    console.error("Grok API Error:", err.response?.data || err.message);
    
    // Grok fail zalyavar fallback API vapru
    try {
      let res2 = await axios.get(`https://api.siputzx.my.id/api/ai/chatgpt?prompt=${encodeURIComponent(query)}`);
      answer = res2.data.data || res2.data.result;
    } catch (e) {
      console.error("Fallback API Error:", e.message);
      answer = `Kahi tari samasya nimanali ahe. Punha prayatna kara!`;
    }
  }

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
