import { RegistroCabeceraV, FiebdcVersion, Codificacion, TipoConcepto, FormatoDecimales, RegistroCoeficientesK, PorcentajesCoeficientes, RegistroConceptoC } from '../types'; // Ajusta la ruta a tu archivo de interfaces

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



/**
 * Normaliza una fecha FIEBDC a formato ISO (YYYY-MM-DD) o devuelve la original si falla.
 * Reglas aplicadas:
 * - Impar: Rellenar con 0 a la izquierda.
 * - Formato AA, MMAA, DDMMAA, DDMMAAAA.
 * - Regla 80/20: Año < 80 -> 20xx, Año >= 80 -> 19xx.
 * - '00' se interpreta como día/mes desconocido (se mantiene 00 o se ajusta a 01 según necesidad).
 */
function parseFechaFiebdc(raw: string): string {
    if (!raw) return '';

    let str = raw.trim();
    // Si es impar, rellenar con 0 a la izquierda
    if (str.length % 2 !== 0) str = '0' + str;

    let dia = '00';
    let mes = '00';
    let anioStr = '';

    // DDMMAAAA (8)
    if (str.length === 8) {
        dia = str.substring(0, 2);
        mes = str.substring(2, 4);
        anioStr = str.substring(4, 8);
    }
    // DDMMAA (6)
    else if (str.length === 6) {
        dia = str.substring(0, 2);
        mes = str.substring(2, 4);
        anioStr = str.substring(4, 6);
    }
    // MMAA (4)
    else if (str.length === 4) {
        mes = str.substring(0, 2);
        anioStr = str.substring(2, 4);
    }
    // AA (2)
    else if (str.length === 2) {
        anioStr = str;
    } else {
        return raw; // Formato desconocido
    }

    // Regla 80/20 para años de 2 dígitos
    let anio = parseInt(anioStr, 10);
    if (anioStr.length === 2) {
        if (anio >= 80) anio += 1900;
        else anio += 2000;
    }

    return `${anio}-${mes}-${dia}`;
}


export function parseRegistroC(linea: string): RegistroConceptoC {
    const campos = linea.split('|');

    if (campos[0].trim() !== '~C') {
        throw new Error(`Línea inválida para registro C: ${linea}`);
    }

    // --- Campo 1: Códigos ---
    const codigos = campos[1] ? campos[1].split('\\') : [];

    // --- Campo 4: Precios ---
    const rawPrecios = campos[4] ? campos[4].split('\\') : [];
    const precios = rawPrecios.map(p => {
        const val = parseFloat(p);
        return isNaN(val) ? 0 : val;
    });

    // --- Campo 5: Fechas ---
    const rawFechas = campos[5] ? campos[5].split('\\') : [];
    const fechas = rawFechas.map(f => parseFechaFiebdc(f));

    // --- Campo 6: Tipo de Concepto (NUEVO LÓGICA) ---
    const rawTipo = campos[6];
    let tipoEnum: TipoConcepto | undefined = undefined;

    if (rawTipo !== undefined && rawTipo !== '') {
        const val = parseInt(rawTipo, 10);
        // Validamos que sea un número. Si el archivo trae un tipo desconocido (ej. 99),
        // lo guardamos igual (cast) o lo dejamos undefined según tu preferencia.
        // Aquí lo guardamos si es número:
        if (!isNaN(val)) {
            tipoEnum = val as TipoConcepto;
        }
    }

    return {
        tipo: 'C',
        codigos: codigos.filter(c => c !== ''),
        unidad: campos[2] || undefined,
        resumen: campos[3] || undefined,
        precios,
        fechas,
        tipoConcepto: tipoEnum // Asignamos el Enum parseado
    };
}