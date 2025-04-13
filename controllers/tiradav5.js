const TeleBot = require('telebot');
const { ID } = require('../config.js')
const bot = new TeleBot(ID);

const tiradav5 = (msg, props) => {
    let datos = props.match[1];
    let numeros = datos.split(" ");
    let cantidad = numeros[0];
    let copiaCantidad = [...cantidad];
    let dadosEspeciales = isNaN(Number(numeros[1])) ? 0 : Number(numeros[1])
    let difi = 6
    let dadosResultados = [];
    let Cexitos = 0;
    let botchParametro = 0;
    let cantidadDeUnos = 0;
    
    if (cantidad >= 0 && cantidad <= 30) {

        let resultado = (entrada) => {
            return dadosResultados.push(entrada)
        }

        while (cantidad > 0) {
            var x = Math.floor(Math.random() * 10) + 1
            resultado({
                dado:x,
                type:"n"
            })
            
            cantidad = cantidad - 1
        }

        while (dadosEspeciales > 0) {
            var x = Math.floor(Math.random() * 10) + 1
            resultado({
                dado:x,
                type:"e"
            })
            
            dadosEspeciales = dadosEspeciales - 1
        }

        const cantidadExitos = (arrayDados)=>{
            const checkCritical = arrayDados.filter((itemNumero,index)=>{
                return itemNumero.dado == 10
            }).length
        }

        const mensajeEncabezado = "      🧚🏻🧙🏼MUNDO DE TINIEBLAS V5👻🧛‍♀️"
            
        //  ESTO YA ES EL TEXTO 
        var mensajeCompletado = (mensajeEncabezado + "\n RESULTADO:  \n" + 
            dadosResultados.filter(i=>i.type=="n").map(itemDado=>{
                return (itemDado.dado == 10)? "🔟" :((itemDado.dado > 5) ? "✅" : "🟩")
            })+"\n --------------------------------- \n"+ 
            dadosResultados.filter(i=>i.type=="e").map(itemDado=>{
                return (itemDado.dado == 10)? "🔟" :((itemDado.dado == 1)? "❌" : ((itemDado.dado > 5) ? "✅" : "🟧"))
            })).replaceAll(",", " ");
            // TERMINA EL TEXTO

        return bot.sendMessage(msg.chat.id, mensajeCompletado, { replyToMessage: msg.message_id });

    } else {
        return bot.sendMessage(msg.chat.id, "NO PERMITIDO 😡", { replyToMessage: msg.message_id });
    }
}
module.exports = { tiradav5 }