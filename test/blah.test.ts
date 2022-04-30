// import { parsePropiedadYVersionfromBC3 } from '../src/index';
import { PropiedadYVersion } from '../dist/interfaces';
import { TIPO_INFORMACION, VERSION_FORMATO, JUEGO_CARACTERES } from '../dist/enums';

var inputTest_PropiedadYVersion_01: String = '~V | test_nombre_propiedad | FIEBDC-3/2020 \ 25042022 | my_dummy_program | Precios de diferentes ámbitos territoriales en diferentes divisas \ B-eur \ T-eur \ B-usd \ T-usd | ANSI | Certificación de prueba | Certificación (a origen) | 3 | 31032022| https://www.google.com/ | '
var resultTest_PropiedadYVersion_01: PropiedadYVersion = {
  PROPIEDAD_ARCHIVO: 'test_nombre_propiedad',
  VERSION_FORMATO:  VERSION_FORMATO['FIEBDC-3/2020'],
  DDMMAAAA: new Date(2022, 3, 25),
  PROGRAMA_EMISION: 'my_dummy_program',
  CABECERA: 'Precios de diferentes ámbitos territoriales en diferentes divisas',
  ROTULO_IDENTIFICACION: ['B-eur', 'T-eur', 'B-usd', 'T-usd'],
  JUEGO_CARACTERES: JUEGO_CARACTERES.ANSI,
  COMENTARIO: 'Certificación de prueba',
  TIPO_INFORMACION: TIPO_INFORMACION['Certificación (a origen)'],
  NUMERO_CERTIFICACION: 3,
  FECHA_CERTIFICACION: new Date(2022, 2, 31),
  URL_BASE: new URL('https://www.google.com/')
}
// describe('test_PropiedadYVersion_01', () => {
//   it('works', () => {
//     expect(parsePropiedadYVersionfromBC3(inputTest_PropiedadYVersion_01)).toEqual(resultTest_PropiedadYVersion_01);
//   });
// });