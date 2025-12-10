
import { Codificacion, FiebdcVersion } from "./types";

export interface RegistroCabeceraV {
    tipo: 'V';
    propiedadArchivo?: string;
    versionFormato: FiebdcVersion;
    fecha?: string; //Formato ddmmaaaa
    programaEmision?: string;
    cabecera?: string;
    rotuloIdentificacion?: string[];
    juegoCaracteres?: Codificacion;
    comentario?: string;
    tipoInformacion?: string;
    numeroCertificacion?: number;
    fechaCertificacion?: string; //Formato ddmmaaaa
    urlBase?: string;
}
