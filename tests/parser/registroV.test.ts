import { parseRegistroV } from '../../src/parser/lineParser'; // Ajusta la ruta según tu estructura
import { RegistroCabeceraV } from '../../src/types'; // Ajusta la ruta

describe('parseRegistroV', () => {

    // CASO 1: El "Happy Path" completo según FIEBDC-3/2024
    it('debe parsear correctamente una línea compleja con sub-campos y arrays', () => {
        // Nota: En los strings de JS/TS, debemos escapar la contrabarra. 
        // La línea real es: ...|FIEBDC-3/2024\31012025|...
        const linea = '~V|MiSoftware|FIEBDC-3/2024\\31012025|EmisorPro|CabeceraGeneral\\Zona A\\Zona B|UTF-8|Presupuesto Obra|Base Precios|1|15022025|https://bimgateway.com';

        const resultado = parseRegistroV(linea);

        const esperado: RegistroCabeceraV = {
            tipo: 'V',
            propiedadArchivo: 'MiSoftware',
            versionFormato: 'FIEBDC-3/2024', // Campo 2 parte 1
            fecha: '31012025',             // Campo 2 parte 2
            programaEmision: 'EmisorPro',
            cabecera: 'CabeceraGeneral',   // Campo 4 parte 1
            rotuloIdentificacion: ['Zona A', 'Zona B'], // Campo 4 parte 2 (Array)
            juegoCaracteres: 'UTF-8',
            comentario: 'Presupuesto Obra',
            tipoInformacion: 'Base Precios',
            numeroCertificacion: 1,        // Debe ser number, no string
            fechaCertificacion: '15022025',
            urlBase: 'https://bimgateway.com'
        };

        expect(resultado).toEqual(esperado);
    });

    // CASO 2: Datos mínimos y campos vacíos
    it('debe manejar campos vacíos devolviendo undefined y parsear solo lo obligatorio', () => {
        // Línea con muchos huecos "||"
        const linea = '~V||FIEBDC-3/2024||CabeceraSimple|||||||';

        const resultado = parseRegistroV(linea);

        expect(resultado).toEqual({
            tipo: 'V',
            propiedadArchivo: undefined,   // Estaba vacío
            versionFormato: 'FIEBDC-3/2024',
            fecha: undefined,              // No había parte tras la '\'
            programaEmision: undefined,
            cabecera: 'CabeceraSimple',
            rotuloIdentificacion: undefined, // No había partes extra tras '\'
            juegoCaracteres: undefined,
            comentario: undefined,
            tipoInformacion: undefined,
            numeroCertificacion: undefined,
            fechaCertificacion: undefined,
            urlBase: undefined
        });
    });

    // CASO 3: Validación de seguridad
    it('debe lanzar un error si la línea no comienza por ~V', () => {
        const lineaInvalida = '~K|Datos|Incorrectos';

        expect(() => {
            parseRegistroV(lineaInvalida);
        }).toThrow('La línea no es un registro de cabecera válido');
    });
});