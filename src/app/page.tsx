import styles from "@/styles/page.module.css"
import Link from "next/link"

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h2>Tools Para Traducir</h2>

          <span className={styles.subtitle}>
            Proyecto personal
          </span>
        </div>

        <div className={styles.list}>
          <div className={styles.listTitle}>
            Menú principal
          </div>

          <Link href="/buscar">
            Buscar caracteres
          </Link>

          <Link href="/editar">
            Editar caracteres
          </Link>
        </div>
      </main>
    </div>
  )
}