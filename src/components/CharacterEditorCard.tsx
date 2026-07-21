"use client"

import styles from "@/styles/editar.module.css"

import { useDatabase } from "@/context/Database"

import CategorySelector from "./CategorySelector"
import { useState } from "react"

interface CharacterEditorCardProps {
    caracterSeleccionado: string
    onSeleccionar: (caracter: string) => void
}

export default function CharacterEditorCard({
    caracterSeleccionado,
    onSeleccionar
}: CharacterEditorCardProps) {
    const {
        database,
        cambiarCategoria,
        agregarSimilar,
        eliminarSimilar
    } = useDatabase()

    const datosCaracter = database.caracteres[caracterSeleccionado] ?? {
        categorias: [],
        similares: []
    }

    const [nuevoSimilar, setNuevoSimilar] = useState("")

    return (
        <section className={styles.card}>
            <div className={styles.cardTitle}>
                Caracteres
            </div>

            <div className={styles.cardBody}>
                {caracterSeleccionado === ""
                    ? (
                        <span>
                            Selecciona un carácter.
                        </span>
                    )
                    : (
                        <>
                            <div className={styles.formGroup}>
                                <label>
                                    Carácter
                                </label>

                                <div
                                    className={
                                        styles.characterPreview
                                    }
                                >
                                    {caracterSeleccionado}
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>
                                    Categorías
                                </label>

                                <CategorySelector
                                    categoriasDisponibles={
                                        database.categorias
                                    }
                                    categoriasSeleccionadas={
                                        datosCaracter.categorias
                                    }
                                    cambiarCategoria={(id) => cambiarCategoria(
                                        caracterSeleccionado,
                                        id
                                    )}
                                />
                            </div>



                            <div className={styles.formGroup}>
                                <label>Similares</label>

                                <div className={styles.detectorResultados}>
                                    {datosCaracter.similares.map(similar => (
                                        <div
                                            key={similar}
                                            className={styles.row}
                                        >
                                            <button
                                                className={styles.characterButton}
                                                onClick={() => onSeleccionar(similar)}
                                            >

                                                {similar}
                                            </button>

                                            <button
                                                className={styles.dangerButton}
                                                onClick={() => eliminarSimilar(
                                                    caracterSeleccionado,
                                                    similar
                                                )}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.row}>
                                    <input
                                        value={nuevoSimilar}
                                        onChange={(e) => {
                                            setNuevoSimilar(e.target.value)
                                        }}
                                        maxLength={1}
                                    />

                                    <button
                                        onClick={() => {
                                            agregarSimilar(
                                                caracterSeleccionado,
                                                nuevoSimilar
                                            )

                                            setNuevoSimilar("")
                                        }}
                                    >
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
            </div>
        </section>
    )
}