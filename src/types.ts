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

// --- Sub-interfaces para ~K ---

/**
 * Campo 2 de ~K: Porcentajes globales del presupuesto.
 */
export interface PorcentajesCoeficientes {
    costesIndirectos: number;   // CI
    gastosGenerales: number;    // GG
    beneficioIndustrial: number;// BI
    bajaAdjudicacion: number;   // BAJA
    iva: number;                // IVA
}

/**
 * Campo 3 de ~K: Definición detallada de decimales (Formato Moderno).
 * Bloque repetitivo por cada divisa definida.
 * * Nota sobre valores:
 * - Positivo: Número exacto de decimales.
 * - Negativo: Número máximo de decimales.
 */
export interface FormatoDecimales {
    // Grupo 1: Rendimientos y Precios Compuestos
    drc: number; // Decimales Rendimiento/Factor concepto (Def: 3)
    dc: number;  // Decimales Importe presupuesto/capítulos (Def: 2)

    // Hueco en la norma (posición física 2 vacía)

    dfs: number; // Decimales Factores rendimiento unidades obra (Def: 3)
    drs: number; // Decimales Rendimientos unidades obra (Def: 3)

    // Hueco en la norma (posición física 5 vacía)

    duo: number; // Decimales Coste total unidades obra (Def: 2)
    di: number;  // Decimales Importes rendimientos x precios (Def: 2)
    des: number; // Decimales Importe elementos simples (Def: 2)

    // Grupo 2: Mediciones
    dn: number;  // Decimales Nº partes iguales medición (Def: 2)
    dd: number;  // Decimales Dimensiones medición (Def: 2)
    ds: number;  // Decimales Total mediciones (Def: 2)
    dsp: number; // Decimales Subtotal mediciones (Def: 2)

    // Grupo 3: Elementos Compuestos y Divisa
    dec: number; // Decimales Importe elementos compuestos (Def: 2)
    divisa: string; // Código divisa (EUR, USD...). Debe coincidir con ~V
}

// --- REGISTRO DE COEFICIENTES (~K) ---
export interface RegistroCoeficientesK {
    tipo: 'K';

    /**
     * Campo 1: Definiciones Legacy (Desaconsejado, usar campo 3).
     * Es un array porque puede haber varias divisas.
     */
    formatosAntiguos?: any[]; // Lo tipamos como 'any' o una interfaz simplificada si no lo vas a usar.

    /**
     * Campo 2: Porcentajes de costes, gastos e impuestos.
     */
    porcentajes: PorcentajesCoeficientes;

    /**
     * Campo 3: Definiciones Modernas de decimales.
     * Es un ARRAY. El índice 0 corresponde a la divisa principal.
     * Si hay más divisas, siguen en orden secuencial.
     */
    formatosModernos: FormatoDecimales[];

    /**
     * Campo 4: Opción BdcGloParNumero.
     */
    opcionDivisa?: number;
}