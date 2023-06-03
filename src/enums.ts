
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

export enum Charset {
    ANSI = 'ANSI'
} // No se contemplan 850 ni 437 (D.O.S)

export enum InformationType {
    'Base de datos' = 1,
    'Presupuesto' = 2,
    'Certificación (a origen)' = 3,
    'Actualización de base de datos' = 4
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
    'Sin clasificar' = 0,
    'Mano de obra' = 1,
    'Maquinaria y medios auxiliares' = 2,
    'Materiales' = 3,
    'Componentes adicionales de residuo' = 4,
    'Clasificación de residuo' = 5
}