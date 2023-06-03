
import { Charset, InformationType, FormatVersion, Currency, UnitOfMeassure, ConceptType } from './enums';

export interface PropertyAndVersion {
    fileOwner: String | null,
    formatVersion: FormatVersion,
    fileDate: Date | null,
    softwareGenerator: String,
    header: String | null,
    identificationLabel: String | String[] | null,
    charset: Charset,
    comment: String | null,
    informationType: InformationType,
    certificationNumber: Number | null,
    certificationDate: Date | null,
    baseUrl: URL | null
}

export interface Coefficients {
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
    currency: Currency
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