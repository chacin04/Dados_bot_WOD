const dayjs = require('dayjs')
const TeleBot = require('telebot');
const { ID } = require('../config.js')
const bot = new TeleBot(ID);

const horaActualVenezuela= ( msg ,props)=>{
    const fechaVenezuela = dayjs().subtract(4,'hours') //hacemos esto por que el servidor esta en GTM 
    const date = fechaVenezuela.format('YYYY-MM-DD')
    const hora = fechaVenezuela.format('HH:mm')

    return bot.sendMessage(msg.chat.id, `🔥🔥MUERTE A LOS NOSFERATU🔥🔥\n\n📅  ${date}\n⌚  ${hora}`, { replyToMessage: msg.message_id });
}
module.exports={horaActualVenezuela}