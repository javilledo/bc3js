
import { CharacterSet, FormatVersion, InformationType } from './src/enums';
import { OwnershipAndVersion } from './src/interfaces';
import { getEnumKeyByEnumValue, convertDate } from './src/utils';

function parseOwnershipAndVersionfromBC3ToJSON(str: String): OwnershipAndVersion {

  let strArray: string[] = str.split('|');

  return {
    fileOwnership: strArray[1] || null,
    formatVersion: getEnumKeyByEnumValue(FormatVersion, strArray[2].split('\\')[0]),
    DDMMYYY: convertDate(strArray[2].split('\\')[1]),
    emissionProgram: strArray[3] || '',
    header: strArray[4].split('\\')[0] || null,
    identificationLabel: (strArray[4].split('\\').slice(1).length != 0) ? strArray[4].split('\\').slice(1) : null,
    characterSet: getEnumKeyByEnumValue(CharacterSet, strArray[5]),
    comment: strArray[6] || null,
    informationType: getEnumKeyByEnumValue(InformationType, strArray[7]),
    certificationNumber: (Number(strArray[8]) != 0) ? Number(strArray[8]) : null,
    certificationDate: convertDate(strArray[9]),
    urlBase: (strArray[10]) ? new URL(strArray[10]) : null
  }

}

// TESTS
let strTest: String = "~V|RIB Spain|FIEBDC-3/2020\\00000|Presto 23.00||ANSI||2||||"
console.log(parseOwnershipAndVersionfromBC3ToJSON(strTest))


// TODO: PARSE COEFFICIENTS
// function parseCoefficientTypefromBC3ToJSON(str: String): Coefficient {
// }








