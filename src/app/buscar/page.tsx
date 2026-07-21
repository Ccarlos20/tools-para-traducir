"use client"

import stylesHome from "@/styles/page.module.css"
import styles from "@/styles/buscar.module.css"

import TopNav from "@/components/TopNav"
import { useState } from "react"
import SearchCard from "./SearchCard"
import CharacterInfoCard from "./CharacterInfoCard"
import CharacterListCard from "./CharacterListCard"
import RecommendationCard from "./RecommendationCard"
import FilterCard from "./FilterCard"

export default function EditarPage() {
    const [caracteres, setCaracteres] = useState<string[]>([])
    const [seleccionado, setSeleccionado] = useState("")

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("")
    const [maxCategorias, setMaxCategorias] = useState<number | null>(null)

    return (
        <div className={stylesHome.page}>
            <TopNav paginaActiva="buscar" />

            <main className={stylesHome.main}>
                <div className={styles.topLayout}>
                    <SearchCard
                        onAnalizar={(lista) => {
                            setCaracteres(lista)
                            setSeleccionado(lista[0] ?? "")
                        }}
                    />

                    <FilterCard
                        categoriaSeleccionada={categoriaSeleccionada}
                        maxCategorias={maxCategorias}
                        onCategoriaSeleccionada={setCategoriaSeleccionada}
                        onMaxCategorias={setMaxCategorias}
                    />
                </div>

                <div className={styles.bottomLayout}>
                    <CharacterListCard
                        caracteres={caracteres}
                        caracterSeleccionado={seleccionado}
                        onSeleccionar={setSeleccionado}
                    />

                    <CharacterInfoCard
                        caracter={seleccionado}
                        onSeleccionarCategoria={setCategoriaSeleccionada}
                    />

                    <RecommendationCard
                        caracterSeleccionado={seleccionado}
                        categoriaSeleccionada={categoriaSeleccionada}
                        maxCategorias={maxCategorias}
                        onSeleccionar={setSeleccionado}
                    />
                </div>
            </main>
        </div>
    )
}