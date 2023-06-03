
// import { JUEGO_CARACTERES, TIPO_INFORMACION } from './src/enums';
import { Charset, FormatVersion, InformationType } from './src/enums';
import { PropertyAndVersion } from './src/interfaces';
import { getEnumKeyByEnumValue, convertDate } from './src/utils';


//TODO: REEMPLAZAR LOS BACKSLASH DEL BC3 INPUT A 2 BACKSLASH: PROBLEMA CON JS PORQUE LO INTERPRETA COMO ESCAPE

function parsePropertyAndVersionfromBC3ToJSON(str: String): PropertyAndVersion {

  let strArray: string[] = str.split('|');

  return {
    fileOwner: strArray[1] || null,
    formatVersion: getEnumKeyByEnumValue(FormatVersion, strArray[2].split('\\')[0]),
    fileDate: convertDate(strArray[2].split('\\')[1]),
    softwareGenerator: strArray[3] || '',
    header: strArray[4].split('\\')[0] || null,
    identificationLabel: (strArray[4].split('\\').slice(1).length != 0) ? strArray[4].split('\\').slice(1) : null,
    charset: getEnumKeyByEnumValue(Charset, strArray[5]),
    comment: strArray[6] || null,
    informationType: getEnumKeyByEnumValue(InformationType, strArray[7]),
    certificationNumber: (Number(strArray[8]) != 0) ? Number(strArray[8]) : null,
    certificationDate: convertDate(strArray[9]),
    baseUrl: (strArray[10]) ? new URL(strArray[10]) : null
  }

}

// TESTS

let strTest: String = "~V|RIB Spain|FIEBDC-3/2020\\00000|Presto 23.00||ANSI||2||||"

console.log(parsePropertyAndVersionfromBC3ToJSON(strTest))


