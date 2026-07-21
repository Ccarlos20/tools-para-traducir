"use client"

import { useState } from "react"

import stylesHome from "@/styles/page.module.css"
import styles from "@/styles/editar.module.css"

import TopNav from "@/components/TopNav"
import DetectorCard from "@/components/DetectorCard"
import CharacterEditorCard from "@/components/CharacterEditorCard"
import CategoryManagerCard from "@/components/CategoryManagerCard"
import ImportExportCard from "@/components/ImportExportCard"

export default function EditarPage() {
    const [caracterSeleccionado, setCaracterSeleccionado] =
        useState("")

    return (
        <div className={stylesHome.page}>
            <TopNav paginaActiva="editar" />

            <main className={stylesHome.main}>
                <ImportExportCard />

                <div className={styles.editorLayout}>
                    <CategoryManagerCard />

                    <DetectorCard onSeleccionar={setCaracterSeleccionado} />

                    <CharacterEditorCard
                        caracterSeleccionado={caracterSeleccionado}
                        onSeleccionar={setCaracterSeleccionado}
                    />
                </div>
            </main>
        </div>
    )
}