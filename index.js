"use strict";
exports.__esModule = true;
// import { JUEGO_CARACTERES, TIPO_INFORMACION } from './src/enums';
var enums_1 = require("./src/enums");
var utils_1 = require("./src/utils");
//TODO: REEMPLAZAR LOS BACKSLASH DEL BC3 INPUT A 2 BACKSLASH: PROBLEMA CON JS PORQUE LO INTERPRETA COMO ESCAPE
function parsePropertyAndVersionfromBC3ToJSON(str) {
    var strArray = str.split('|');
    return {
        fileOwner: strArray[1] || '',
        formatVersion: utils_1.getEnumKeyByEnumValue(enums_1.FormatVersion, strArray[2].split('\\')[0]),
        fileDate: utils_1.convertDate(strArray[2].split('\\')[1]),
        softwareGenerator: strArray[3] || '',
        header: strArray[4].split('\\')[0],
        identificationLabel: strArray[4].split('\\').slice(1)
    };
}
var strTest = "~V||FIEBDC-3/2007\\210722|Menfis 8.2.122|cabecera\\rotulo1\\rotulo2|ANSI||2|";
console.log(parsePropertyAndVersionfromBC3ToJSON(strTest));
