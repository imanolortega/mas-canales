import Button from '@components/buttons/button';
import styles from './selects.module.scss';
import { Dispatch, SetStateAction } from "react";

interface Selects {
  isOpen: boolean;
  selectedType: string;
  setSelectedType: Dispatch<SetStateAction<string>>;
}
export default function Selects({
  isOpen,
  selectedType,
  setSelectedType,
}: Selects) {
  const buttons = [
    {
      title: 'Canales de TV',
      value: 'TV',
    },
    {
      title: 'Canales de Radio',
      value: 'Radio',
    },
    {
      title: 'Todos los Canales',
      value: 'Todos',
    },
  ]

  return (
    <div className={`${styles['selects-container-inner']} ${!isOpen && styles['closed']}`}>
      {
        buttons.map((button) => (
          <Button
            key={button.value}
            className={`${styles['button']} ${selectedType === button.value ? styles['active'] : ''}`}
            onHandleClick={() => setSelectedType(button.value)}
            title={button.title}
          >
            {button.value}
          </Button>
        ))
      }
    </div>
  );
}
