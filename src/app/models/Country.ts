export interface Country {
    flags: Flag,
    name: Name,
    independent: boolean,
    unMember: boolean,
    population: number,
    area: number,
    region: string,
    subregion: string,
    languages: Langauge,
    borders: string[],
    cca3: string,
    currencies: Record<string, Currency>,
    capital: string[],
    continents: string[]
}

export interface Langauge {
    [key: string]: string;
}
export interface Currency {
    name: string;
    symbol: string;
    //[key: string]: string;
}
export interface Flag {
    png: string,
    svg: string,
    alt: string
}
export interface Name {
    common: string,
    official: string
}

export interface SortInterface {
    key: Sorts,
    name: string
}

export enum Sorts {
    Population = "POPULATION",
    Name = "NAME",
    Area = "AREA"
}

export interface Region {
    isChecked: boolean,
    label: string
}
