
// import { JUEGO_CARACTERES, TIPO_INFORMACION } from './src/enums';
import { FormatVersion } from './src/enums';
import { PropertyAndVersion } from './src/interfaces';
import { getEnumKeyByEnumValue, convertDate } from './src/utils';


//TODO: REEMPLAZAR LOS BACKSLASH DEL BC3 INPUT A 2 BACKSLASH: PROBLEMA CON JS PORQUE LO INTERPRETA COMO ESCAPE

function parsePropertyAndVersionfromBC3ToJSON(str: String): PropertyAndVersion {

  let strArray: String[] = str.split('|');

  return {
    fileOwner: strArray[1] || '',
    formatVersion: getEnumKeyByEnumValue(FormatVersion, strArray[2].split('\\')[0]),
    fileDate: convertDate(strArray[2].split('\\')[1]),
    softwareGenerator: strArray[3] || '',
    // CABECERA?: String,
    // ROTULO_IDENTIFICACION?: String | String[],
    // JUEGO_CARACTERES?: JUEGO_CARACTERES,
    // COMENTARIO?: String,
    // TIPO_INFORMACION?: TIPO_INFORMACION,
    // NUMERO_CERTIFICACION?: Number,
    // FECHA_CERTIFICACION?: Date,
    // URL_BASE?: URL
  }

}

let strTest: String = "~V||FIEBDC-3/2007\\210722|Menfis 8.2.122|\\|ANSI||2|"

console.log(parsePropertyAndVersionfromBC3ToJSON(strTest))


