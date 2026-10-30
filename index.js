const config = require('./config');
const { Console } = require('console');

(async function Sparky() {
    const {
        makeWASocket,
        useMultiFileAuthState,
        DisconnectReason,
        Browsers,
        makeInMemoryStore,
        makeCacheableSignalKeyStore,
        fetchLatestBaileysVersion
    } = require('baileys');

    const { default: axios } = require('axios');
    const cron = require('node-cron');
    const { Boom } = require('@hapi/boom');
    const http = require('http');
    const express = require('express');
    const fs = require('fs');
    const path = require('path');
    
    const {
        serialize,
        commands,
        whatsappAutomation,
        callAutomation,
        externalPlugins
    } = require('./lib');

    const botConfig = require('./config');
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const app = express();
    
    const PORT = process.env.PORT || 8080;
    const NodeCache = require('node-cache');
    const msgCache = new NodeCache({
        stdTTL: 3600,
        checkperiod: 600,
        useClones: false,
        deleteOnExpire: true,
        maxKeys: 500
    });
    
    const logger = require('pino')({ level: 'silent' });

    // Platform detection
    let platform = process.env.RENDER ? 'RENDER' :
                   process.env.PITCHER_API_BASE_URL?.includes('codesandbox') ? 'CODESANDBOX' :
                   process.env.VERCEL ? 'VERCEL' :
                   process.env.KOYEB || process.env.KOYEB_APP_ID ? 'KOYEB' :
                   process.env.TERMUX_VERSION ? 'TERMUX' :
                   process.env.DYNO ? 'HEROKU' :
                   process.env.RAILWAY_SERVICE_NAME ? 'RAILWAY' :
                   process.env.AZURE_HTTP_FUNCTIONS ? 'AZURE' :
                   process.env.DIGITALOCEAN || process.env.DIGITALOCEAN_APP_NAME ? 'DIGITALOCEAN' :
                   process.env.FLY_IO ? 'FLY_IO' :
                   process.env.CF_PAGES ? 'CLOUDFLARE' :
                   process.env.AWS_REGION ? 'AWS' : 'VPS';

    if (platform === 'RENDER' || platform === 'VERCEL') {
        let deployedUrl = '';
        app.get('/', (req, res) => {
            if (!deployedUrl) {
                deployedUrl = req.protocol + '://' + req.get('host');
                console.log('Detected Deployed URL: ', deployedUrl);
            }
            res.json({ status: 'Active', deployedUrl: deployedUrl });
        });
        
        console.log('web Starting...');
        
        async function selfPing() {
            if (!deployedUrl) {
                console.log('Deployed URL is not yet set.');
                return;
            }
            try {
                const response = await axios.get(deployedUrl);
                console.log('Successfully visited ' + deployedUrl + ' - Status code: ' + response.status);
            } catch (err) {
                console.error('Error visiting ' + deployedUrl + ':', err);
            }
        }
        
        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log('Running on platform: ' + PORT);
            cron.schedule('*/10 * * * * *', selfPing);
        });
    }

    console.log('RAHUL AI BOT ' + platform);

    // Session directory setup
    if (!fs.existsSync('./lib/session')) {
        fs.mkdirSync('./lib/session', { recursive: true });
    }

    try {
        try {
            if (!botConfig.SESSION_ID) throw new Error('Session ID missing');
            
            const gistData = await axios.get('https://gist.github.com/ESWIN-SPERKY/' + botConfig.SESSION_ID.split(':')[1] + '/raw');
            Object.keys(gistData.data).forEach(fileName => {
                fs.writeFileSync('./lib/session/' + fileName, gistData.data[fileName], 'utf8');
            });
            
            console.log('session created successfully');
            console.log('Session connected and session files saved.');
        } catch (err) {
            console.error('Error: ', err.message);
        }

        const { state, saveCreds } = await useMultiFileAuthState('./lib/session');
        const { version } = await fetchLatestBaileysVersion();
        
        const sock = makeWASocket({
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, logger)
            },
            downloadHistory: false,
            syncFullHistory: false,
            shouldSyncHistoryMessage: () => false,
            printQRInTerminal: false,
            version: version,
            logger: logger,
            getMessage: false,
            cachedGroupMetadata: async (jid) => msgCache.get(jid)
        });

        const ownerJid = (botConfig.SUDO !== '' ? botConfig.SUDO.split(',')[0] : sock.user.id.split(':')[0]) + '@s.whatsapp.net';

        // Update checker interval
        const updateInterval = setInterval(async () => {
            // Placeholder logic for updates
        }, 60000);

        try {
            await botConfig.DATABASE.sync;
            console.log('Database synced.');
        } catch (dbErr) {
            console.error('Error while syncing database:', dbErr);
        }

        // External plugins loader
        async function loadExternalPlugins() {
            try {
                let pluginsList = await externalPlugins.findAll();
                pluginsList.map(async (plugin) => {
                    if (!fs.existsSync('./plugins/' + plugin.dataValues.name + '.js')) {
                        var res = await axios.get(plugin.dataValues.url);
                        if (res.statusCode == 200) {
                            console.log('Installing external plugins...');
                            fs.writeFileSync('./plugins/' + plugin.dataValues.name + '.js', res.data);
                            require('./plugins/' + plugin.dataValues.name + '.js');
                            console.log('External plugins loaded successfully.');
                        }
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }

        // Connection events
        sock.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
            if (connection === 'connecting') {
                console.log('Connecting...');
            } else if (connection === 'open') {
                await loadExternalPlugins();
                console.log('Connected.');
                
                fs.readdirSync('./plugins')
                  .filter(file => path.extname(file) === '.js')
                  .forEach(file => require('./plugins/' + file));

                const startupMessage = 
                    "╔══════════════════════════╗\n" +
                    "║   🚀 *RAHUL-AI SYSTEM* 🚀   ║\n" +
                    "╚══════════════════════════╝\n\n" +
                    "◈ *Owner* : ⟡ RAHUL MASTER\n" +
                    "◈ *Mode* : ⟡ " + botConfig.WORK_TYPE + "\n" +
                    "◈ *Prefix* : ⟡ " + botConfig.PREFIX + "\n" +
                    "◈ *Version* : ⟡ " + botConfig.VERSION + "\n" +
                    "◈ *Language* : ⟡ " + botConfig.LANGUAGE + "\n\n" +
                    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                    "⚙️ *CONFIGURATIONS* :\n" +
                    "🔸 Always Online ➔ " + (botConfig.ALWAYS_ONLINE ? 'ACTIVE' : 'INACTIVE') + "\n" +
                    "🔸 Auto Status View ➔ " + (botConfig.AUTO_STATUS_VIEW ? 'ACTIVE' : 'INACTIVE') + "\n" +
                    "🔸 Reject Calls ➔ " + (botConfig.REJECT_CALLS ? 'ACTIVE' : 'INACTIVE') + "\n" +
                    "🔸 Auto Read Msg ➔ " + (botConfig.READ_MESSAGES ? 'ACTIVE' : 'INACTIVE') + "\n" +
                    "🔸 Call Blocker ➔ " + (botConfig.CALL_BLOCK ? 'ACTIVE' : 'INACTIVE') + "\n" +
                    "🔸 Status Save ➔ " + (botConfig.SAVE_STATUS ? 'ACTIVE' : 'INACTIVE') + "\n" +
                    "🔸 Status Reply ➔ " + (botConfig.STATUS_REPLY ? 'ACTIVE' : 'INACTIVE') + "\n" +
                    "🔸 Status Reaction ➔ " + (botConfig.STATUS_REACTION ? 'ACTIVE' : 'INACTIVE') + "\n" +
                    "🔸 PM Blocker ➔ " + (botConfig.PM_BLOCK ? 'ACTIVE' : 'INACTIVE') + "\n" +
                    "🔸 PM Disabler ➔ " + (botConfig.DISABLE_PM ? 'ACTIVE' : 'INACTIVE') + "\n" +
                    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                    "💎 *POWERED BY RAHUL MASTER* 💎";

                const targetJid = (botConfig.SUDO !== '' ? botConfig.SUDO.split(',')[0] : sock.user.id.split(':')[0]) + '@s.whatsapp.net';

                if (botConfig.START_MSG) {
                    return await sock.sendMessage(targetJid, { text: startupMessage });
                }
            } else if (connection === 'close') {
                const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
                if (reason === DisconnectReason.connectionReplaced) {
                    console.log('Connection replaced. Logout current session first.');
                    await sock.logout();
                } else {
                    console.log('Reconnecting...');
                    await sleep(3000);
                    Sparky();
                }
            }
        });

        // Message upsert handler
        sock.ev.on('messages.upsert', async (msgEvent) => {
            let mek;
            try {
                mek = await serialize(JSON.parse(JSON.stringify(msgEvent.messages[0])), sock);
            } catch (err) {
                console.error('Error serializing message:', err);
                return;
            }

            await whatsappAutomation(sock, mek, msgEvent);

            if (botConfig.DISABLE_PM && !mek.isGroup) return;

            commands.forEach(async (cmd) => {
                if (cmd.fromMe && !mek.fromMe) return;

                let commandName = mek.body ? mek.body[0].toLowerCase() + mek.body.slice(1).trim() : '';
                let args;

                try {
                    if (typeof cmd.on === 'function') {
                        cmd.on({ m: mek, args: mek.body, client: sock });
                    } else if (cmd.name && cmd.name.test(commandName)) {
                        args = mek.body.replace(cmd.name, '$1').trim();
                        cmd.function({ m: mek, args: args, client: sock });
                    }
                } catch (cmdErr) {
                    console.log(cmdErr);
                }
            });
        });

        sock.ev.on('creds.update', saveCreds);

        // Call automation handler
        sock.ev.on('call', async (calls) => {
            for (let call of calls) {
                await callAutomation(sock, call);
            }
        });

    } catch (mainErr) {
        console.error('Error: ', mainErr.message);
        await sleep(3000);
        Sparky();
    }
})();
