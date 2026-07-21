"use client"

import { esCaracterJapones } from "@/lib/characterUtils"
import { useState } from "react"
import styles from "@/styles/buscar.module.css"

interface SearchCardProps {
    onAnalizar: (caracteres: string[]) => void
}

export default function SearchCard({ onAnalizar }: SearchCardProps) {
    const [texto, setTexto] = useState("")

    function analizar() {
        const caracteres = [...new Set([...texto])]
            .filter(esCaracterJapones)

        onAnalizar(caracteres)
    }

    return (
        <section className={styles.card}>
            <div className={styles.cardTitle}>
                Analizar texto
            </div>

            <div className={styles.cardBody}>
                <textarea
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />

                <button onClick={analizar}>
                    Analizar
                </button>
            </div>
        </section>
    )
}