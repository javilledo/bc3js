
export interface PorcentajesCoeficientes {
    costesIndirectos: number;   // CI
    gastosGenerales: number;    // GG
    beneficioIndustrial: number;// BI
    bajaAdjudicacion: number;   // BAJA
    iva: number;                // IVA
}

export interface FormatoDecimales {
    drc: number; // Decimales Rendimiento/Factor concepto (Def: 3)
    dc: number;  // Decimales Importe presupuesto/capítulos (Def: 2)
    dfs: number; // Decimales Factores rendimiento unidades obra (Def: 3)
    drs: number; // Decimales Rendimientos unidades obra (Def: 3)
    duo: number; // Decimales Coste total unidades obra (Def: 2)
    di: number;  // Decimales Importes rendimientos x precios (Def: 2)
    des: number; // Decimales Importe elementos simples (Def: 2)
    dn: number;  // Decimales Nº partes iguales medición (Def: 2)
    dd: number;  // Decimales Dimensiones medición (Def: 2)
    ds: number;  // Decimales Total mediciones (Def: 2)
    dsp: number; // Decimales Subtotal mediciones (Def: 2)
    dec: number; // Decimales Importe elementos compuestos (Def: 2)
    divisa: string; // Código divisa (EUR, USD...). Debe coincidir con ~V
}

export interface RegistroCoeficientesK {
    tipo: 'K';
    formatosAntiguos?: any[];
    porcentajes: PorcentajesCoeficientes;
    formatosModernos: FormatoDecimales[];
    opcionDivisa?: number;
}
