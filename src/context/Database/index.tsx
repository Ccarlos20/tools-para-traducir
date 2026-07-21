"use client"

import { createContext, useContext, useEffect, useState } from "react"

import {
    Category,
    Database,
    emptyDatabase,
    CharacterInfo,
    CharacterRecommendation
} from "@/types/database"

import { crearCharactersActions } from "./characters"
import { crearCategoriesActions } from "./categories"
import { crearIOActions } from "./io"
import { cargarDatabase, guardarDatabase } from "@/lib/storage"
import { crearQueries } from "./queries"

interface DatabaseContextType {
    database: Database

    agregarCaracter: (caracter: string) => void
    cambiarCategoria: (
        caracter: string,
        categoria: string
    ) => void
    agregarSimilar: (
        caracter: string,
        similar: string
    ) => void
    eliminarSimilar: (
        caracter: string,
        similar: string
    ) => void

    agregarCategoria: (nombre: string) => boolean
    editarCategoria: (
        id: string,
        nombre: string
    ) => boolean
    eliminarCategoria: (id: string) => boolean
    contarCaracteres: (id: string) => number
    obtenerCategoria: (id: string) => Category | undefined

    importarDatabase: (database: Database) => void
    exportarDatabase: () => void
    leerJSON: (archivo: File) => void

    obtenerCaracter: (caracter: string) => CharacterInfo | undefined
    obtenerCaracteres: () => CharacterInfo[]
    obtenerCaracteresCategoria: (categoria: string) => CharacterInfo[]
    obtenerSimilares: (caracter: string) => CharacterInfo[]
    obtenerRelacionados: (caracter: string) => CharacterRecommendation[]
    obtenerCaracteresConMaxCategorias: (maximo: number) => CharacterInfo[]

    borrarDatabase: () => void
    cargarDatabaseBase: () => void
    combinarJSON: (archivo: File) => void
}

const DatabaseContext = createContext<DatabaseContextType | null>(null)

export function DatabaseProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [database, setDatabase] = useState(emptyDatabase)
    const [cargado, setCargado] = useState(false)

    useEffect(() => {
        setDatabase(cargarDatabase())
        setCargado(true)
    }, [])

    useEffect(() => {
        if (!cargado)
            return

        guardarDatabase(database)
    }, [database, cargado])

    const characters = crearCharactersActions(
        database,
        setDatabase
    )
    const categories = crearCategoriesActions(
        database,
        setDatabase
    )
    const io = crearIOActions(database, setDatabase)
    const queries = crearQueries(database)

    return (
        <DatabaseContext.Provider
            value={{
                database,
                ...characters,
                ...categories,
                ...io,
                ...queries
            }}
        >
            {children}
        </DatabaseContext.Provider>
    )
}

export function useDatabase() {
    const context = useContext(DatabaseContext)

    if (!context)
        throw new Error("DatabaseProvider no encontrado.")

    return context
}