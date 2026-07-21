"use client"

import styles from "@/styles/editar.module.css"
import { Category } from "@/types/database"

interface CategorySelectorProps {
    categoriasDisponibles: Category[]
    categoriasSeleccionadas: string[]
    cambiarCategoria: (categoria: string) => void
}

export default function CategorySelector({
    categoriasDisponibles,
    categoriasSeleccionadas,
    cambiarCategoria
}: CategorySelectorProps) {
    return (
        <div className={styles.categoryList}>
            {categoriasDisponibles.map((categoria) => (
                <label
                    key={categoria.id}
                    className={styles.categoryItem}
                >
                    <input
                        type="checkbox"
                        checked={
                            categoriasSeleccionadas.includes(categoria.id)
                        }
                        onChange={() => cambiarCategoria(categoria.id)}
                    />

                    <span>{categoria.nombre}</span>
                </label>
            ))}
        </div>
    )
}