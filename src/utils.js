"use strict";
exports.__esModule = true;
exports.getEnumKeyByEnumValue = exports.convertDate = void 0;
function convertDate(s) {
    if (s == '' || s == null || s == undefined || Number(s) == 0) {
        return null;
    }
    else {
        var day = Number(s.substring(0, 2));
        var month = Number(s.substring(2, 4)) - 1;
        var strAux = s.substring(4, 8);
        if (strAux.length == 2) {
            if (Number(strAux) > 90) {
                strAux = '19' + strAux;
            }
            else {
                strAux = '20' + strAux;
            }
        }
        var year = Number(strAux);
        return new Date(year, month, day);
    }
}
exports.convertDate = convertDate;
function getEnumKeyByEnumValue(myEnum, enumValue) {
    var keys = Object.keys(myEnum).filter(function (x) { return myEnum[x] == enumValue; });
    return keys.length > 0 ? keys[0] : null;
}
exports.getEnumKeyByEnumValue = getEnumKeyByEnumValue;
