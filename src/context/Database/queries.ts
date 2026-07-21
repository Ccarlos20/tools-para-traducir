import { Database, CharacterInfo, CharacterRecommendation } from "@/types/database";

export function crearQueries(database: Database) {
    function obtenerCaracter(caracter: string): CharacterInfo | undefined {
        return crearCharacterInfo(caracter)
    }

    function obtenerCaracteres(): CharacterInfo[] {
        return Object.keys(database.caracteres)
            .sort()
            .map(crearCharacterInfo)
            .filter((info): info is CharacterInfo => info !== undefined)
    }

    function obtenerCaracteresCategoria(categoria: string): CharacterInfo[] {
        return Object.entries(database.caracteres)
            .filter(([, datos]) => datos.categorias.includes(categoria))
            .map(([caracter]) => crearCharacterInfo(caracter))
            .filter((info): info is CharacterInfo => info !== undefined)
    }

    function obtenerSimilares(caracter: string): CharacterInfo[] {
        const datos = database.caracteres[caracter]
        if (!datos) return []

        return datos.similares
            .map(crearCharacterInfo)
            .filter((info): info is CharacterInfo => info !== undefined)
    }

    function crearCharacterInfo(caracter: string): CharacterInfo | undefined {
        const datos = database.caracteres[caracter]
        if (!datos) return

        return {
            caracter,
            categorias: datos.categorias,
            similares: datos.similares
        }
    }

    function obtenerRelacionados(caracter: string): CharacterRecommendation[] {
        const origen = database.caracteres[caracter]
        if (!origen) return []

        return Object.entries(database.caracteres)
            .filter(([otro]) => otro !== caracter)
            .map(([otro, datos]) => {
                const coincidencias =
                    datos.categorias.filter(categoria =>
                        origen.categorias.includes(categoria)
                    ).length

                return {
                    caracter: otro,
                    categorias: datos.categorias,
                    similares: datos.similares,
                    coincidencias
                }
            })
            .filter(info => info.coincidencias > 0)
            .sort((a, b) => b.coincidencias - a.coincidencias)
    }

    function obtenerCaracteresConMaxCategorias(maximo: number): CharacterInfo[] {
        return Object.entries(database.caracteres)
            .filter(([, datos]) => datos.categorias.length == maximo)
            .map(([caracter]) => crearCharacterInfo(caracter))
            .filter((info): info is CharacterInfo => info !== undefined)
    }

    return {
        obtenerCaracter,
        obtenerCaracteres,
        obtenerCaracteresCategoria,
        obtenerSimilares,
        obtenerRelacionados,
        obtenerCaracteresConMaxCategorias
    }
}