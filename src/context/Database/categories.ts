import { Category, Database } from "@/types/database";

import { crearSlug, existeCategoria } from "@/lib/categoryUtils";

export function crearCategoriesActions(
    database: Database,
    setDatabase: React.Dispatch<React.SetStateAction<Database>>
) {
    function agregarCategoria(nombre: string): boolean {
        const texto = nombre.trim()
        if (texto === "") return false

        const slug = crearSlug(texto)
        if (slug === "") return false

        if (existeCategoria(
            database.categorias,
            slug
        )) return false

        setDatabase((db) => ({
            ...db,
            categorias: [
                ...db.categorias,
                {
                    id: slug,
                    nombre: texto
                }
            ]
        }))

        return true
    }

    function editarCategoria(
        id: string,
        nuevoNombre: string
    ): boolean {
        const nombre = nuevoNombre.trim()
        if (nombre === "") return false

        const categoria = obtenerCategoria(id)
        if (!categoria) return false
        if (categoria.nombre === nombre)
            return false

        setDatabase(db => ({
            ...db,
            categorias:
                db.categorias.map(categoria =>
                    categoria.id === id
                        ? {
                            ...categoria,
                            nombre
                        }
                        : categoria
                )
        }))
        return true
    }

    function eliminarCategoria(id: string): boolean {
        const usada = contarCaracteres(id) > 0
        if (usada) return false

        setDatabase(db => ({
            ...db,
            categorias:
                db.categorias.filter(categoria => categoria.id !== id)
        }))

        return true
    }

    function contarCaracteres(id: string): number {
        return Object.values(database.caracteres)
            .filter(c => c.categorias.includes(id))
            .length
    }

    function obtenerCategoria(id: string): Category | undefined {
        return database.categorias.find(categoria => categoria.id === id)
    }

    return {
        agregarCategoria,
        editarCategoria,
        eliminarCategoria,
        contarCaracteres,
        obtenerCategoria
    }
}