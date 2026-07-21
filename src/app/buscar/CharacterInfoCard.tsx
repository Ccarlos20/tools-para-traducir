"use client"

import styles from "@/styles/buscar.module.css"

import { useDatabase } from "@/context/Database"

interface CharacterInfoCardProps {
    caracter: string,
    onSeleccionarCategoria: (categoria: string) => void
}

export default function CharacterInfoCard({
    caracter,
    onSeleccionarCategoria
}: CharacterInfoCardProps) {
    const {
        obtenerCaracter,
        obtenerCategoria
    } = useDatabase()

    if (caracter === "") return null

    const datos = obtenerCaracter(caracter)

    if (!datos)
        return (
            <section className={styles.card}>
                <div className={styles.cardTitle}>
                    Información
                </div>

                <div className={styles.cardBody}>
                    El carácter no existe en la base.
                </div>
            </section>
        )

    return (
        <section className={styles.card}>
            <div className={styles.cardTitle}>
                {caracter}
            </div>

            <div className={styles.cardBody}>
                <h4>Categorías</h4>
                <div className={styles.categoryList}>
                    {datos.categorias.map(categoria => (
                        <button
                            key={categoria}
                            className={styles.categoryButton}
                            onClick={() => onSeleccionarCategoria(categoria)}
                        >
                            {obtenerCategoria(categoria)?.nombre ?? categoria}
                        </button>
                    ))}
                </div>

                <h4>Similares</h4>
                <ul className={styles.similarList}>
                    {datos.similares.map(similar => (
                        <li key={similar}>
                            {similar}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}