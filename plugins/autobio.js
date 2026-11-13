const { Sparky, isPublic } = require("../lib");

let autoBioInterval = null;

Sparky({ 
    name: "autobio", 
    category: "misc", 
    fromMe: isPublic, 
    desc: "Toggle automated live bio updates on the bot profile" 
}, async ({ m, client, args }) => {
    try {
        const action = (args || "").toLowerCase().trim();

        // Helper function for Baileys Status / Bio Update
        async function setProfileBio(text) {
            try {
                if (client.updateStatus) {
                    await client.updateStatus(text);
                } else if (client.updateProfileStatus) {
                    await client.updateProfileStatus(text);
                } else if (client.query) {
                    await client.query({
                        tag: 'iq',
                        attr: {
                            to: 's.whatsapp.net',
                            type: 'set',
                            xmlns: 'status'
                        },
                        content: [
                            {
                                tag: 'status',
                                attr: {},
                                content: Buffer.from(text, 'utf-8')
                            }
                        ]
                    });
                }
            } catch (err) {
                console.log("Bio query inner error:", err);
            }
        }

        if (action === "on") {
            if (autoBioInterval) clearInterval(autoBioInterval);

            // Immediate update execution
            let d = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
            let bioText = `🚀 RAHUL-AI Active | ⏰ ${d} | ⚡ Powered by Rahul Master`;
            await setProfileBio(bioText);

            autoBioInterval = setInterval(async () => {
                try {
                    let dt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
                    let currentBio = `🚀 RAHUL-AI Active | ⏰ ${dt} | ⚡ Powered by Rahul Master`;
                    await setProfileBio(currentBio);
                } catch (e) {
                    // Silent catch for rate limits
                }
            }, 60000); // Every 1 minute

            return await m.reply("✅ Auto-Bio successfully ON zali ahe! (Pratyek 1 minitane bio update hoil)");
        } 
        else if (action === "off") {
            if (autoBioInterval) {
                clearInterval(autoBioInterval);
                autoBioInterval = null;
            }
            return await m.reply("✅ Auto-Bio successfully OFF zali ahe!");
        } 
        else {
            return await m.reply(`*Auto-Bio Status:* ${autoBioInterval ? "ON 🟢" : "OFF 🔴"}\n*Vapra:* _.autobio on_ kinva _.autobio off_`);
        }
    } catch (err) {
        console.log("Autobio Command Error:", err);
        return await m.reply("❌ Auto-Bio toggle hotana error ala!");
    }
});
