import styles from './Loader.module.scss'

export default function Loader() {
  return (
    <div className={styles['loading']}>
      <div className={styles['dot']}></div>
      <div className={styles['dot']}></div>
      <div className={styles['dot']}></div>
    </div>
  )
}
