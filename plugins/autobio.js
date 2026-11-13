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

        if (action === "on") {
            if (autoBioInterval) clearInterval(autoBioInterval);

            // Immediate update check
            try {
                let d = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
                let bioText = `🚀 RAHUL-AI Active | ⏰ ${d} | ⚡ Powered by Rahul Master`;
                if (client.updateStatus) {
                    await client.updateStatus(bioText);
                } else if (client.updateProfileStatus) {
                    await client.updateProfileStatus(bioText);
                }
            } catch (e) {
                console.log("Initial Bio Update Error:", e);
            }

            autoBioInterval = setInterval(async () => {
                try {
                    let d = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
                    let bioText = `🚀 RAHUL-AI Active | ⏰ ${d} | ⚡ Powered by Rahul Master`;
                    
                    if (client.updateStatus) {
                        await client.updateStatus(bioText);
                    } else if (client.updateProfileStatus) {
                        await client.updateProfileStatus(bioText);
                    }
                } catch (e) {
                    // Silent catch for profile rate limits
                }
            }, 60000); // 1 minute interval

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
