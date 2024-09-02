export interface Language {
    name: string;
    nativeName: string
}

export type Languages = {
    [key: string]: Language
}