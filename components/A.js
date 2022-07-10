import Link from 'next/link'
import styles from '../styles/A.module.css'

function A({text, href}) {
  return (
    <Link href={href}>
        <a className={styles.link}>{text}</a>
    </Link>
  )
}

export default A