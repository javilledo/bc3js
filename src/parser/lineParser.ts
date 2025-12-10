import { RegistroCabeceraV, FiebdcVersion, Codificacion } from '../types'; // Ajusta la ruta a tu archivo de interfaces

/**
 * Parsea una línea de texto cruda que comienza con ~V
 * respetando el estándar FIEBDC-3/2024.
 */
export function parseRegistroV(linea: string): RegistroCabeceraV {
    // 1. Separar los campos principales por la tubería '|'
    // El estándar permite espacios, pero es seguro hacer trim() a la línea completa antes si se desea.
    const campos = linea.split('|');

    // Validación básica
    if (campos[0].trim() !== '~V') {
        throw new Error(`La línea no es un registro de cabecera válido: ${linea}`);
    }

    // --- Lógica para Campo 2: Versión \ Fecha ---
    const rawVersionFecha = campos[2] ? campos[2].split('\\') : [];
    const version = rawVersionFecha[0] as FiebdcVersion;
    const fecha = rawVersionFecha[1] || undefined;

    // --- Lógica para Campo 4: Cabecera \ Rótulos ---
    const rawCabeceraRotulos = campos[4] ? campos[4].split('\\') : [];
    const cabeceraPrincipal = rawCabeceraRotulos[0] || undefined;
    // Si hay más elementos después del primero, son los rótulos. Si no, undefined.
    const rotulos = rawCabeceraRotulos.length > 1 ? rawCabeceraRotulos.slice(1) : undefined;

    // --- Lógica para Campo 8: Número (Parsear a Int) ---
    const rawNumCert = campos[8] ? parseInt(campos[8], 10) : NaN;
    const numCertificacion = isNaN(rawNumCert) ? undefined : rawNumCert;

    // Construcción del objeto
    // Usamos (val || undefined) para evitar guardar strings vacíos "" si el campo viene vacío "||"
    return {
        tipo: 'V',
        propiedadArchivo: campos[1] || undefined,

        versionFormato: version, // Es obligatorio, asumimos que viene
        fecha: fecha,

        programaEmision: campos[3] || undefined,

        cabecera: cabeceraPrincipal,
        rotuloIdentificacion: rotulos,

        juegoCaracteres: (campos[5] as Codificacion) || undefined,
        comentario: campos[6] || undefined,
        tipoInformacion: campos[7] || undefined,

        numeroCertificacion: numCertificacion,
        fechaCertificacion: campos[9] || undefined,
        urlBase: campos[10] || undefined
    };
}

import { RegistroCoeficientesK, PorcentajesCoeficientes, FormatoDecimales } from '../types';

/**
 * Valores por defecto según estándar FIEBDC-3
 */
const DEFAULTS = {
    DRC: 3, DC: 2, DFS: 3, DRS: 3, DUO: 2, DI: 2, DES: 2,
    DN: 2, DD: 2, DS: 2, DSP: 2, DEC: 2
};

/**
 * Función auxiliar para parsear un bloque de formato moderno.
 * El estándar mete todos los formatos en una sola cadena separada por '\'.
 * Cada formato ocupa 15 posiciones (contando los huecos).
 */
function parseFormatosModernos(rawString: string): FormatoDecimales[] {
    if (!rawString) return [];

    const partes = rawString.split('\\');
    const formatos: FormatoDecimales[] = [];
    const TAMANO_BLOQUE = 15; // Según tu descripción, hay 15 slots por divisa

    // Iteramos por bloques de 15 elementos
    for (let i = 0; i < partes.length; i += TAMANO_BLOQUE) {
        // Si no quedan suficientes elementos para un bloque completo, paramos o cogemos lo que haya
        if (i + 14 >= partes.length) break;

        const bloque = partes.slice(i, i + TAMANO_BLOQUE);

        formatos.push({
            drc: parseInt(bloque[0]) || DEFAULTS.DRC,
            dc: parseInt(bloque[1]) || DEFAULTS.DC,
            // bloque[2] es hueco vacío
            dfs: parseInt(bloque[3]) || DEFAULTS.DFS,
            drs: parseInt(bloque[4]) || DEFAULTS.DRS,
            // bloque[5] es hueco vacío
            duo: parseInt(bloque[6]) || DEFAULTS.DUO,
            di: parseInt(bloque[7]) || DEFAULTS.DI,
            des: parseInt(bloque[8]) || DEFAULTS.DES,
            dn: parseInt(bloque[9]) || DEFAULTS.DN,
            dd: parseInt(bloque[10]) || DEFAULTS.DD,
            ds: parseInt(bloque[11]) || DEFAULTS.DS,
            dsp: parseInt(bloque[12]) || DEFAULTS.DSP,
            dec: parseInt(bloque[13]) || DEFAULTS.DEC,
            divisa: bloque[14] || '' // La divisa es string
        });
    }

    return formatos;
}

export function parseRegistroK(linea: string): RegistroCoeficientesK {
    const campos = linea.split('|');

    if (campos[0].trim() !== '~K') {
        throw new Error(`Línea inválida para registro K: ${linea}`);
    }

    // --- Campo 2: Porcentajes (Posición física 2) ---
    // Estructura: CI \ GG \ BI \ BAJA \ IVA
    const rawPorcentajes = campos[2] ? campos[2].split('\\') : [];

    const porcentajes: PorcentajesCoeficientes = {
        costesIndirectos: parseFloat(rawPorcentajes[0]) || 0,
        gastosGenerales: parseFloat(rawPorcentajes[1]) || 0,
        beneficioIndustrial: parseFloat(rawPorcentajes[2]) || 0,
        bajaAdjudicacion: parseFloat(rawPorcentajes[3]) || 0,
        iva: parseFloat(rawPorcentajes[4]) || 0
    };

    // --- Campo 3: Formatos Modernos (Posición física 3) ---
    // Este es el importante. Puede contener múltiples divisas concatenadas.
    const formatosModernos = parseFormatosModernos(campos[3]);

    // --- Campo 4: Opción (Posición física 4) ---
    const opcion = campos[4] ? parseInt(campos[4], 10) : undefined;

    return {
        tipo: 'K',
        // Omitimos el parseo detallado del campo 1 (legacy) por simplicidad, 
        // pero podrías hacerlo similar al campo 3 si lo necesitas.
        formatosAntiguos: [],
        porcentajes,
        formatosModernos,
        opcionDivisa: isNaN(opcion!) ? undefined : opcion
    };
}