const { Console } = require('console');
const { getDiffieHellman } = require('crypto');
const TeleBot = require('telebot');
const {ID} = require('./config.js')
const bot = new TeleBot(ID);


// INICIATIVA
bot.on([/^\/i (.+)$/,/^\/I (.+)$/],(msg,props)=>{
    let dato = props.match[1];
    let numeros = dato.split(" ");
    let numero = numeros[0];
    let mod = parseInt(numero);
    var x = Math.floor(Math.random() * 10) + 1
    if ( mod >= 0 && mod < 30){
        let total = x+mod
        var men = ("      🧚🏻🧙🏼MUNDO DE TINIEBLAS 👻🧛‍♀️"+"\n--INICIATIVA--"+"\nPersonaje = "+mod+"\nDado🎲 = "+x+"\nTOTAL = "+total +"⚡")
        return bot.sendMessage(msg.chat.id , men , { replyToMessage: msg.message_id });
    }else{
        return bot.sendMessage(msg.chat.id , "NO PERMITIDO 😡" , { replyToMessage: msg.message_id });
    }

});

//  TIRADA DE DADOS
bot.on([/^\/wod (.+)$/,/^\/Wod (.+)$/,/^\/wOd (.+)$/,/^\/woD (.+)$/,/^\/WOD (.+)$/,/^\/WOd (.+)$/,/^\/wOD (.+)$/,/^\/WoD (.+)$/], (msg, props) => {
    let datos = props.match[1];
    let numeros = datos.split(" ");
    let cantidad = numeros[0];
    let ccantidad = [...cantidad];
    let difi=numeros[1] ?? 6;
    let arra =[];
    let Cexitos = 0;
    let b = 0 ;
    let c = 0;
    let confb;
    if ( difi>1 && difi <=9 && cantidad >=1 && cantidad<=30){

        let resultado = (entrada) => {
        return arra.push(entrada)
        }
        if (difi === undefined) {
            difi = 6 
            while (cantidad > 0) {
                var x = Math.floor(Math.random() * 10) + 1
                resultado(x);
                    if(x == 1){
                        Cexitos=Cexitos-1
                        c = c + 1

                    }
                    if(x >= difi){
                        Cexitos=Cexitos+1
                        c = c + 1
                    }
                    if (x<difi){
                        b=b+1
                    }
                cantidad = cantidad - 1
            }
        }else{
            while (cantidad > 0) {
                var x = Math.floor(Math.random() * 10) + 1
                resultado(x);
                    if(x == 1){
                        Cexitos=Cexitos-1
                        c = c + 1
                    }
                    if(x >= difi){
                        Cexitos=Cexitos+1
                    }
                    if (x<difi){
                        b=b+1
                    }
                cantidad = cantidad - 1
            }

        }
        if(Cexitos <= 0){
            Cexitos= "0 ❌❌❌"
            if(b==ccantidad[0] && c > 0){
                confb="☠❌❌BOTCH BOTCH❌❌☠"
            }
        }
        if(Cexitos>0 && Cexitos<=4){

            Cexitos=Cexitos+"  ✅"
        }else if (Cexitos>4) {
            Cexitos=Cexitos+"  🔥😎"
        }
        let mfb= confb ?? "      🧚🏻🧙🏼MUNDO DE TINIEBLAS 👻🧛‍♀️";
        //  ESTO YA ES EL TEXTO 
        var i = (mfb+"\n RESULTADO:  "+ arra + "  🎲"+"\n EXITOS =  "+Cexitos+ "  //DIF="+difi).replaceAll(","," ");
        // TERMINA EL TEXTO
        
        return bot.sendMessage(msg.chat.id , i , { replyToMessage: msg.message_id });
        
    }
    else{
        return bot.sendMessage(msg.chat.id , "NO PERMITIDO 😡" , { replyToMessage: msg.message_id });
    }
});

bot.start();