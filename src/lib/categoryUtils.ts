import { Category } from "@/types/database";

export function crearSlug(nombre: string): string {
    return nombre
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "")
}

export function existeCategoria(
    categorias: Category[],
    id: string
): boolean {
    return categorias.some(categoria => categoria.id === id)
}