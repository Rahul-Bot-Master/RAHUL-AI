/*------------------------------------------------------------------------------------------------------------------------------------------------------


Copyright (C) 2026 Rahul AI.
Licensed under the GPL-3.0 License;
you may not use this file except in compliance with the License.
Rahul AI - Custom Build


------------------------------------------------------------------------------------------------------------------------------------------------------*/

const { Sparky, isPublic, bing, duckGo, commands } = require("../lib");
const axios = require('axios');

async function getJson(url) {
    let res = await axios.get(url);
    return res.data;
}

function checkIsUrl(string) {
    try {
        return Boolean(new URL(string));
    } catch (_) {
        return false;
    }
}

// --- GOOGLE/BING IMAGE SEARCH (Prefix optional fallback included) ---
Sparky({
  pattern: 'img',
  fromMe: isPublic,
  desc: 'Search google/bing images',
  type: 'search',
}, async ({ client, m, args }) => {
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
  
  if (!query) return await m.reply("*Need a Query*\n_Example: .img ironman, 5_");
  let msg = await m.reply(`Downloading ${imageCount} images of *${query}*`);
  
  try {
      let urls = [];
      try {
          urls = await bing(query, { limit: imageCount });
      } catch (e) {
          console.log("Bing search error, using fallback:", e);
      }

      // Fallback jar bing madhun images alyat nahitar public API vapru
      if (!urls || !urls.length) {
          let fallbackRes = await getJson(`https://api.vyturex.com/search/images?q=${encodeURIComponent(query)}`).catch(() => null);
          if (fallbackRes && fallbackRes.result) {
              urls = fallbackRes.result.map(link => ({ image: link, title: query }));
          }
      }

      if (!urls || !urls.length) {
          try { await msg.edit("*No images found!*"); } catch (e) { await m.reply("*No images found!*"); }
          return;
      }
      
      let sentCount = 0;
      for (let url of urls) {
          if (sentCount >= imageCount) break;
          await new Promise(resolve => setTimeout(resolve, 800));
          try {
              let imageUrl = typeof url === 'string' ? url : (url.image || url.url || url.thumbnail);
              let imageTitle = (typeof url === 'object' && url.title) ? url.title : query;
              if (imageUrl) {
                  await client.sendMessage(m.jid, { image: { url: imageUrl }, caption: imageTitle }, { quoted: m });
                  sentCount++;
              }
          } catch (err) {
              console.log("Send Image Item Error:", err);
          }
      }
      
      try { await msg.edit("*Downloaded*"); } catch (e) { await m.reply("*Downloaded*"); }
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
