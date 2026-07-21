import { esCaracterJapones } from "@/lib/characterUtils";
import { Database } from "@/types/database";
import { CharacterData } from "@/types/database";

export function crearCharactersActions(
    database: Database,
    setDatabase: React.Dispatch<React.SetStateAction<Database>>
) {
    function agregarCaracter(caracter: string) {
        setDatabase((db) => crearCaracterSiNoExiste(
            db,
            caracter
        ))
    }

    function cambiarCategoria(
        caracter: string,
        categoriaId: string
    ) {
        setDatabase((db) => {
            const datos = db.caracteres[caracter]
            if (!datos) return db

            const categorias = datos.categorias.includes(categoriaId)
                ? datos.categorias.filter(
                    id => id !== categoriaId
                ) : [
                    ...datos.categorias,
                    categoriaId
                ]

            return {
                ...db,
                caracteres: {
                    ...db.caracteres,
                    [caracter]: {
                        ...datos,
                        categorias
                    }
                }
            }
        })
    }

    function agregarSimilar(
        caracter: string,
        similar: string
    ) {
        const texto = similar.trim()
        if (texto === "") return
        if (texto.length !== 1) return
        if (!esCaracterJapones(texto)) return
        if (texto === caracter) return

        setDatabase(db => {
            db = crearCaracterSiNoExiste(db, texto)

            const datos = db.caracteres[caracter]
            if (!datos) return db
            if (datos.similares.includes(texto))
                return db

            return agregarRelacionSimilar(
                db,
                caracter,
                texto
            )
        })
    }

    function crearCaracterSiNoExiste(
        db: Database,
        caracter: string
    ): Database {
        if (caracter in db.caracteres) return db

        return {
            ...db,
            caracteres: {
                ...db.caracteres,
                [caracter]: {
                    categorias: [],
                    similares: []
                }
            }
        }
    }

    function agregarRelacionSimilar(
        db: Database,
        caracterA: string,
        caracterB: string
    ): Database {
        const datosA = db.caracteres[caracterA]
        const datosB = db.caracteres[caracterB]

        return {
            ...db,
            caracteres: {
                ...db.caracteres,
                [caracterA]: actualizarSimilares(
                    datosA,
                    caracterB,
                    true
                ),
                [caracterB]: actualizarSimilares(
                    datosB,
                    caracterA,
                    true
                )
            }
        }
    }


    function eliminarSimilar(
        caracter: string,
        similar: string
    ) {
        setDatabase(db => {
            if (!(similar in db.caracteres))
                return db

            return eliminarRelacionSimilar(
                db,
                caracter,
                similar
            )
        })
    }

    function eliminarRelacionSimilar(
        db: Database,
        caracterA: string,
        caracterB: string
    ): Database {
        const datosA = db.caracteres[caracterA]
        const datosB = db.caracteres[caracterB]

        return {
            ...db,
            caracteres: {
                ...db.caracteres,
                [caracterA]: actualizarSimilares(
                    datosA,
                    caracterB,
                    false
                ),
                [caracterB]: actualizarSimilares(
                    datosB,
                    caracterA,
                    false
                )
            }
        }
    }

    function actualizarSimilares(
        datos: CharacterData,
        caracter: string,
        agregar: boolean
    ): CharacterData {
        return {
            ...datos,
            similares: agregar
                ? datos.similares.includes(caracter)
                    ? datos.similares
                    : [
                        ...datos.similares,
                        caracter
                    ]
                : datos.similares.filter(
                    s => s !== caracter
                )
        }
    }

    return {
        agregarCaracter,
        cambiarCategoria,
        agregarSimilar,
        eliminarSimilar
    }
}