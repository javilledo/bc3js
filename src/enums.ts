
export enum FormatVersion {
    v101 = 'FIE-1.01',
    v1995 = 'FIEBDC-3/95',
    v1998 = 'FIEBDC-3/98',
    v2002 = 'FIEBDC-3/2002',
    v2004 = 'FIEBDC-3/2004',
    v2007 = 'FIEBDC-3/2007',
    v2012 = 'FIEBDC-3/2012',
    v2016 = 'FIEBDC-3/2016',
    v2020 = 'FIEBDC-3/2020'
}

export enum CharacterSet {
    ANSI = 'ANSI'
} // No se contemplan 850 ni 437 (D.O.S)

export enum InformationType {
    'Database' = 1, // Base de datos
    'Budget' = 2, // Presupuesto
    'Actual cost' = 3, // Certificación (a origen)
    'Database update' = 4 // Actualización de base de datos
}

export enum Currency {
    'ATS', //Chelin Austriaco 
    'BEF', //Franco Belga 
    'DEM', // Marco Alemán 
    'ESP', // Peseta Española 
    'FIM', // Marco Finlandés 
    'FRF', // Franco Francés 
    'GRD', // Dracma Griega 
    'IEP', // Libra Irlandesa 
    'ITL', // Lira Italiana 
    'LUF', // Franco Luxemburgués 
    'NLG', // Florín Neerlandés 
    'PTE', // Escudo Portugués 
    'AUD', //Dólar Australiano 
    'BGN', //Lev Búlgaro 
    'CAD', //Dólar Canadiense 
    'CHF', //Franco Suizo 
    'CYP', //Libra Chipriota 
    'CZK', //Corona Checa 
    'DKK', //Corona Danesa 
    'EEK', //Corona Estona 
    'EUR', //Euro 
    'GBP', //Libra Esterlina 
    'HKD', //Dólar de Hong-Kong 
    'HUF', //Forint Húngaro 
    'ISK', //Corona Islandesa 
    'JPY', //Yen Japonés 
    'KRW', //Won Surcoreano 
    'LTL', //Litas Lituano 
    'LVL', //Lats Letón 
    'MTL', //Lira Maltesa 
    'NOK', //Corona Noruega 
    'NZD', //Dólar Neozelandés 
    'PLN', //Zloty Polaco 
    'ROL', //Leu Rumano 
    'SEK', //Corona Sueca 
    'SGD', //Dólar de Singapur 
    'SIT', //Tolar Esloveno 
    'SKK', //Corona Eslovaca 
    'TRL', //Lira Turca 
    'USD', //Dólar Estadounidense 
    'ZAR', //Rand Sudafricano 
}

export enum UnitOfMeassure {
    'm',   //Metro
    'm2',  //Metro cuadrado
    'm3',  //Metro cúbico
    'kg',  //Kilogramo
    'km',  //Kilómetro
    't',   //Tonelada
    'l',   //Litro
    'h',   //Hora
    'd',   //Día
    'a',   //Área
    'ha',  //Hectárea
    'cm3', //Centímetro cúbico
    'cm2', //Centímetro cuadrado
    'dm3', //Decímetro cúbico
    'u',   //Unidad
    'mu',  //Mil unidades
    'cu',  //Cien unidades
    'mes', //Mes
}

export enum ConceptType {
    'Unclassified' = 0, // Sin clasificar
    'Labour' = 1, // Mano de obra
    'Machinery and auxiliary equipment' = 2, // Maquinaria y medios auxiliares
    'Materials' = 3, // Materiales
    'Additional waste components' = 4, // Componentes adicionales de residuo
    'Waste classification' = 5 // Clasificación de residuo
}

export enum DecompositionType {
    'Placement-component waste' = 0,
    'Demolition-component waste' = 1,
    'Excavation-component wastes' = 2,
    'Packaging-component wastes' = 3,
}

export enum Property {
    'Output' = 'o',
    'Waste factor' = 'wf'
}