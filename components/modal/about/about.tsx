import Logo from '@components/logo/logo'
import styles from './About.module.scss'

export default function About() {
  return (
    <div className={styles['about']}>
      <div className={styles['logo-container']}>
        <Logo isOpen={true} />
      </div>
      <p>
        &quot;Más Canales&quot; es un sitio web que reúne canales de YouTube en
        vivo, de Argentina y el Mundo, con filtros de TV y Radio y la
        posibilidad de guardar tus canales favoritos.
      </p>
      <p>
        Por {` `}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://imanolortega.dev/"
        >
          Imanol
        </a>
        . Si querés enviarme algún comentario o sugerencia, podés hacerlo a{' '}
        {` `}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="mailto:imanolotega.dev@gmail.com"
        >
          imanolotega.dev@gmail.com
        </a>
      </p>
    </div>
  )
}
