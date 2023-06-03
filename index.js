"use strict";
exports.__esModule = true;
// import { JUEGO_CARACTERES, TIPO_INFORMACION } from './src/enums';
var enums_1 = require("./src/enums");
var utils_1 = require("./src/utils");
//TODO: REEMPLAZAR LOS BACKSLASH DEL BC3 INPUT A 2 BACKSLASH: PROBLEMA CON JS PORQUE LO INTERPRETA COMO ESCAPE
function parsePropertyAndVersionfromBC3ToJSON(str) {
    var strArray = str.split('|');
    console.log(strArray);
    return {
        fileOwner: strArray[1] || null,
        formatVersion: utils_1.getEnumKeyByEnumValue(enums_1.FormatVersion, strArray[2].split('\\')[0]),
        fileDate: utils_1.convertDate(strArray[2].split('\\')[1]),
        softwareGenerator: strArray[3] || '',
        header: strArray[4].split('\\')[0] || null,
        identificationLabel: (strArray[4].split('\\').slice(1).length != 0) ? strArray[4].split('\\').slice(1) : null,
        charset: utils_1.getEnumKeyByEnumValue(enums_1.Charset, strArray[5]),
        comment: strArray[6] || null,
        informationType: utils_1.getEnumKeyByEnumValue(enums_1.InformationType, strArray[7]),
        certificationNumber: (Number(strArray[8]) != 0) ? Number(strArray[8]) : null,
        certificationDate: utils_1.convertDate(strArray[9]),
        baseUrl: (strArray[10]) ? new URL(strArray[10]) : null
    };
}
var strTest = "~V|RIB Spain|FIEBDC-3/2020\\00000|Presto 23.00||ANSI||2||||";
console.log(parsePropertyAndVersionfromBC3ToJSON(strTest));
