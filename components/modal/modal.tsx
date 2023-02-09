import { Dispatch, SetStateAction } from 'react'
import Button from '@components/buttons/button'
import CloseIcon from '@components/icons/close'
import styles from './modal.module.scss'

interface Modal {
  children: React.ReactNode
  title?: string
  toggle: Dispatch<SetStateAction<boolean>>
}

export default function Modal({ children, title, toggle }: Modal) {
  return (
    <div className={styles['modal']}>
      <div className={styles['modal-content']}>
        <div className={styles['modal-header']}>
          <Button
            className={styles['close-btn']}
            onHandleClick={() => toggle(false)}
            title="Cerrar modal"
          >
            <CloseIcon />
          </Button>
        </div>
        <div className={styles['modal-body']}>
          <div className={styles['close-btn-container']}>
            {/* <button className="close-btn" @click="toggleModal">
            <CloseIcon />
          </button> */}
          </div>
          {title && <h3>{title}</h3>}
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
