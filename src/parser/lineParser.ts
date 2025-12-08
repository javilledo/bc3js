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