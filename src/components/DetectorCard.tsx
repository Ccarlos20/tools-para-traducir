"use client"

import { useState } from "react"

import styles from "@/styles/editar.module.css"

import { useDatabase } from "@/context/Database"
import { esCaracterJapones } from "@/lib/characterUtils"

interface DetectorCardProps {
    onSeleccionar: (caracter: string) => void
}

export default function DetectorCard({
    onSeleccionar
}: DetectorCardProps) {
    const { database, agregarCaracter } = useDatabase()
    const [texto, setTexto] = useState("")

    const [caracteres, setCaracteres] = useState<string[]>([])

    function obtenerCaracteres(texto: string): string[] {
        return [...new Set([...texto])]
            .filter(esCaracterJapones)
    }

    return (
        <section className={styles.card}>
            <div className={styles.cardTitle}>
                Detectar caracteres
            </div>

            <div className={styles.cardBody}>
                <div className={styles.formGroup}>

                    <label htmlFor="texto">
                        Texto
                    </label>

                    <textarea
                        id="texto"
                        value={texto}
                        onChange={(e) =>
                            setTexto(e.target.value)
                        }
                        placeholder="Pega aquí un texto japonés..."
                    />

                </div>

                <button
                    onClick={() =>
                        setCaracteres(
                            obtenerCaracteres(texto)
                        )
                    }
                >
                    Analizar
                </button>

                <div className={styles.resultados}>
                    {caracteres.map((caracter) => {
                        const existe = caracter in database.caracteres

                        return (
                            <div
                                key={caracter}
                                className={styles.row}
                            >
                                <span>{caracter}</span>

                                <button
                                    className={
                                        existe
                                            ? styles.warningButton
                                            : styles.primaryButton
                                    }
                                    onClick={() => {
                                        if (!existe)
                                            agregarCaracter(caracter)

                                        onSeleccionar(caracter)
                                    }}
                                >
                                    {
                                        existe
                                            ? "Editar"
                                            : "Agregar"
                                    }
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}