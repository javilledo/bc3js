
export type Codificacion = 'ANSI' | 'CP850' | 'UTF-8' | string;

export type FiebdcVersion =
    | 'FIEBDC-3/2024'  // Versión actual
    | 'FIEBDC-3/2020'  // Versión actual
    | 'FIEBDC-3/2016'  // Versión base estable NO VIGENTE
    | 'FIEBDC-3/2012'  // Versión base estable NO VIGENTE
    | 'FIEBDC-3/2004'  // Versión base estable NO VIGENTE
    | 'FIEBDC-3/2002'; // Versiones legacy NO VIGENTES

export enum TipoConcepto {
    SinClasificar = 0, // Sin clasificar
    ManoDeObra = 1, // Mano de obra
    Maquinaria = 2, // Maquinaria y medios auxiliares
    Materiales = 3, // Materiales
    ResiduoComponentes = 4, // Componentes adicionales de residuo
    ResiduoClasificacion = 5 // Clasificación de residuo
}
