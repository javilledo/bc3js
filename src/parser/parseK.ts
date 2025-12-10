
import { FormatoDecimales, PorcentajesCoeficientes, RegistroCoeficientesK } from "../interfaces/interfaceK";

const DEFAULTS = {
    DRC: 3, DC: 2, DFS: 3, DRS: 3, DUO: 2, DI: 2, DES: 2,
    DN: 2, DD: 2, DS: 2, DSP: 2, DEC: 2
};

function parseFormatosModernos(rawString: string): FormatoDecimales[] {
    if (!rawString) return [];

    const partes = rawString.split('\\');
    const formatos: FormatoDecimales[] = [];
    const TAMANO_BLOQUE = 15;

    for (let i = 0; i < partes.length; i += TAMANO_BLOQUE) {
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
            divisa: bloque[14] || ''
        });
    }

    return formatos;
}

export function parseRegistroK(linea: string): RegistroCoeficientesK {
    const campos = linea.split('|');

    if (campos[0].trim() !== '~K') {
        throw new Error(`Línea inválida para registro K: ${linea}`);
    }

    const rawPorcentajes = campos[2] ? campos[2].split('\\') : [];

    const porcentajes: PorcentajesCoeficientes = {
        costesIndirectos: parseFloat(rawPorcentajes[0]) || 0,
        gastosGenerales: parseFloat(rawPorcentajes[1]) || 0,
        beneficioIndustrial: parseFloat(rawPorcentajes[2]) || 0,
        bajaAdjudicacion: parseFloat(rawPorcentajes[3]) || 0,
        iva: parseFloat(rawPorcentajes[4]) || 0
    };

    const formatosModernos = parseFormatosModernos(campos[3]);

    const opcion = campos[4] ? parseInt(campos[4], 10) : undefined;

    return {
        tipo: 'K',
        formatosAntiguos: [],
        porcentajes,
        formatosModernos,
        opcionDivisa: isNaN(opcion!) ? undefined : opcion
    };
}
