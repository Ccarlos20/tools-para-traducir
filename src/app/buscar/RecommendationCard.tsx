"use client"

import { useDatabase } from "@/context/Database"
import styles from "@/styles/buscar.module.css"

interface RecommendationCardProps {
    caracterSeleccionado: string
    categoriaSeleccionada: string
    maxCategorias: number | null
    onSeleccionar: (caracter: string) => void
}

export default function RecommendationCard({
    caracterSeleccionado,
    categoriaSeleccionada,
    maxCategorias,
    onSeleccionar
}: RecommendationCardProps) {
    const {
        obtenerSimilares,
        obtenerRelacionados,
        obtenerCaracteresCategoria,
        obtenerCaracteresConMaxCategorias
    } = useDatabase()

    const similares = caracterSeleccionado
        ? obtenerSimilares(caracterSeleccionado)
        : []

    const relacionados = caracterSeleccionado
        ? obtenerRelacionados(caracterSeleccionado)
        : []

    const filtrados = categoriaSeleccionada !== ""
        ? obtenerCaracteresCategoria(categoriaSeleccionada)
        : maxCategorias !== null
            ? obtenerCaracteresConMaxCategorias(maxCategorias)
            : []

    return (
        <section className={styles.card}>
            <div className={styles.cardTitle}>
                Recomendaciones
            </div>

            <div className={styles.cardBody}>
                <h4>Similares</h4>
                <div className={styles.resultadosScrollable}>
                    {similares.map(similar => (
                        <button
                            className={styles.character}
                            key={similar.caracter}
                            onClick={() => onSeleccionar(similar.caracter)}
                        >
                            {similar.caracter}
                        </button>
                    ))}
                </div>

                <h4>Misma categoría</h4>
                <div className={styles.resultadosScrollable}>
                    {relacionados.map(caracter => (
                        <button
                            className={styles.character}
                            key={caracter.caracter}
                            onClick={() => onSeleccionar(caracter.caracter)}
                        >
                            {caracter.caracter}
                        </button>
                    ))}
                </div>

                <h4>Filtro</h4>
                <div className={styles.resultadosScrollable}>
                    {filtrados.map(caracter => (
                        <button
                            className={styles.character}
                            key={caracter.caracter}
                            onClick={() => onSeleccionar(caracter.caracter)}
                        >
                            {caracter.caracter}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}