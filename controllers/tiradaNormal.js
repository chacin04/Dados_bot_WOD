const TeleBot = require('telebot');
const { ID } = require('../config.js')
const bot = new TeleBot(ID);

const tiradaNormal = (msg, props, profesion) => {
    let datos = props.match[1];
    let numeros = datos.split(" ");
    let cantidad = numeros[0];
    let copiaCantidad = [...cantidad];
    let difi = isNaN(parseInt(numeros[1])) ? 6 : parseInt(numeros[1]);
    let dadosResultados = [];
    let Cexitos = 0;
    let botchParametro = 0;
    let cantidadDeUnos = 0;
    let confb;
    if (difi > 1 && difi <= 9 && cantidad >= 1 && cantidad <= 30) {

        let resultado = (entrada) => {
            return dadosResultados.push(entrada)
        }

        while (cantidad > 0) {
            var x = Math.floor(Math.random() * 10) + 1
            resultado(x);
            if (x == 1) {
                Cexitos = Cexitos - 1
                cantidadDeUnos = cantidadDeUnos + 1
            } else if (profesion && x == 10) {
                Cexitos = Cexitos + 2
            } else if (x >= difi) {
                Cexitos = Cexitos + 1
            }

            if (x < difi) {
                botchParametro = botchParametro + 1
            }
            cantidad = cantidad - 1
        }


        if (Cexitos <= 0) {
            Cexitos = "0 ❌❌❌"
            if (botchParametro == copiaCantidad[0] && cantidadDeUnos > 0) {
                confb = "☠❌❌BOTCH BOTCH❌❌☠"
            }
        }
        if (Cexitos > 0 && Cexitos <= 4) {

            Cexitos = Cexitos + "  ✅"
        } else if (Cexitos > 4) {
            Cexitos = Cexitos + "  🔥😎"
        }

        const mensajeEncabezado = (mfb)=>{
            const procesoMensaje = mfb ?? "      🧚🏻🧙🏼MUNDO DE TINIEBLAS 👻🧛‍♀️"
            if ( profesion){
                return `${procesoMensaje}\n⚡⚡PROFESION⚡⚡`
            }else{
                return procesoMensaje
            }
        }

        //  ESTO YA ES EL TEXTO 
        var mensajeCompletado = (mensajeEncabezado(confb) + "\n RESULTADO:  " + dadosResultados + "  🎲" + "\n EXITOS =  " + Cexitos + "  //DIF=" + difi).replaceAll(",", " ");
        // TERMINA EL TEXTO

        return bot.sendMessage(msg.chat.id, mensajeCompletado, { replyToMessage: msg.message_id });

    } else {
        return bot.sendMessage(msg.chat.id, "NO PERMITIDO 😡", { replyToMessage: msg.message_id });
    }
}
module.exports = { tiradaNormal }