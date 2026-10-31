const { Sparky, isPublic, uploadMedia, handleMediaUpload } = require("../lib");
const { getString, appendMp3Data, convertToMp3, addExifToWebP, getBuffer, getJson } = require('./pluginsCore');
const googleTTS = require('google-tts-api');
const config = require('../config.js');
const lang = getString('converters');
const axios = require('axios');
const FormData = require('form-data');

Sparky({
  name: "url",
  aliases: ["tourl", "upload", "geturl", "uguu"],
  fromMe: true,
  desc: "Upload files and get URL",
  category: "converters",
}, async ({ args, m }) => {
  try {
    const target = m.quoted ? m.quoted : m;
    let buffer = null;

    try {
      buffer = await target.download();
    } catch (e) {
      console.log("Download target error:", e);
    }

    if (!buffer) {
      return m.reply(`┏━━━━━━━━━━━━━━━━━━━━┓
┃ ᴇʀʀᴏʀ
┃
┃ ᴘʟᴇᴀꜱᴇ ʀᴇᴘʟʏ ᴛᴏ ᴏʀ ꜱᴇɴᴅ
┃ ᴀɴ ɪᴍᴀɢᴇ, ᴠɪᴅᴇᴏ, ᴏʀ ᴀᴜᴅɪᴏ
┃
┃ ᴇxᴀᴍᴘʟᴇ: .ᴛᴏᴜʀʟ
┗━━━━━━━━━━━━━━━━━━━━┛`);
    }

    let mime = target.mimetype || target.msg?.mimetype || target.mediaMessage?.mimetype || '';
    if (!mime && target.msg) {
      mime = target.msg.mimetype || '';
    }

    await m.reply(`┏━━━━━━━━━━━━━━━━━━━━┓
┃ ᴜᴘʟᴏᴀᴅɪɴɢ...
┃
┃ ᴘʟᴇᴀꜱᴇ ᴡᴀɪᴛ ᴀ ᴍᴏᴍᴇɴᴛ
┗━━━━━━━━━━━━━━━━━━━━┛`);

    const formData = new FormData();

    let ext = 'bin';
    if (mime.includes('video') || mime.includes('mp4')) {
      ext = 'mp4';
    } else if (mime.includes('png')) {
      ext = 'png';
    } else if (mime.includes('jpeg') || mime.includes('jpg')) {
      ext = 'jpg';
    } else if (mime.includes('audio') || mime.includes('ogg') || mime.includes('mp3') || mime.includes('m4a')) {
      ext = 'mp3';
      if (!mime.includes('audio')) mime = 'audio/mp3';
    } else if (mime.includes('webp')) {
      ext = 'webp';
    } else if (mime.includes('document')) {
      ext = 'bin';
    }

    formData.append('files[]', buffer, {
      filename: `media_${Date.now()}.${ext}`,
      contentType: mime || 'application/octet-stream'
    });

    const response = await axios.post(
      'https://uguu.se/upload.php',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );

    const resData = response.data;
    let uploadUrl = '';

    if (resData && resData.success && resData.files && resData.files[0]) {
      uploadUrl = resData.files[0].url;
    }

    if (!uploadUrl) {
      throw new Error('Upload failed: Invalid response from server');
    }

    let fileTypeDisplay = mime.split('/')[0].toUpperCase();
    if (fileTypeDisplay === 'APPLICATION') fileTypeDisplay = 'DOCUMENT';

    const fileSizeKB = (buffer.length / 1024).toFixed(2);
    const fileSizeMB = (buffer.length / (1024 * 1024)).toFixed(2);

    const result = `┏━━━━━━━━━━━━━━━━━━━━┓
┃ ᴜᴘʟᴏᴀᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜ𝚕
┃
┃ ᴛʏᴘᴇ: ${fileTypeDisplay}
┃ ꜱɪᴢᴇ: ${fileSizeKB} ᴋʙ (${fileSizeMB} ᴍʙ)
┃ ᴜʀʟ: ${uploadUrl}
┃
┃ ᴜᴘʟᴏᴀᴅᴇᴅ
┗━━━━━━━━━━━━━━━━━━━━┛`;

    await m.reply(result);

  } catch (err) {
    console.error('Tourl Error:', err.response?.data || err.message);

    await m.reply(`┏━━━━━━━━━━━━━━━━━━━━┓
┃ ᴜᴘʟᴏᴀᴅ ꜰᴀɪʟᴇᴅ
┃
┃ ᴇʀʀᴏʀ: ${typeof err.response?.data === 'string' ? err.response.data : (err.response?.data?.message || err.response?.data?.error || err.message)}
┃
┃ ᴘʟᴇᴀꜱᴇ ᴛʀʏ ᴀɢᴀɪɴ
┗━━━━━━━━━━━━━━━━━━━━┛`);
  }
});

Sparky(
    {
        name: "vv",
        fromMe: true,
        category: "converters",
        desc: "Resends the view Once message"
    },
    async ({
        m, client 
    }) => {
        if (!m.quoted) {
            return m.reply("_Reply to ViewOnce Message !_");
        }
        try {
            m.react("⏫");
		let buff = await m.quoted.download();
		return await m.sendFile(buff);
        } catch (e) {
            return m.react("❌");
        } 
    });

Sparky({
		name: "sticker",
		fromMe: isPublic,
		category: "converters",
		desc: lang.STICKER_DESC
	},
	async ({
		m,
		args
	}) => {
		if (!m.quoted || !(m.quoted.message.imageMessage || m.quoted.message.videoMessage)) {
			return await m.reply(lang.STICKER_ALERT);
		}
		await m.react('⏫');
		await m.sendMsg(m.jid, await m.quoted.download(), {
			packName: args.split(';')[0] || config.STICKER_DATA.split(';')[0],
			authorName: args.split(';')[1] || config.STICKER_DATA.split(';')[1],
			quoted: m
		}, "sticker");
		return await m.react('✅');
	});


Sparky({
		name: "mp3",
		fromMe: isPublic,
		category: "converters",
		desc: lang.MP3_DESC
	},
	async ({
		m,
		args
	}) => {
		if (!m.quoted || !(m.quoted.message.audioMessage || m.quoted.message.videoMessage || (m.quoted.message.documentMessage && m.quoted.message.documentMessage.mimetype === 'video/mp4'))) {
			return await m.reply(lang.MP3_ALERT);
		}
		await m.react('⏫');
		await m.sendMsg(m.jid, await convertToMp3(await m.quoted.download()), { mimetype: "audio/mpeg", quoted: m }, 'audio');
		return await m.react('✅');
	});


Sparky({
		name: "take",
		fromMe: isPublic,
		category: "converters",
		desc: lang.TAKE_DESC
	},
	async ({
		m,
		args,
		client
	}) => {
		if (!m.quoted || !(m.quoted.message.stickerMessage || m.quoted.message.audioMessage || m.quoted.message.imageMessage || m.quoted.message.videoMessage)) return m.reply('reply to a sticker/audio');
		await m.react('⏫');
        if (m.quoted.message.stickerMessage || m.quoted.message.imageMessage || m.quoted.message.videoMessage) {
            args = args || config.STICKER_DATA;
            return await m.sendMsg(m.jid, await m.quoted.download(), {
			packName: `${args.split(';')[0]}` || `${config.STICKER_DATA.split(';')[0]}`,
			authorName: `${args.split(';')[1]}` || `${config.STICKER_DATA.split(';')[1]}`,
			quoted: m
		}, "sticker");
        } else if (m.quoted.message.audioMessage) {
            const opt = {
                title: args ? args.split(/[|,;]/) ? args.split(/[|,;]/)[0] : args : config.AUDIO_DATA.split(/[|,;]/)[0] ? config.AUDIO_DATA.split(/[|,;]/)[0] : config.AUDIO_DATA,
                body: args ? args.split(/[|,;]/)[1] : config.AUDIO_DATA.split(/[|,;]/)[1],
                image: (args && args.split(/[|,;]/)[2]) ? args.split(/[|,;]/)[2] : config.AUDIO_DATA.split(/[|,;]/)[2]
            }
            const Data = await AudioData(await convertToMp3(await m.quoted.download()), opt);
            return await m.sendMsg(m.jid ,Data,{
                mimetype: 'audio/mpeg'
            },'audio');
        }
		await m.react('✅');
	});


Sparky({
		name: "photo",
		fromMe: isPublic,
		category: "converters",
		desc: lang.PHOTO_DESC
	},
	async ({
		m
	}) => {
		if (!m.quoted || !m.quoted.message.stickerMessage || m.quoted.message.stickerMessage.isAnimated) {
			return await m.reply(lang.PHOTO_ALERT);
		}
		await m.react('⏫');
		await m.sendMsg(m.jid, await m.quoted.download(), {
			quoted: m
		}, "image");
		return await m.react('✅');
	});

	Sparky(
		{
			name: "tts",
			fromMe: isPublic,
			category: "converters",
			desc: "text to speech"
		},
		async ({
			m, client, args
		}) => {
			if (!args) {
				m.reply('_Enter Query!_')
			} else {
				let [txt,
					lang] = args.split`:`
				const audio = googleTTS.getAudioUrl(`${txt}`, {
					lang: lang || "ml",
					slow: false,
					host: "https://translate.google.com",
				})
				client.sendMessage(m.jid, {
					audio: {
						url: audio,
					},
					mimetype: 'audio/mpeg',
					ptt: false,
					fileName: `${'tts'}.mp3`,
				}, {
					quoted: m,
				})
	
			}
		});


Sparky(
		{
			name: "say",
			fromMe: isPublic,
			category: "converters",
			desc: "text to speech"
		},
		async ({
			m, client, args
		}) => {
			if (!args) {
				m.reply('_Enter Query!_')
			} else {
				let [txt,
					lang] = args.split`:`
				const audio = googleTTS.getAudioUrl(`${txt}`, {
					lang: lang || "en",
					slow: false,
					host: "https://translate.google.com",
				})
				client.sendMessage(m.jid, {
					audio: {
						url: audio,
					},
					mimetype: 'audio/mpeg',
					ptt: true,
					fileName: `${'tts'}.mp3`,
				}, {
					quoted: m,
				})
	
			}
		});

Sparky(
  {
    name: "doc",
    fromMe: isPublic,
    category: "converters",
    desc: "Convert replied media to document",
  },
  async ({ m, client, args }) => {
    try {
      if (
        !m.quoted ||
        !(
          m.quoted.message.imageMessage ||
          m.quoted.message.videoMessage ||
          m.quoted.message.audioMessage ||
          m.quoted.message.documentMessage ||
          m.quoted.message.stickerMessage
        )
      ) {
        return await m.reply("_Replay to a meadia_");
      }
      await m.react("⏳");
      const buffer = await m.quoted.download();
      const mimetype =
        m.quoted.message.imageMessage?.mimetype ||
        m.quoted.message.videoMessage?.mimetype ||
        m.quoted.message.audioMessage?.mimetype ||
        m.quoted.message.documentMessage?.mimetype ||
        "application/octet-stream";

      let filename = args || "file";

      if (!filename.includes(".")) {
        const ext = mimetype.split("/")[1] || "bin";
        filename += `.${ext}`;
      }

      await client.sendMessage(
        m.jid,
        {
          document: buffer,
          mimetype,
          fileName: filename,
        },
        { quoted: m }
      );

      await m.react("✅");

    } catch (err) {
      console.log(err);
      await m.react("❌");
      m.reply("Error converting media 😅");
    }
  }
);

Sparky(
  {
    name: "nondoc",
    fromMe: isPublic,
    category: "converters",
    desc: "Return document back to original media",
  },
  async ({ m, client }) => {
    try {
      const quoted = m.quoted;
      if (!quoted || !quoted.message?.documentMessage)
        return m.reply("_Reply to a document message_");
      const mime = quoted.message.documentMessage.mimetype;
	  await m.react("⏳");
      const buffer = await quoted.download();
      let type = "document";
      if (mime.startsWith("image")) type = "image";
      else if (mime.startsWith("video")) type = "video";
      else if (mime.startsWith("audio")) type = "audio";
      await m.sendMsg(
        m.jid,
        buffer,
        { mimetype: mime, quoted: m },
        type
      );
	  await m.react("✅");

    } catch (err) {
      console.log(err);
	  await m.react("❌");
      m.reply("Error restoring media 😅");
    }
  }
);
