import { Database, emptyDatabase } from "@/types/database";

const STORAGE_KEY = "tools-para-traducir-db"

export function cargarDatabase(): Database {
    if (typeof window === "undefined")
        return emptyDatabase

    const json = localStorage.getItem(STORAGE_KEY)

    if (!json) return emptyDatabase

    try {
        const db: unknown = JSON.parse(json)
        if (!esDatabase(db)) return emptyDatabase

        return db
    } catch {
        return emptyDatabase
    }
}

export function esDatabase(obj: unknown): obj is Database {
    if (typeof obj !== "object" || obj === null)
        return false

    const db = obj as Partial<Database>

    if (typeof db.version !== "number")
        return false

    if (!Array.isArray(db.categorias))
        return false

    if (typeof db.caracteres !== "object" || db.caracteres === null)
        return false

    for (const categoria of db.categorias) {
        if (typeof categoria !== "object" || categoria === null)
            return false

        if (typeof categoria.id !== "string" || typeof categoria.nombre !== "string")
            return false
    }

    for (const datos of Object.values(db.caracteres)) {
        if (typeof datos !== "object" || datos === null)
            return false

        if (!Array.isArray(datos.categorias))
            return false

        if (!Array.isArray(datos.similares))
            return false

        if (!datos.categorias.every(x => typeof x === "string"))
            return false

        if (!datos.similares.every(x => typeof x === "string"))
            return false
    }

    return true
}

export function guardarDatabase(database: Database) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(database)
        )
    } catch (error) {
        console.error(error)
    }
}