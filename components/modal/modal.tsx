import Button from '@components/buttons/button'
import CloseIcon from '@components/icons/close'
import { MouseEvent } from 'react'
import styles from './Modal.module.scss'
import { ModalProps } from '@utils/types'

export default function Modal({
  className,
  children,
  closeModal,
  title,
}: ModalProps) {
  const handleInnerClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div
      className={`${styles['modal']} ${className}`}
      onClick={() => closeModal()}
    >
      <div
        className={`${styles['modal-content']} ${styles['modal-about']}`}
        onClick={(e) => handleInnerClick(e)}
      >
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
