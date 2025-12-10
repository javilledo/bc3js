
import { TipoConcepto } from "../interfaces/types";
import { RegistroConceptoC } from "../interfaces/interfaceC";
import { parseFechaFiebdc } from "../utils/dates";

export function parseRegistroC(linea: string): RegistroConceptoC {
    const campos = linea.split('|');

    if (campos[0].trim() !== '~C') {
        throw new Error(`Línea inválida para registro C: ${linea}`);
    }

    const codigos = campos[1] ? campos[1].split('\\') : [];

    const rawPrecios = campos[4] ? campos[4].split('\\') : [];
    const precios = rawPrecios.map(p => {
        const val = parseFloat(p);
        return isNaN(val) ? 0 : val;
    });

    const rawFechas = campos[5] ? campos[5].split('\\') : [];
    const fechas = rawFechas.map(f => parseFechaFiebdc(f));

    const rawTipo = campos[6];
    let tipoEnum: TipoConcepto | undefined = undefined;

    if (rawTipo !== undefined && rawTipo !== '') {
        const val = parseInt(rawTipo, 10);
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
        tipoConcepto: tipoEnum
    };
}
