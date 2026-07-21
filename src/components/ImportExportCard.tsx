"use client"

import { useDatabase } from "@/context/Database"
import styles from "@/styles/editar.module.css"
import { useRef, useState } from "react"

export default function ImportExportCard() {
    const {
        exportarDatabase,
        leerJSON,
        borrarDatabase,
        cargarDatabaseBase,
        combinarJSON
    } = useDatabase()

    const [modoImportacion, setModoImportacion] = useState<
        "importar" | "combinar"
    >("importar")

    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <section className={`${styles.card} ${styles.importExport}`}>
            <div className={styles.cardTitle}>
                Importar / Exportar
            </div>

            <div className={`${styles.cardBody} ${styles.importExportButtons}`}>
                <button
                    onClick={exportarDatabase}
                >
                    Exportar JSON
                </button>

                <button
                    onClick={() => {
                        setModoImportacion("importar")
                        inputRef.current?.click()
                    }}
                >
                    Importar JSON
                </button>

                <button
                    onClick={async () => {
                        const confirmar = confirm(
                            "La base de datos seleccionada se combinará con la actual.\n\n" +
                            "• Los caracteres nuevos se agregarán.\n" +
                            "• Las categorías y similares se unirán.\n" +
                            "• Si una categoría tiene el mismo ID, se conservará la versión del archivo importado.\n\n" +
                            "Esta acción no se puede deshacer. ¿Deseas continuar?"
                        )

                        if (!confirmar)
                            return

                        setModoImportacion("combinar")
                        inputRef.current?.click()
                    }}
                >
                    Combinar JSON
                </button>

                <input
                    ref={inputRef}
                    hidden
                    type="file"
                    accept=".json"

                    onChange={(e) => {
                        const archivo = e.target.files?.[0]
                        if (!archivo) return

                        if (modoImportacion === "importar")
                            leerJSON(archivo)
                        else
                            combinarJSON(archivo)
                        e.target.value = ""
                    }}
                />

                <button
                    className={styles.dangerButton}
                    onClick={() => {
                        if (confirm(
                            "¿Seguro que deseas borrar toda la base de datos?"
                        )) {
                            borrarDatabase()
                        }
                    }}
                >
                    Borrar base de datos
                </button>

                <button
                    onClick={async () => {
                        if (confirm(
                            "Esto reemplazará la base de datos actual."
                        )) {
                            await cargarDatabaseBase()
                        }
                    }}
                >
                    Cargar database base
                </button>
            </div>
        </section>
    )
}