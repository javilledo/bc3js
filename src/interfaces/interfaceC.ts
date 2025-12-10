
import { TipoConcepto } from "./types";

export interface RegistroConceptoC {
    tipo: 'C';
    codigos: string[];
    unidad?: string;
    resumen?: string;
    precios: number[];
    fechas: string[]; // Formato YYYY-MM-DD
    tipoConcepto?: TipoConcepto;
}
