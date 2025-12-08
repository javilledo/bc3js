// --- TIPOS AUXILIARES ---
export type Codificacion = 'ANSI' | 'CP850' | 'UTF-8' | string;
export type TipoConcepto = '0' | '1' | '2' | '3' | string;
export type FiebdcVersion =
    | 'FIEBDC-3/2024'  // Versión actual
    | 'FIEBDC-3/2020'  // Versión con soporte extendido
    | 'FIEBDC-3/2016'  // Versión base estable
    | 'FIEBDC-3/2012'
    | 'FIEBDC-3/2004'
    | 'FIEBDC-3/2002'; // Versiones legacy

// --- REGISTRO DE CABECERA (~V) ---
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