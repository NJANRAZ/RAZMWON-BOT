const Shadow = require("../Utilis/events");
const { forwardOrBroadCast } = require("../Utilis/groupmute");
const { getBuffer } = require('../Utilis/download');
const { parseJid } = require("../Utilis/vote");
// shadow
const vsend = 'https://i.imgur.com/Ee3vIUt.jpeg'
Shadow.addCommand(
  { pattern: 'vsend ?(.*)', fromMe: true, desc: "send replied msg as voice msg." },
  async (message, match) => {
    if (match == "") return await message.sendMessage("*Give me a jid*\nExample .mforward jid1 jid2 jid3 jid4 ...");
    if (!message.reply_message)
      return await message.sendMessage("*Reply to a Message*");
    const buff = await getBuffer(vsend)
    let options = {}
options.ptt = true
options.quoted = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
      },
      message: {
        "imageMessage": {
          "jpegThumbnail": buff.buffer,
          "caption": "⚠️☣️ᏒᎪᏃᎷᎳᎧᏁ🍁🥀"
        }
      }
    }
options.contextInfo = {
           forwardingScore: 1000,
           isForwarded: true 
        }
    match.match(parseJid).map((jid) => {
      forwardOrBroadCast(jid, message, options);
    });
  }
)
