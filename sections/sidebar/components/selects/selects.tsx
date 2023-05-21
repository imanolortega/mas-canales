import { ALL, RADIO, TV } from '@utils/config'
import { SelectsProps } from '@utils/types'

import Button from '@components/buttons/button'
import styles from './selects.module.scss'

export default function Selects({
  isOpen,
  selectedType,
  setSelectedType,
}: SelectsProps) {
  const buttons = [
    {
      title: 'Canales de TV',
      value: TV,
    },
    {
      title: 'Canales de Radio',
      value: RADIO,
    },
    {
      title: 'Todos los Canales',
      value: ALL,
    },
  ]

  return (
    <div
      className={`${styles['selects-container-inner']} ${
        !isOpen && styles['closed']
      }`}
    >
      {buttons.map((button) => (
        <Button
          key={button.value}
          className={`${styles['button']} ${
            selectedType === button.value ? styles['active'] : ''
          }`}
          onHandleClick={() => setSelectedType(button.value)}
          title={button.title}
        >
          {button.value}
        </Button>
      ))}
    </div>
  )
}
