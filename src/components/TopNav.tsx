import styles from "@/styles/nav.module.css"
import Link from "next/link"

interface TopNavProps {
    paginaActiva: string
}

export default function TopNav({ paginaActiva }: TopNavProps) {
    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.navTitle}>
                Tools Para Traducir
            </Link>

            <ul className={styles.navList}>
                <li>
                    <Link
                        href="/buscar"
                        className={paginaActiva === "buscar" ? styles.active : ""}
                    >
                        Buscar caracteres
                    </Link>
                </li>

                <li>
                    <Link
                        href="/editar"
                        className={paginaActiva === "editar" ? styles.active : ""}
                    >
                        Editar caracteres
                    </Link>
                </li>
            </ul>
        </nav>
    )
}