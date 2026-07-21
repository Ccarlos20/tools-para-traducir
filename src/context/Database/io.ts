import { combinarDatabase } from "@/lib/mergeDatabase"
import { esDatabase } from "@/lib/storage"
import { Database, emptyDatabase } from "@/types/database"

export function crearIOActions(
    database: Database,
    setDatabase: React.Dispatch<React.SetStateAction<Database>>
) {
    function importarDatabase(nuevaDatabase: Database) {
        setDatabase(nuevaDatabase)
    }

    function exportarDatabase() {
        descargarJSON(JSON.stringify(database, null, 4))
    }

    function descargarJSON(contenido: string) {
        const blob = new Blob(
            [contenido],
            { type: "application/json" }
        )
        const url = URL.createObjectURL(blob)
        const enlace = document.createElement("a")

        enlace.href = url
        enlace.download = "database.json"
        enlace.click()

        URL.revokeObjectURL(url)
    }

    function leerJSON(archivo: File) {
        const reader = new FileReader()

        reader.onload = () => {
            if (!reader.result) return

            try {
                const db: unknown = JSON.parse(
                    reader.result as string
                )

                if (!esDatabase(db)) throw new Error()

                importarDatabase(db)
            } catch {
                alert("JSON inválido.")
            }
        }

        reader.readAsText(archivo)
    }

    function borrarDatabase() {
        setDatabase(emptyDatabase)
    }

    async function cargarDatabaseBase() {
        const response = await fetch("/database.json")
        if (!response.ok) throw new Error()

        const db: unknown = await response.json()
        if (!esDatabase(db)) throw new Error()

        importarDatabase(db)
    }

    function combinarJSON(archivo: File) {
        const reader = new FileReader()

        reader.onload = () => {
            if (!reader.result) return

            try {
                const db: unknown = JSON.parse(
                    reader.result as string
                )

                if (!esDatabase(db)) throw new Error()

                combinarConDatabase(db)
            } catch {
                alert("JSON inválido.")
            }
        }

        reader.readAsText(archivo)
    }

    function combinarConDatabase(nueva: Database) {
        setDatabase(actual => combinarDatabase(actual, nueva))
    }

    return {
        importarDatabase,
        exportarDatabase,
        descargarJSON,
        leerJSON,
        borrarDatabase,
        cargarDatabaseBase,
        combinarJSON
    }
}