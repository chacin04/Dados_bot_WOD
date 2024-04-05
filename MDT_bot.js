const TeleBot = require('telebot');
const { ID } = require('./config.js')
const bot = new TeleBot(ID);
const {tiradaNormal} = require('./controllers/tiradaNormal.js')
const{horaActualVenezuela} =require('./controllers/horaKeiber.js')


// INICIATIVA
bot.on([/^\/i (.+)$/, /^\/I (.+)$/], (msg, props) => {
    let dato = props.match[1];
    let numeros = dato.split(" ");
    let numero = numeros[0];
    let mod = parseInt(numero);
    var x = Math.floor(Math.random() * 10) + 1
    if (mod >= 0 && mod < 30) {
        let total = x + mod
        var men = ("      🧚🏻🧙🏼MUNDO DE TINIEBLAS 👻🧛‍♀️" + "\n--INICIATIVA--" + "\nPersonaje = " + mod + "\nDado🎲 = " + x + "\nTOTAL = " + total + "⚡")
        return bot.sendMessage(msg.chat.id, men, { replyToMessage: msg.message_id });
    } else {
        return bot.sendMessage(msg.chat.id, "NO PERMITIDO 😡", { replyToMessage: msg.message_id });
    }

});

//  TIRADA DE DADOS
bot.on([/^\/wod (.+)$/, /^\/Wod (.+)$/, /^\/wOd (.+)$/, /^\/woD (.+)$/, /^\/WOD (.+)$/, /^\/WOd (.+)$/, /^\/wOD (.+)$/, /^\/WoD (.+)$/], (msg, props) => {
    tiradaNormal(msg,props,false)
});

bot.on([/^\/pro (.+)$/,/^\/PRO (.+)$/,/^\/Pro (.+)$/,/^\/pRo (.+)$/,/^\/prO (.+)$/,/^\/PRo (.+)$/,/^\/pRO (.+)$/,/^\/PrO (.+)$/], (msg,props)=>{
    tiradaNormal(msg,props,true)
})

bot.on(['/h','/H'],(msg,props)=>{
    horaActualVenezuela(msg,props)
})

bot.start();