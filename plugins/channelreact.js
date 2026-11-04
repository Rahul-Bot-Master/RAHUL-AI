const {
    Sparky,
    isPublic
} = require("../lib");
const config = require("../config.js");
const font = require("@viper-x/fancytext");
const menust = config.MENU_FONT;
const style = font[menust] || ((v) => v);

Sparky({ 
    name: "channelreact", 
    category: "tools", 
    fromMe: isPublic, 
    desc: "Automatically react to a WhatsApp channel message using link and emoji" 
}, async ({ client, m, args }) => {
    try {
        // Safe argument parsing (handles both string and array inputs)
        let textArgs = args ? (typeof args === "string" ? args : args.join(" ")) : "";
        let inputArgs = textArgs.trim().split(/\s+/);

        if (inputArgs.length < 2) {
            return m.reply(style("_Please provide both the channel message link and the emoji!_\n_Example: .channelreact https://whatsapp.com/channel/12345/67890 🔥_"));
        }

        let channelLink = inputArgs[0];
        let emoji = inputArgs[1];

        // Validate WhatsApp Channel link format
        if (!channelLink.includes("whatsapp.com/channel/")) {
            return m.reply(style("_Invalid WhatsApp channel link! Please provide a valid channel post link._"));
        }

        // Extracting channel id and message server id from the link
        let match = channelLink.match(/channel\/([a-zA-Z0-9]+)\/?([0-9]+)?/);
        if (!match || !match[1]) {
            return m.reply(style("_Could not parse channel link. Make sure it's a direct message link._"));
        }

        let channelId = match[1];
        let newsletterId = channelId.includes("@newsletter") ? channelId : `${channelId}@newsletter`;
        let serverId = match[2];

        if (!serverId) {
            return m.reply(style("_Please provide the direct link including the message ID at the end!_"));
        }

        // Sending reaction using Baileys client
        await client.sendMessage(newsletterId, {
            react: {
                text: emoji,
                key: {
                    remoteJid: newsletterId,
                    id: serverId,
                    fromMe: false
                }
            }
        });

        return m.reply(style(`✅ *Successfully reacted with ${emoji} to the channel message!*`));

    } catch (e) {
        console.log("ChannelReact Error:", e);
        return m.reply(style(`_Failed to send reaction: ${e.message || "Unknown error"}_`));
    }
});
