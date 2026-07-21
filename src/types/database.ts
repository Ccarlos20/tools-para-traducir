export interface Category {
    id: string
    nombre: string
}

export interface CharacterData {
    categorias: string[]
    similares: string[]
}

export interface Database {
    version: number
    caracteres: Record<string, CharacterData>
    categorias: Category[]
}

export interface CharacterInfo {
    caracter: string
    categorias: string[]
    similares: string[]
}

export interface CharacterRecommendation extends CharacterInfo {
    coincidencias: number
}

export const emptyDatabase: Database = {
    version: 1,
    caracteres: {},
    categorias: []
}