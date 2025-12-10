
import { RegistroCabeceraV } from "../interfaces/interfaceV";
import { Codificacion, FiebdcVersion } from "../interfaces/types";

export function parseRegistroV(linea: string): RegistroCabeceraV {

    const campos = linea.split('|');

    if (campos[0].trim() !== '~V') {
        throw new Error(`La línea no es un registro de cabecera válido: ${linea}`);
    }

    const rawVersionFecha = campos[2] ? campos[2].split('\\') : [];
    const version = rawVersionFecha[0] as FiebdcVersion;
    const fecha = rawVersionFecha[1] || undefined;

    const rawCabeceraRotulos = campos[4] ? campos[4].split('\\') : [];
    const cabeceraPrincipal = rawCabeceraRotulos[0] || undefined;
    const rotulos = rawCabeceraRotulos.length > 1 ? rawCabeceraRotulos.slice(1) : undefined;

    const rawNumCert = campos[8] ? parseInt(campos[8], 10) : NaN;
    const numCertificacion = isNaN(rawNumCert) ? undefined : rawNumCert;

    return {
        tipo: 'V',
        propiedadArchivo: campos[1] || undefined,

        versionFormato: version,
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
