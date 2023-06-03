
import { Charset, InformationType, FormatVersion, Currency, UnitOfMeassure, ConceptType } from './enums';

export interface PropertyAndVersion {
    fileOwner?: String,
    formatVersion?: FormatVersion,
    fileDate?: Date,
    softwareGenerator?: String,
    header?: String,
    identificationLabel?: String | String[],
    JUEGO_CARACTERES?: Charset,
    COMENTARIO?: String,
    TIPO_INFORMACION?: InformationType,
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
    DIVISA: Currency
    CI: Number,
    GG: Number,
    BI: Number,
    BAJA: Number,
    IVA: Number
}

export interface Concepto {
    CODIGO: String | String[],
    UNIDAD?: UnitOfMeassure,
    RESUMEN?: String,
    PRECIO: Number | Number[],
    FECHA: Date | Date[],
    TIPO?: ConceptType
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