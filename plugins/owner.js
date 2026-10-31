Sparky({
  name: "owner",
  alias: ["creator"],
  fromMe: isPublic,
  category: "main",
  desc: "Get bot owner contact info"
}, async ({ m, client }) => {
  let ownerNumber = "9193730236@s.whatsapp.net"; // ithe tuzha number taku shaktoos
  let ownerName = "Rahul Master";
  
  return m.reply(`👑 **Bot Owner Info**\n\n📌 **Name:** ${ownerName}\n📞 **Contact:** wa.me/919356730236${ownerNumber.split('@')[0]}\n⚡ *ᴩᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜʟ ᴍᴀꜱᴛᴇʀ*`);
});
