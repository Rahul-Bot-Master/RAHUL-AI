const {Sparky, isPublic} = require("../lib");
const {getString, getJson} = require('./pluginsCore');
const PDFDocument = require("pdfkit");
const lang = getString('converters');
let fs = require('fs');

let pdfStore = {};

Sparky({
    name: "pdf",
    fromMe: isPublic,
    category: "pdf converters",
    desc: "Convert stored images into PDF",
}, async ({ m, client }) => {

    try {
        if (!pdfStore[m.jid] || pdfStore[m.jid].length === 0) {
            return m.reply("⚠️ No images stored");
        }

        await m.react("⏳");

        const filePath = `./temp_${Date.now()}.pdf`;
        const doc = new PDFDocument();

        doc.pipe(fs.createWriteStream(filePath));

        pdfStore[m.jid].forEach((item, index) => {

            if (index !== 0) doc.addPage();

            if (item.type === "image") {
                doc.image(item.content, {
                    fit: [500, 700],
                    align: "center",
                    valign: "center"
                });
            }

            if (item.type === "text") {
                doc
                    .fontSize(16)
                    .text(item.content, {
                        align: "left"
                    });
            }
        });


        doc.end();

        setTimeout(async () => {
            await client.sendMessage(m.jid, {
                document: fs.readFileSync(filePath),
                mimetype: "application/pdf",
                fileName: "xbotmd.pdf"
            }, { quoted: m });

            fs.unlinkSync(filePath);
            pdfStore[m.jid] = [];

            await m.react("✅");
        }, 2000);

    } catch (err) {
        console.log(err);
        await m.react("❌");
        m.reply("Error creating PDF 😅");
    }
});

Sparky({
    name: "addimg",
    fromMe: isPublic,
    category: "pdf converters",
    desc: "Add image to PDF list",
}, async ({ m }) => {

    if (!m.quoted || !m.quoted.message.imageMessage) {
        return m.reply("_Reply to an image_");
    }

    await m.react("⏳");

    const buffer = await m.quoted.download();

    if (!pdfStore[m.jid]) pdfStore[m.jid] = [];

    pdfStore[m.jid].push({
        type: "image",
        content: buffer
    });

    await m.react("🍻");
    m.reply(`_🖼️ Image added\n${pdfStore[m.jid].length}_`);
});

Sparky({
    name: "addtext",
    fromMe: isPublic,
    category: "pdf converters",
    desc: "Add text to PDF",
}, async ({ m }) => {

    const text = m.quoted?.text || m.text.split(" ").slice(1).join(" ");

    if (!text) return m.reply("_Provide or reply to text_");

    if (!pdfStore[m.jid]) pdfStore[m.jid] = [];

    pdfStore[m.jid].push({
        type: "text",
        content: text
    });

    m.reply(`_📝 Text added\n${pdfStore[m.jid].length}_`);
});

Sparky({
    name: "clear",
    fromMe: isPublic,
    category: "pdf converters",
    desc: "Clear stored images",
}, async ({ m }) => {
    pdfStore[m.jid] = [];
    m.reply("_🗑️ Cleared stored images_");
});