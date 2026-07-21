"use client"

import styles from "@/styles/buscar.module.css"

interface CharacterListCardProps {
    caracteres: string[]
    caracterSeleccionado: string
    onSeleccionar: (caracter: string) => void
}

export default function CharacterListCard({
    caracteres,
    caracterSeleccionado,
    onSeleccionar
}: CharacterListCardProps) {
    return (
        <section className={styles.card}>
            <div className={styles.cardTitle}>
                Caracteres detectados
            </div>

            <div className={`${styles.resultados} ${styles.characterList }`}>
                {caracteres.map(caracter => (
                    <button
                        key={caracter}
                        className={`${styles.character}
                            ${
                            caracter === caracterSeleccionado
                                ? styles.selected
                                : ""
                        }`}
                        onClick={() => onSeleccionar(caracter)}
                    >
                        {caracter}
                    </button>
                ))}
            </div>
        </section>
    )
}