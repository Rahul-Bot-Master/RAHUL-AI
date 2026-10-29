const { Sparky, isPublic, spdl, askGroq, addMessage, getMessages } = require("../lib");
const { getJson, extractUrlsFromText, getString, isUrl } = require("./pluginsCore");
const axios = require('axios');
const fetch = require('node-fetch');
const gis = require("g-i-s");
const config = require("../config.js");
const lang = getString('download');


Sparky({
  name: "insta",
  fromMe: isPublic,
  desc: "Instagram media downloader with 1000+ dynamic edge lighting styles",
  category: "downloader",
},
async ({
  m, client, args
}) => {
  try {
    args = args || m.quoted?.text;
    if (!args) return await m.reply(lang.NEED_URL || "Krupaya Instagram chi link dya!");

    // Clean URL (Remove extra tracking parameters if causing issues)
    let cleanUrl = args.trim();

    // --- 1000+ DYNAMIC AUTO-CHANGING STYLES GENERATOR ---
    const edgeBorders = [
      ['╔', '╗', '╚', '╝', '═', '║'],
      ['╭', '╮', '╰', '╯', '─', '│'],
      ['┏', '┓', '┗', '┛', '━', '┃'],
      ['┌', '┐', '└', '┘', '─', '│'],
      ['📸', '📸', '📸', '📸', '✨', '🔥']
    ];
    
    const themeColors = [
      ['🔴', '🔵'], ['🟢', '🟡'], ['🟣', '🟠'], 
      ['💖', '💙'], ['💚', '💜'], ['⚡', '🔥'], 
      ['💎', '🔮'], ['🌟', '💫'], ['🌈', '✨']
    ];

    const glowEffects = ['💠 [INSTA-LED]', '⚡ [RGB-REELS]', '🔥 [HD-POST]', '✨ [NEON-STORY]', '💫 [PULSE-MEDIA]'];

    const randomBorder = edgeBorders[Math.floor(Math.random() * edgeBorders.length)];
    const randomColor = themeColors[Math.floor(Math.random() * themeColors.length)];
    const randomGlow = glowEffects[Math.floor(Math.random() * glowEffects.length)];
    const uniqueStyleId = Math.floor(Math.random() * 90000) + 10000;

    const tl = randomBorder[0];
    const tr = randomBorder[1];
    const bl = randomBorder[2];
    const br = randomBorder[3];
    const hz = randomBorder[4];
    const vt = randomBorder[5];
    
    const c1 = randomColor[0];
    const c2 = randomColor[1];

    await m.react('⬇️');

    // --- EDGE LIGHTING ANIMATION UI ---
    const edgeLightingUI = 
      `${tl}${hz.repeat(22)}${tr}\n` +
      `${vt} ${c1} **INSTA DOWNLOADER** ${c2} ${vt}\n` +
      `${vt}${hz.repeat(22)}${vt}\n` +
      `${vt} 🔮 *Style:* #${uniqueStyleId} ${randomGlow} ${vt}\n` +
      `${vt} 📥 *Source:* Instagram Media ${vt}\n` +
      `${vt} 🔗 *Link:* ${cleanUrl} ${vt}\n` +
      `${bl}${hz.repeat(22)}${br}\n` +
      `⚡ *Status:* Fetching & Downloading... 🚀`;

    await m.reply(edgeLightingUI);

    // Fetching API response
    let response = await getJson(config.API + "/api/downloader/igdl?url=" + encodeURIComponent(cleanUrl));
    
    // Fallback handlers for different API response structures
    let mediaList = [];
    if (response && response.data) {
        mediaList = Array.isArray(response.data) ? response.data : [response.data];
    } else if (response && response.result) {
        mediaList = Array.isArray(response.result) ? response.result : [response.result];
    } else if (response && response.url) {
        mediaList = [{ url: response.url, type: response.type || 'video' }];
    }

    if (!mediaList || mediaList.length === 0) {
      return await m.reply("❌ Maaf kara, API madhun media bhetli nahi! Link check kara.");
    }

    for (let i of mediaList) {
      let mediaUrl = i.url || i;
      let mediaType = i.type || (mediaUrl.includes('.mp4') ? 'video' : 'image');
      await m.sendMsg(m.jid, mediaUrl, { quoted: m }, mediaType);
    }
    
    await m.react('✅');

  } catch (e) {
    console.log(e);
    await m.react('❌');
    m.reply(`⚠️ Error: ${e.message || e}`);
  }
});

Sparky({
    name: "rahulai",
    fromMe: isPublic,
    category: "misc",
    desc: "AI chat with memory"
},
async ({ m, args }) => {
    if(!config.GROQ_API_KEY) return m.reply("_Please provide a grok api key_");
    args = args || m.quoted?.text;
    if (!args) return m.reply("_Hi this is Sparky Your Ai. Assistant How can i help you?_");

    try {
        const chatId = m.jid;
        let history = getMessages(chatId) || [];
        history = history
            .filter(msg => msg && msg.role && msg.content)
            .map(msg => ({
                role: msg.role,
                content: String(msg.content)
            }))
        const messages = [
            {
                role: "system",
                content: "You are Sparky, a helpful WhatsApp AI assistant."
            },
            ...history,
            { role: "user", content: args }
        ];
        addMessage(chatId, "user", args);
        const getResult = await askGroq(messages);
        addMessage(chatId, "assistant", getResult);
        return m.reply(getResult);
    } catch (err) {
        console.log("ERROR:", err.message);
        return m.reply("AI broke ☠️");
    }
});

Sparky(
    {
        name: "img",
        fromMe: isPublic,
        desc: "Google Image search",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {
        try {
            async function gimage(query, amount = 5) {
                let list = [];
                return new Promise((resolve, reject) => {
                    gis(query, async (error, result) => {
                        for (
                            var i = 0;
                            i < (result.length < amount ? result.length : amount);
                            i++
                        ) {
                            list.push(result[i].url);
                            resolve(list);
                        }
                    });
                });
            }
            if (!args) return await m.reply("Enter Query,Number");
            let [query,
                amount] = args.split(",");
            let result = await gimage(query, amount);
            await m.reply(
                `_Downloading ${amount || 5} images for ${query}_`
            );
            for (let i of result) {
                await m.sendMsg(m.jid, i, {}, "image")
            }

        } catch (e) {
            console.log(e)
        }
    }
);

Sparky({
    name: "pintrest",
    fromMe: isPublic,
    category: "downloader",
    desc: "Download images and content from Pinterest",
},
async ({
    m, client, args
}) => {
    try {
        let match = args || m.quoted?.text;
        if (!match) return await m.reply(lang.NEED_URL);
        await m.react('⬇️');
        //if (!match.includes("pin.it")) return await m.reply("_Please provide a valid Pinterest URL_");
        const result = await getJson(config.API + "/api/downloader/pin?url=" + match);
        await m.sendFromUrl(result.data.url, { caption: result.data.created_at });
        await m.react('✅');
    } catch (error) {
        await m.react('❌');
        console.error(error);
    }
});

Sparky({
    name: "fb",
    fromMe: isPublic,
    category: "downloader",
    desc: "Download files from Facebook by providing a valid URL",
},
async ({
    m, client, args
}) => {
    try {
        let match = args || m.quoted?.text;
        if (!match) return await m.reply(lang.NEED_URL);
        await m.react('⬇️');
        const data = await getJson(config.API + "/api/downloader/fbdl?url=" + match);
        await m.sendFromUrl(data.data.high, { caption: data.data.title });
        await m.react('✅');
    } catch (error) {
        await m.react('❌');
        return m.reply(error);
    }
});

Sparky({
    name: "spotify",
    fromMe: isPublic,
    category: "downloader",
    desc: "play a song"
  },
  async ({
    m, client, args
  }) => {
    try {
        args = args || m.quoted?.text;
        if(!args) return await m.reply(lang.NEED_Q);
  await m.react('🔎');
  const ser = await getJson(config.API + "/api/search/spotify?search=" + args)
  const play = ser.data[0];
        await m.react('⬇️');
        await m.reply(`_Downloading ${play.name} By ${play.artists}_`)
  const url = await spdl(play.link);
  await m.sendMsg(m.jid , url, { mimetype: "audio/mpeg" } , "audio")
   await m.react('✅');     
    } catch (error) {
        await m.react('❌');
        m.reply(error);
    }
  });

  Sparky({
    name: "spotifydl",
    fromMe: isPublic,
    category: "downloader",
    desc: "play a song"
  },
  async ({
    m, client, args
  }) => {
    try {
        args = args || m.quoted?.text;
        if(!args) return await m.reply(lang.NEED_URL);
        await m.react('⬇️');
  const url = await spdl(args);
  await m.sendMsg(m.jid , url, { mimetype: "audio/mpeg" } , "audio")
   await m.react('✅');     
    } catch (error) {
        await m.react('❌');
        m.reply(error);
    }
  });

Sparky({
    name: "xnxx",
    fromMe: isPublic,
    category: "downloader",
    desc: "Download media from XNXX by search or URL",
},
async ({
    m, client, args
}) => {
    try {
        let match = args || m.quoted?.text;
        if (!match) return await m.reply(lang.NEED_Q);
            await m.react('🔎');
            const { result } = await getJson(config.API + "/api/search/xnxx?search=" + match);
            await m.react('⬇️');
            var xnxx = result.result[0].link
            const xdl = await getJson(`${config.API}/api/downloader/xnxx?url=${xnxx}`)
            await m.sendFromUrl(xdl.data.files.high, { caption: xdl.data.title });
        await m.react('✅');
    } catch (error) {
        await m.react('❌');
        m.reply(error);
    }
});


Sparky({
    name: "terabox",
    fromMe: isPublic,
    category: "downloader",
    desc: "Download files from TeraBox by providing a valid URL",
},
async ({
    m, client, args
}) => {
    try {
        let match = args || m.quoted?.text;
        if (!match) return await m.reply(lang.NEED_URL);
        await m.react('⬇️');
        const { data } = await getJson(config.API + "/api/downloader/terrabox?url=" + match);
        await m.sendFromUrl(data.dlink, { caption: data.filename });
        await m.react('✅');
    } catch (error) {
        await m.react('❌');
        console.error(error);
    }
});


Sparky({
    name: "gitclone",
    fromMe: isPublic,
    category: "downloader",
    desc: "Download GitHub repositories as ZIP files",
},
async ({
    m, client, args
}) => {
    try {
        let match = args || m.quoted?.text;
        if (!isUrl(match)) return await m.reply(lang.NEED_URL)
        await m.react('⬇️');
        let user = match.split("/")[3];
        let repo = match.split("/")[4];
        const msg = await m.reply(lang.DOWNLOADING);
        await client.sendMessage(m.jid, {
            document: {
                url: `https://api.github.com/repos/${user}/${repo}/zipball`
            },
            fileName: repo,
            mimetype: "application/zip"
        }, {
            quoted: m
        });
        await m.react('✅');
    } catch (error) {
        await m.react('❌');
        console.error(error);
    }
});
