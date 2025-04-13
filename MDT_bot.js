const TeleBot = require("telebot");
const { ID } = require("./config.js");
const bot = new TeleBot(ID);
const { tiradaNormal } = require("./controllers/tiradaNormal.js");
const { tiradav5 } = require("./controllers/tiradav5.js")
const { horaActualVenezuela } = require("./controllers/horaKeiber.js");
const {
    insertarDatos,
    mostrarRegistros,
    eliminarIniciativas,
} = require("./lib/sqlite.js");

// INICIATIVA
bot.on([/^\/i (.+)$/, /^\/I (.+)$/], async (msg, props) => {
    let dato = props.match[1];
    let numeros = dato.split(" ");
    let numero = numeros[0];
    let personaje = numeros[1];
    let personajeLength = numeros[1] ? (numeros[1]).length : 0;
    let mod = parseInt(numero);
    var x = Math.floor(Math.random() * 10) + 1;
    if (mod >= 0 && mod < 30 && personaje && personajeLength > 0 && personajeLength < 40) {
        let total = x + mod;

        const respuestaInsert = await insertarDatos(
            personaje.toLowerCase(),
            total,
            mod
        );
        if (respuestaInsert) {
            var men =
                "      🧚🏻🧙🏼MUNDO DE TINIEBLAS 👻🧛‍♀️" +
                "\n--INICIATIVA--" +
                "\nPersonaje = " +
                mod +
                " " +
                personaje.toLowerCase() +
                "\nDado🎲 = " +
                x +
                "\nTOTAL = " +
                total +
                "⚡";
            return bot.sendMessage(msg.chat.id, men, {
                replyToMessage: msg.message_id,
            });
        } else {
            return bot.sendMessage(msg.chat.id, "Error Guardado 😡", {
                replyToMessage: msg.message_id,
            });
        }
    } else {
        return bot.sendMessage(msg.chat.id, "NO PERMITIDO 😡", {
            replyToMessage: msg.message_id,
        });
    }
});

bot.on(["/Print", "/print"], async (msg, props) => {
    const resultadosGetDb = await mostrarRegistros();
    if (mostrarRegistros) {
        const resultadosMensaje = resultadosGetDb
            .map(({ name, numero_iniciativa }) => {
                return `${name} ${numero_iniciativa}`;
            })
            .join("\n");
        const eliminarTabla = await eliminarIniciativas();
        if (eliminarTabla) {
            const mensaje = `🧚🏻🧙🏼MUNDO DE TINIEBLAS 👻🧛‍♀️\n--INICIATIVA LIST--\n\n${resultadosMensaje}\n\nLanza iniciativa cuando termines turno`;
            return bot.sendMessage(msg.chat.id, mensaje, {
                replyToMessage: msg.message_id,
            });
        }else{
            return bot.sendMessage(msg.chat.id, "Error DATOS Eliminacion😡", {
                replyToMessage: msg.message_id,
            });
        }
    }else{
        return bot.sendMessage(msg.chat.id, "Error DATOS 😡", {
            replyToMessage: msg.message_id,
        });
    }
});

//  TIRADA DE DADOS
bot.on(
    [
        /^\/wod (.+)$/,
        /^\/Wod (.+)$/,
        /^\/wOd (.+)$/,
        /^\/woD (.+)$/,
        /^\/WOD (.+)$/,
        /^\/WOd (.+)$/,
        /^\/wOD (.+)$/,
        /^\/WoD (.+)$/,
    ],
    (msg, props) => {
        tiradaNormal(msg, props, false);
    }
);

bot.on(
    [
        /^\/pro (.+)$/,
        /^\/PRO (.+)$/,
        /^\/Pro (.+)$/,
        /^\/pRo (.+)$/,
        /^\/prO (.+)$/,
        /^\/PRo (.+)$/,
        /^\/pRO (.+)$/,
        /^\/PrO (.+)$/,
    ],
    (msg, props) => {
        tiradaNormal(msg, props, true);
    }
);

bot.on(["/h", "/H"], (msg, props) => {
    horaActualVenezuela(msg, props);
});

bot.on(
    [
        /^\/v5 (.+)$/,
        /^\/V5 (.+)$/
    ],
    (msg, props) => {
        tiradav5(msg, props);
    }
);

bot.start();
