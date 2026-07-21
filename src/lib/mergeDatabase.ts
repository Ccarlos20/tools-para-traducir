import { Category, Database } from "@/types/database";

export function combinarDatabase(
    actual: Database,
    nueva: Database
): Database {
    const categorias = combinarCategorias(
        actual.categorias,
        nueva.categorias
    )

    const caracteres: Database["caracteres"] = {
        ...actual.caracteres
    }

    for (const [caracter, datos] of Object.entries(nueva.caracteres)) {
        const existente = caracteres[caracter]
        if (!existente) {
            caracteres[caracter] = {
                categorias: [...datos.categorias],
                similares: [...datos.similares]
            }

            continue
        }

        caracteres[caracter] = {
            categorias: unirUnicos(
                existente.categorias,
                datos.categorias
            ),

            similares: unirUnicos(
                existente.similares,
                datos.similares
            )
        }
    }

    return {
        version: Math.max(
            actual.version,
            nueva.version
        ),

        categorias,
        caracteres
    }
}

function combinarCategorias(
    actual: Category[],
    nueva: Category[]
): Category[] {
    const mapa = new Map<string, Category>()

    for (const categoria of actual)
        mapa.set(categoria.id, categoria)

    for (const categoria of nueva) {
        mapa.set(categoria.id, categoria)
    }

    return [...mapa.values()]
}

function unirUnicos(
    a: string[],
    b: string[]
) {
    return [...new Set([...a, ...b])]
}