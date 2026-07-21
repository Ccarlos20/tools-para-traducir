"use client"

import styles from "@/styles/editar.module.css"

import { useState } from "react"
import { useDatabase } from "@/context/Database"

export default function CategoryManagerCard() {
    const {
        database,
        agregarCategoria,
        editarCategoria,
        eliminarCategoria,
        contarCaracteres
    } = useDatabase()

    const [nombre, setNombre] = useState("")

    const [editando, setEditando] = useState<string | null>(null)
    const [nombreEditar, setNombreEditar] = useState("")

    return (
        <section className={styles.card}>
            <div className={styles.cardTitle}>
                Categorías
            </div>

            <div className={styles.cardBody}>
                <div className={styles.formGroup}>
                    <label>Nombre</label>
                    <div className={styles.inlineForm}>
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />

                        <button
                            onClick={() => {
                                if (agregarCategoria(nombre)) {
                                    setNombre("")
                                }
                            }}
                        >
                            Agregar
                        </button>
                    </div>

                </div>


                <div className={styles.resultados}>
                    {database.categorias.map((categoria) => (
                        <div
                            key={categoria.id}
                            className={styles.row}
                        >
                            {editando === categoria.id ? (
                                <div className={styles.categoryRow}>
                                    <input
                                        value={nombreEditar}
                                        onChange={(e) => setNombreEditar(e.target.value)}
                                    />

                                    <div className={styles.categoryButtons}>
                                        <button
                                            className={styles.primaryButton}
                                            onClick={() => {
                                                if (editarCategoria(
                                                    categoria.id,
                                                    nombreEditar
                                                )) {
                                                    setEditando(null)
                                                }
                                            }}
                                        >
                                            Guardar
                                        </button>

                                        <button
                                            onClick={() => setEditando(null)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.categoryRow}>
                                    <div className={styles.categoryInfo}>
                                        <strong>{categoria.nombre}</strong>
                                        <small>{categoria.id}</small>
                                        <small>{contarCaracteres(categoria.id)} caracteres</small>
                                    </div>

                                    <div className={styles.categoryButtons}>
                                        <button
                                            onClick={() => {
                                                setEditando(categoria.id)
                                                setNombreEditar(categoria.nombre)
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className={styles.dangerButton}
                                            onClick={() => eliminarCategoria(categoria.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}