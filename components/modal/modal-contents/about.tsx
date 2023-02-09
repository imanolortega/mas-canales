import Logo from '@components/logo/logo'
import styles from './about.module.scss'

export default function About() {
  return (
    <div className={styles['about']}>
      <div className={styles['logo-container']}>
        <Logo isOpen={true} />
      </div>
      <p>
        &quot;Más Canales&quot; es un sitio web que reúne algunos canales de
        YouTube en vivo, de Argentina y el Mundo, con filtros de TV y Radio y la
        posibilidad de guardar tus canales favoritos.
      </p>
      <p>
        Por {` `}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/imanolrtega"
        >
          Imanol
        </a>
        .
      </p>
    </div>
  )
}
