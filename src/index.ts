// import { VERSION_FORMATO } from './enums';

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

// export function parsePropiedadYVersionfromBC3 (s: String): any {

//   let res: String[] = s.split('|').map((el: String): String => {return el.trimStart().trimEnd();});
//   let propiedadyversion = {
//     PROPIEDAD_ARCHIVO: res[1] || '',
//     VERSION_FORMATO: res[2].split('  ')[0],
//     DDMMAAAA: new Date(),
//     PROGRAMA_EMISION: res[3] || '',
//     CABECERA?: String,
//     ROTULO_IDENTIFICACION?: String | String[],
//     JUEGO_CARACTERES?: JUEGO_CARACTERES,
//     COMENTARIO?: String,
//     TIPO_INFORMACION?: TIPO_INFORMACION,
//     NUMERO_CERTIFICACION?: Number,
//     FECHA_CERTIFICACION?: Date,
//     URL_BASE?: URL
//   }

//   return res

// }

export function convertDate(s: String): Date {
  let day: number = Number(s.substring(0, 2));
  let month: number = Number(s.substring(2, 4));
  let year: number = Number(s.substring(4, 8));
  return new Date(year, month, day)
}

// var inputTest_PropiedadYVersion_01: String = "~V | test_nombre_propiedad | FIEBDC-3/2020 \ 25042022 | my_dummy_program | Precios de diferentes ámbitos territoriales en diferentes divisas \ B-eur \ T-eur \ B-usd \ T-usd | ANSI | Certificación de prueba | Certificación (a origen) | 3 | 31032022| https://www.google.com/ | "

// console.log(parsePropiedadYVersionfromBC3(inputTest_PropiedadYVersion_01));

