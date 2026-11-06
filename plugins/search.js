/*------------------------------------------------------------------------------------------------------------------------------------------------------


Copyright (C) 2026 Rahul AI.
Licensed under the GPL-3.0 License;
you may not use this file except in compliance with the License.
Rahul AI - Custom Build


------------------------------------------------------------------------------------------------------------------------------------------------------*/

const { Sparky, isPublic, bing, duckGo, commands } = require("../lib");
const axios = require('axios');

// Helper function getJson sathi
async function getJson(url) {
    let res = await axios.get(url);
    return res.data;
}

// URL check helper
function checkIsUrl(string) {
    try {
        return Boolean(new URL(string));
    } catch (_) {
        return false;
    }
}

// --- GOOGLE/BING IMAGE SEARCH ---
Sparky({
  pattern: 'img',
  fromMe: isPublic,
  desc: 'Search google/bing images',
  type: 'search',
}, async ({ client, m, args }) => {
  // Args string kinva array asel tar tyala safely handle karne
  let queryStr = "";
  if (Array.isArray(args)) {
      queryStr = args.join(" ");
  } else if (typeof args === "string") {
      queryStr = args;
  } else if (m && m.text) {
      let parts = m.text.split(" ");
      parts.shift(); // remove command name
      queryStr = parts.join(" ");
  }

  let [query, count] = queryStr.split(',').map(item => item ? item.trim() : "");
  let imageCount = count ? parseInt(count) : 5;
  
  if (!query) return await m.reply("*Need a Query*\n_Example: .img ironman, 5_");
  let msg = await m.reply(`Downloading ${imageCount} images of *${query}*`);
  
  try {
      let urls = await bing(query, { limit: imageCount });
      if (!urls || !urls.length) return await m.reply("*No images found*");
      
      for (let url of urls) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          try {
              let imageUrl = url.image || url.url || url.thumbnail;
              if (imageUrl) {
                  await client.sendMessage(m.jid, { image: { url: imageUrl }, caption: url.title || query }, { quoted: m });
              }
          } catch (e) {
              if (!url.thumbnail) continue;
              try {
                  await client.sendMessage(m.jid, { image: { url: url.thumbnail }, caption: url.title || query }, { quoted: m });
              } catch {}
          }
      }
      try { await msg.edit("*Downloaded*"); } catch (e) { await m.reply("*Downloaded*"); }
  } catch (err) {
      console.log("Image Search Error:", err);
      await m.reply("*Failed to fetch images!*");
  }
});

// --- X SEARCHER ---
Sparky({
    pattern: 'xsearch',
    fromMe: isPublic,
    nsfw: true,
    type: "search",
    desc: "Xnxx searcher"
}, async ({ m, args }) => {
    let match = Array.isArray(args) ? args.join(" ") : (args || "");
    if (!match || checkIsUrl(match)) return await m.reply('_Please provide a valid query_');
    try {
        const apiBase = "https://api.vyturex.com/"; 
        const data = await getJson(apiBase + `search/xnxx?q=${encodeURIComponent(match)}`);
        if (!data || !data.result) return await m.reply("*No results found!*");
        await m.reply(data.result.map(item => `*💎 Title:* ${item.title}\n*🔗 Link:* ${item.link}\n\n`).join(""));
    } catch (err) {
        console.log("Xsearch Error:", err);
        await m.reply("*Error fetching data!*");
    }
});

// --- DUCKDUCKGO SEARCH ---
Sparky({
    pattern: 'duckgo',
    fromMe: isPublic,
    type: "search",
    desc: "DuckDuckGo searcher"
}, async ({ m, args }) => {
  let match = Array.isArray(args) ? args.join(" ") : (args || "");
  if (!match) return await m.reply("*Need a query to search*\n_Example: .duckgo who is iron man_");
  
  try {
      let result = await duckGo(match);
      if (!result || !result.length) return await m.reply("*Can't find, try again with more info*");
      
      await m.reply(`*⬢ Title :* ${result[0].title}\n\n*⬢ Description :* ${result[0].description}\n\n*⬢ Link :* ${result[0].link}`);    
  } catch (err) {
      console.log("DuckDuckGo Error:", err);
      await m.reply("*Error performing search!*");
  }
});

// Alias for duckgo -> dg
Sparky({
    pattern: 'dg',
    fromMe: isPublic,
    type: "search",
    desc: "DuckDuckGo searcher alias"
}, async ({ m, args }) => {
  let match = Array.isArray(args) ? args.join(" ") : (args || "");
  if (!match) return await m.reply("*Need a query to search*\n_Example: .dg who is iron man_");
  
  try {
      let result = await duckGo(match);
      if (!result || !result.length) return await m.reply("*Can't find, try again with more info*");
      
      await m.reply(`*⬢ Title :* ${result[0].title}\n\n*⬢ Description :* ${result[0].description}\n\n*⬢ Link :* ${result[0].link}`);    
  } catch (err) {
      console.log("DG Error:", err);
      await m.reply("*Error performing search!*");
  }
});
