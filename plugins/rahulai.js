const { Sparky, isPublic } = require("../lib");
const { GoogleGenAI } = require("@google/genai");

// Botchya env madhe ya direct ithe free Gemini API key taku shaktoos
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY" });

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
    // Official Google Gemini Model (No third-party garbage, no grok errors)
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
    });

    let answer = response.text || "Sorry, mala hyache uttar bhetle nahi!";

    let formattedReply = `╭━━━❖ 🤖 **RAHUL-AI** ❖━━━╮\n\n` +
                         `💬 **Query:** ${query}\n\n` +
                         `✨ **Answer:**\n${answer.trim()}\n\n` +
                         `╰━━━━━━━━━━━━━━━━━━━━━━╯`;

    await m.react("✅");
    return m.reply(formattedReply);

  } catch (e) {
    await m.react("❌");
    return m.reply(`⚠️ Error: ${e.message || "AI server la connect hot nahiye."}`);
  }
});
