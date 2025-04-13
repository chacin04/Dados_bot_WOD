const TeleBot = require('telebot');
const { ID } = require('../config.js')
const bot = new TeleBot(ID);

const tiradav5 = (msg, props) => {
    let datos = props.match[1];
    let numeros = datos.split(" ");
    let cantidad = numeros[0];
    let dadosEspeciales = isNaN(Number(numeros[1])) ? 0 : Number(numeros[1])
    let dadosResultados = [];
    
    if (cantidad >= 0 && cantidad <= 30) {

        let resultado = (entrada) => {
            return dadosResultados.push(entrada)
        }

        const resultadoCompleto = Array.from({length:cantidad},(_,index)=>{
            var x = Math.floor(Math.random() * 10) + 1
            if( index+1 <= dadosEspeciales){
                return {
                    dado:x,
                    type:"e"
                }
            }else{
                return {
                    dado:x,
                    type:"n"
                }
            }
        })

        const mensajeEncabezado = "      🧚🏻🧙🏼MUNDO DE TINIEBLAS V5👻🧛‍♀️"
            
        //  ESTO YA ES EL TEXTO 
        var mensajeCompletado = (mensajeEncabezado + "\n RESULTADO:  \n" + 
            resultadoCompleto.filter(i=>i.type=="n").map(itemDado=>{
                return (itemDado.dado == 10)? "🔟" :((itemDado.dado > 5) ? "✅" : "🟩")
            })+"\n --------------------------------------- \n"+ 
            resultadoCompleto.filter(i=>i.type=="e").map(itemDado=>{
                return (itemDado.dado == 10)? "🔟" :((itemDado.dado == 1)? "❌" : ((itemDado.dado > 5) ? "✅" : "🟧"))
            })).replaceAll(",", " ");
            // TERMINA EL TEXTO

        return bot.sendMessage(msg.chat.id, mensajeCompletado, { replyToMessage: msg.message_id });

    } else {
        return bot.sendMessage(msg.chat.id, "NO PERMITIDO 😡", { replyToMessage: msg.message_id });
    }
}
module.exports = { tiradav5 }