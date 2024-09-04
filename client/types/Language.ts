export interface Language {
    name: string;
    nativeName: string
}

export interface Languages  {
    [key: string]: Language
}