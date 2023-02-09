import styles from './Button.module.scss'

interface Button {
  className?: string
  children: React.ReactNode
  onHandleClick: () => void
  title: string
}

export default function Button({
  children,
  className,
  onHandleClick,
  title,
}: Button) {
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
