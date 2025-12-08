"use strict";
exports.__esModule = true;
var enums_1 = require("./src/enums");
var utils_1 = require("./src/utils");
function parseOwnershipAndVersionfromBC3ToJSON(str) {
    var strArray = utils_1.splitTextLineOfBC3(str);
    return {
        fileOwnership: strArray[1][0] || null,
        formatVersion: utils_1.getEnumKeyByEnumValue(enums_1.FormatVersion, strArray[2][0]),
        DDMMYYY: utils_1.convertDate(strArray[2][1]),
        emissionProgram: strArray[3][0] || '',
        header: strArray[4][0] || null,
        identificationLabel: (strArray[4].slice(1).length != 0) ? strArray[4].slice(1) : null,
        characterSet: utils_1.getEnumKeyByEnumValue(enums_1.CharacterSet, strArray[5][0]),
        comment: strArray[6][0] || null,
        informationType: utils_1.getEnumKeyByEnumValue(enums_1.InformationType, strArray[7][0]),
        certificationNumber: (Number(strArray[8]) != 0) ? Number(strArray[8][0]) : null,
        certificationDate: utils_1.convertDate(strArray[9][0]),
        urlBase: (strArray[10][0]) ? new URL(strArray[10][0]) : null
    };
}
// TESTS
var strTest = "~V|RIB Spain|FIEBDC-3/2020\\00000|Presto 23.00||ANSI||2||||";
console.log(parseOwnershipAndVersionfromBC3ToJSON(strTest));
// TODO: PARSE COEFFICIENTS
// function parseCoefficientTypefromBC3ToJSON(str: String): Coefficient {
// }
