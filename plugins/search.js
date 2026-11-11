/*------------------------------------------------------------------------------------------------------------------------------------------------------


Copyright (C) 2026 Rahul AI.
Licensed under the GPL-3.0 License;
you may not use this file except in compliance with the License.
Rahul AI - Custom Build - Fixed & Optimized search.js


------------------------------------------------------------------------------------------------------------------------------------------------------*/

const { Sparky, isPublic, bing, duckGo, commands } = require("../lib");
const axios = require('axios');

async function getJson(url) {
    try {
        let res = await axios.get(url, { timeout: 10000 });
        return res.data;
    } catch (err) {
        console.error("API Fetch Error:", err.message);
        return null;
    }
}

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
  try {
      let queryStr = "";
      if (Array.isArray(args) && args.length > 0) {
          queryStr = args.join(" ");
      } else if (typeof args === "string" && args.trim() !== "") {
          queryStr = args;
      } else if (m && (m.body || m.text)) {
          let textBody = m.body || m.text;
          let parts = textBody.trim().split(" ");
          parts.shift(); // remove command name (.img or img)
          queryStr = parts.join(" ");
      }

      let [query, count] = queryStr.split(',').map(item => item ? item.trim() : "");
      let imageCount = count ? parseInt(count) : 5;
      if (isNaN(imageCount) || imageCount <= 0) imageCount = 5;
      if (imageCount > 10) imageCount = 10; // Prevent spamming too many images
      
      if (!query) return await m.reply("*Need a Query*\n_Example: .img ironman, 5_");
      
      let msg = await m.reply(`Downloading ${imageCount} images of *${query}*...`);
      
      let urls = [];
      try {
          if (typeof bing === 'function') {
              urls = await bing(query, { limit: imageCount });
          }
      } catch (e) {
          console.log("Bing search error, using fallback:", e.message);
      }

      // Fallback if bing returns nothing
      if (!urls || !urls.length) {
          let fallbackRes = await getJson(`https://api.vyturex.com/search/images?q=${encodeURIComponent(query)}`);
          if (fallbackRes && fallbackRes.result) {
              urls = fallbackRes.result.map(link => ({ image: link, title: query }));
          }
      }

      if (!urls || !urls.length) {
          if (msg && typeof msg.edit === 'function') {
              await msg.edit("*No images found!*").catch(() => {});
          } else {
              await m.reply("*No images found!*");
          }
          return;
      }
      
      let sentCount = 0;
      let chatId = m.jid || m.from;

      for (let url of urls) {
          if (sentCount >= imageCount) break;
          await new Promise(resolve => setTimeout(resolve, 800));
          try {
              let imageUrl = typeof url === 'string' ? url : (url?.image || url?.url || url?.thumbnail);
              let imageTitle = (typeof url === 'object' && url?.title) ? url.title : query;
              if (imageUrl && client && chatId) {
                  await client.sendMessage(chatId, { image: { url: imageUrl }, caption: imageTitle }, { quoted: m });
                  sentCount++;
              }
          } catch (err) {
              console.log("Send Image Item Error:", err.message);
          }
      }
      
      if (msg && typeof msg.edit === 'function') {
          await msg.edit("*Downloaded successfully!*").catch(() => {});
      } else {
          await m.reply("*Downloaded successfully!*");
      }
  } catch (err) {
      console.log("Image Search Main Error:", err);
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
    try {
        let match = Array.isArray(args) ? args.join(" ") : (args || "");
        if (!match || checkIsUrl(match)) return await m.reply('_Please provide a valid query_');
        
        const apiBase = "https://api.vyturex.com/"; 
        const data = await getJson(apiBase + `search/xnxx?q=${encodeURIComponent(match)}`);
        if (!data || !data.result || !data.result.length) return await m.reply("*No results found!*");
        
        let responseText = data.result.map(item => `*💎 Title:* ${item.title}\n*🔗 Link:* ${item.link}\n\n`).join("");
        await m.reply(responseText);
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
  try {
      let match = Array.isArray(args) ? args.join(" ") : (args || "");
      if (!match) return await m.reply("*Need a query to search*\n_Example: .duckgo who is iron man_");
      
      let result = typeof duckGo === 'function' ? await duckGo(match) : null;
      if (!result || !result.length || !result[0]) return await m.reply("*Can't find, try again with more info*");
      
      await m.reply(`*⬢ Title :* ${result[0].title || 'N/A'}\n\n*⬢ Description :* ${result[0].description || 'N/A'}\n\n*⬢ Link :* ${result[0].link || 'N/A'}`);    
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
  try {
      let match = Array.isArray(args) ? args.join(" ") : (args || "");
      if (!match) return await m.reply("*Need a query to search*\n_Example: .dg who is iron man_");
      
      let result = typeof duckGo === 'function' ? await duckGo(match) : null;
      if (!result || !result.length || !result[0]) return await m.reply("*Can't find, try again with more info*");
      
      await m.reply(`*⬢ Title :* ${result[0].title || 'N/A'}\n\n*⬢ Description :* ${result[0].description || 'N/A'}\n\n*⬢ Link :* ${result[0].link || 'N/A'}`);    
  } catch (err) {
      console.log("DG Error:", err);
      await m.reply("*Error performing search!*");
  }
});
