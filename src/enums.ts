
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
}

export enum InformationType {
    'Database' = 1,
    'Budget' = 2,
    'Actual cost' = 3,
    'Database update' = 4
}

export enum Currency {
    'ATS', // Austrian Schilling 
    'BEF', // Belgian Franc 
    'DEM', // Deutsche Mark 
    'ESP', // Spanish Peseta 
    'FIM', // Finnish Markka 
    'FRF', // French Franc 
    'GRD', // Greek Drachma 
    'IEP', // Irish Punt 
    'ITL', // Italian Lira 
    'LUF', // Luxembourg Franc 
    'NLG', // Dutch Guilder 
    'PTE', // Portuguese Escudo 
    'AUD', // Australian Dollar 
    'BGN', // Bulgarian Lev 
    'CAD', // Canadian Dollar 
    'CHF', // Swiss Franc 
    'CYP', // Cypriot Pound 
    'CZK', // Czech Krona 
    'DKK', // Danish Krone 
    'EEK', // Estonian Kroon 
    'EUR', // Euro 
    'GBP', // Pound Sterling 
    'HKD', // Hong-Kong Dollar 
    'HUF', // Hungarian Forint 
    'ISK', // Icelandic Krona 
    'JPY', // Japanese Yen 
    'KRW', // South-Korean Won 
    'LTL', // Lithuanian Litas 
    'LVL', // Latvian Lats 
    'MTL', // Maltese Lira 
    'NOK', // Norwegian Krone 
    'NZD', // New Zealand Dollar 
    'PLN', // Polish Zloty 
    'ROL', // Romanian Leu 
    'SEK', // Swedish Krona 
    'SGD', // Singapore Dollar 
    'SIT', // Slovenian Tolar 
    'SKK', // Slovakian Koruna 
    'TRL', // Turkish Lira 
    'USD', // US Dollar 
    'ZAR', // South-African Rand 
}

export enum UnitOfMeassure {
    'm',     // Metre
    'm2',    // Metre squared
    'm3',    // Metre cubed
    'kg',    // Kilogram
    'km',    // Kilometre
    't',     // Tonne
    'l',     // Litre
    'h',     // Hour
    'd',     // Day
    'to',    // Area
    'ha',    // Hectare
    'cm3',   // Centimetre cubed
    'cm2',   // Centimetre squared
    'dm3',   // Decimetre cubed
    'u',     // Unit
    'mu',    // Thousand units
    'cu',    // Hundred units
    'month', // Month
}

export enum ConceptType {
    'Unclassified' = 0,
    'Labour' = 1,
    'Machinery and auxiliary equipment' = 2,
    'Materials' = 3,
    'Additional waste components' = 4,
    'Waste classification' = 5
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