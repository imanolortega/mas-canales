import Button from '@components/buttons/button'
import CloseIcon from '@components/icons/close'
import styles from './Modal.module.scss'

interface Modal {
  className?: string
  children: React.ReactNode
  closeModal: () => void
  title?: string
}

export default function Modal({
  className,
  children,
  closeModal,
  title,
}: Modal) {
  return (
    <div className={`${styles['modal']} ${className}`}>
      <div className={styles['modal-content']}>
        <div className={styles['modal-header']}>
          <Button
            className={styles['close-btn']}
            onHandleClick={() => closeModal()}
            title="Cerrar modal"
          >
            <CloseIcon />
          </Button>
        </div>
        <div className={styles['modal-body']}>
          {title && <h3>{title}</h3>}
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
