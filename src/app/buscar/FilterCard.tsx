"use client"

import { useDatabase } from "@/context/Database"
import styles from "@/styles/buscar.module.css"

interface FilterCardProps {
    categoriaSeleccionada: string
    maxCategorias: number | null
    onCategoriaSeleccionada: (categoria: string) => void
    onMaxCategorias: (cantidad: number | null) => void
}

export default function FilterCard({
    categoriaSeleccionada,
    maxCategorias,
    onCategoriaSeleccionada,
    onMaxCategorias
}: FilterCardProps) {
    const { database } = useDatabase()

    return (
        <section className={styles.card}>
            <div className={styles.cardTitle}>
                Filtros
            </div>

            <div className={styles.cardBody}>
                <div className={styles.filterGroup}>
                    <label htmlFor="categoria">
                        Categoría
                    </label>

                    <select
                        id="categoria"
                        value={categoriaSeleccionada}
                        onChange={(e) => {
                            onCategoriaSeleccionada(
                                e.target.value
                            )

                            onMaxCategorias(null)
                        }}
                    >
                        <option value="">
                            Ninguna
                        </option>
                        {database.categorias.map(categoria => (
                            <option
                                key={categoria.id}
                                value={categoria.id}
                            >
                                {categoria.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="maxCategorias">
                        Máximo categorías
                    </label>

                    <input
                        id="maxCategorias"
                        type="number"
                        min={0}
                        value={maxCategorias ?? ""}
                        onChange={(e) => {
                            const valor = e.target.value
                            onCategoriaSeleccionada("")
                            onMaxCategorias(
                                valor === ""
                                    ? null
                                    : Number(valor)
                            )
                        }}
                    />
                </div>
            </div>
        </section>
    )
}