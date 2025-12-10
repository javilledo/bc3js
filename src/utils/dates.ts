
/**
 * Normaliza una fecha FIEBDC a formato ISO (YYYY-MM-DD) o devuelve la original si falla.
 * Reglas aplicadas:
 * - Impar: Rellenar con 0 a la izquierda.
 * - Formato AA, MMAA, DDMMAA, DDMMAAAA.
 * - Regla 80/20: Año < 80 -> 20xx, Año >= 80 -> 19xx.
 * - '00' se interpreta como día/mes desconocido (se mantiene 00 o se ajusta a 01 según necesidad).
 */

export function parseFechaFiebdc(raw: string): string {
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
