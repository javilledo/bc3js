
import { CharacterSet, InformationType, FormatVersion, Currency, UnitOfMeassure, DecompositionType, Property } from './enums';

export interface OwnershipAndVersion { // ~V
    fileOwnership: String | null,
    formatVersion: FormatVersion,
    DDMMYYY: Date | null,
    emissionProgram: String,
    header: String | null,
    identificationLabel: String | String[] | null,
    characterSet: CharacterSet,
    comment: String | null,
    informationType: InformationType,
    certificationNumber: Number | null,
    certificationDate: Date | null,
    urlBase: URL | null
}

export interface Coefficient { // ~K
    DN: Number,         // Decimals of the equal-parts number field of the measurement sheet. Two decimals by default. 
    DD: Number,         // Decimals of dimensions of the three magnitudes of the measurement sheet. Two decimals by default. 
    DS: Number,         // Decimals of the subtotal or total measurement line. Two decimals by default.  
    DR: Number,         // Decimals of output and factor in a decomposition. Three decimals by default.  
    DI: Number,         // Decimals of the amount resulting from multiplying output and price of the concept. Two decimals by default.   
    DP: Number,         // Decimals of the amount resulting from the sum of the direct costs of the concept. Two decimals by default. 
    DC: Number,         // Decimals of the total amount of the concept. (CD+CI). Two decimals by default. 
    DM: Number,         // Decimals of the amount resulting from multiplying the total measurement of the concept by its price. Two decimals by default. 
    currency: Currency, // Currency
    CI: Number,         // Indirect costs, expressed as a percentage. 
    GG: Number,         // General Company Overheads, expressed as a percentage. 
    BI: Number,         // Contractor's Industrial Profit, expressed as a percentage. 
    reduction: Number,  // Coefficient of decrease or increase of an award budget, expressed as a percentage. 
    VAT: Number,        // Value Added Tax, expressed as a percentage. 
    DRC: Number,        // Output and output-factor decimals of a budget, and decimals of the result of their multiplication. Three decimals by default. 
    DFS: Number,        // Decimals of the output factors of the work units and compound elements. Three decimals by default. 
    DRS: Number,        // Decimals of the output of the work units and compound elements and decimals of the result of the multiplication of these outputs by their respective factors. Three decimals by default. 
    DUO: Number,        // Decimals of the total cost of the work units. Two decimals by default. 
    DES: Number,        // Decimals of the amount of the individual elements. Two decimals by default. 
    DSP: Number,        // Decimals of the measurement subtotal line. Two decimals by default. 
    DEC: Number,        // Decimals of the amount of compound elements. Two decimals by default. 
    n: Number,          // Is the number of the option of the BdcGloParNumero function that refers to the currency concept. 
}

export interface Concept { // ~C
    code: String | String[],
    unit: UnitOfMeassure,
    summary: String,
    price: Number | Number[],
    date: Date | Date[],
    type: Concept
}

export interface Decomposition { // ~D
    parentCode: String,
    childCode: String,
    factor: Number,
    output: Number,
    percentageCode: Number
}

export interface WasteDecomposition { // ~R 
    parentCode: String,
    decompositionType: DecompositionType,
    childCode: String,
    property: Property,
    value: Number,
    unit: UnitOfMeassure
}

export interface Text { // ~T
    conceptCode: String,
    descriptiveText: String
}

// TODO: ParametricDescription
// TODO: Specifications
// TODO: GeographicScope
// TODO: GraphicInformation
// TODO: Entity
// TODO: CommercialRelationship
// TODO: TechnicalInformation
// TODO: Meassurement
// TODO: BIMFile ~I
// TODO: Key
// TODO: CodeChange
// TODO: AttachedDocument
