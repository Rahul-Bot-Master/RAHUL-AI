const { commands, Sparky, isPublic, plugins } = require('./plugins');
const { YtInfo, yts, yta, ytv, spdl } = require('./youtube.js');
const { serialize } = require('./serialize');
const { whatsappAutomation, callAutomation } = require('./whatsappController');
const { warnDB } = require('./database/warn');
const { externalPlugins, installExternalPlugins } = require('./database/external_plugins');
const { setData, getData } = require('./database');
const { uploadMedia, handleMediaUpload, addMessage, getMessages, askGroq } = require('./tools');

global['owner'] = ['919356730236'];

module.exports = {
    'commands': commands,
    'Sparky': Sparky,
    'YtInfo': YtInfo,
    'yts': yts,
    'yta': yta,
    'ytv': ytv,
    'spdl': spdl,
    'isPublic': isPublic,
    'serialize': serialize,
    'whatsappAutomation': whatsappAutomation,
    'callAutomation': callAutomation,
    'externalPlugins': externalPlugins,
    'installExternalPlugins': installExternalPlugins,
    'warnDB': warnDB,
    'uploadMedia': uploadMedia,
    'handleMediaUpload': handleMediaUpload,
    'addMessage': addMessage,
    'getMessages': getMessages,
    'askGroq': askGroq,
    'setData': setData,
    'getData': getData
};
