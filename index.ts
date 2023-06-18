
import { CharacterSet, FormatVersion, InformationType } from './src/enums';
import { OwnershipAndVersion } from './src/interfaces';
import { getEnumKeyByEnumValue, convertDate, splitTextLineOfBC3 } from './src/utils';

function parseOwnershipAndVersionfromBC3ToJSON(str: string): OwnershipAndVersion {

  let strArray: string[][] = splitTextLineOfBC3(str)

  return {
    fileOwnership: strArray[1][0] || null,
    formatVersion: getEnumKeyByEnumValue(FormatVersion, strArray[2][0]),
    DDMMYYY: convertDate(strArray[2][1]),
    emissionProgram: strArray[3][0] || '',
    header: strArray[4][0] || null,
    identificationLabel: (strArray[4].slice(1).length != 0) ? strArray[4].slice(1) : null,
    characterSet: getEnumKeyByEnumValue(CharacterSet, strArray[5][0]),
    comment: strArray[6][0] || null,
    informationType: getEnumKeyByEnumValue(InformationType, strArray[7][0]),
    certificationNumber: (Number(strArray[8]) != 0) ? Number(strArray[8][0]) : null,
    certificationDate: convertDate(strArray[9][0]),
    urlBase: (strArray[10][0]) ? new URL(strArray[10][0]) : null
  }

}

// TESTS
let strTest: string = "~V|RIB Spain|FIEBDC-3/2020\\00000|Presto 23.00||ANSI||2||||"
console.log(parseOwnershipAndVersionfromBC3ToJSON(strTest))


// TODO: PARSE COEFFICIENTS
// function parseCoefficientTypefromBC3ToJSON(str: String): Coefficient {
// }








