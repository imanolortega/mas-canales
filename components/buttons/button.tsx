import { ButtonProps } from '@utils/types'
import styles from './Button.module.scss'

export default function Button({
  children,
  className,
  onHandleClick,
  title,
}: ButtonProps) {
  return (
    <button
      title={title}
      className={`${styles['button']} ${className || ''}`}
      onClick={onHandleClick}
    >
      {children}
    </button>
  )
}

//To-do: Add styles and types...
