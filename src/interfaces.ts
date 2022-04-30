
import { JUEGO_CARACTERES, TIPO_INFORMACION, VERSION_FORMATO, DIVISA, UNIDAD_DE_MEDIDA, TIPO_DE_CONCEPTO } from './enums';

export interface PropiedadYVersion {
    PROPIEDAD_ARCHIVO?: String,
    VERSION_FORMATO: VERSION_FORMATO,
    DDMMAAAA: Date,
    PROGRAMA_EMISION?: String,
    CABECERA?: String,
    ROTULO_IDENTIFICACION?: String | String[],
    JUEGO_CARACTERES?: JUEGO_CARACTERES,
    COMENTARIO?: String,
    TIPO_INFORMACION?: TIPO_INFORMACION,
    NUMERO_CERTIFICACION?: Number,
    FECHA_CERTIFICACION?: Date,
    URL_BASE?: URL 
}

export interface Coeficientes {
    DRC?: Number,
    DC: Number,
    DFS?: Number,
    DRS?: Number,
    DUO?: Number,
    DI: Number,
    DES?: Number,
    DN: Number,
    DD: Number,
    DS: Number,
    DSP?: Number,
    DEC: Number,
    DIVISA: DIVISA
    CI: Number,
    GG: Number,
    BI: Number,
    BAJA: Number,
    IVA: Number
}

export interface Concepto {
    CODIGO: String | String[],
    UNIDAD?: UNIDAD_DE_MEDIDA,
    RESUMEN?: String,
    PRECIO: Number | Number[],
    FECHA: Date | Date[],
    TIPO?: TIPO_DE_CONCEPTO
}

export interface DescomposicionHijo {
    CODIGO_HIJO: String,
    FACTOR?: Number,
    RENDIMIENTO?: Number,
    CODIGO_PORCENTAJE?: Number
}

export interface Descomposicion {
    CODIGO_PADRE: String,
    children: DescomposicionHijo | DescomposicionHijo[]
}

export interface Texto {
    CODIGO_CONCEPTO: String,
    TEXTO_DESCRIPTIVO: String
}