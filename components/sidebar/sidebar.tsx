import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import styles from './Sidebar.module.scss';

import ButtonList from '../button-list/button-list';

export interface Sidebar {
  className?: string;
  channels: Array<{
    id: string;
    name: string;
  }>;
  channelSelected: {
    id: string;
    name: string;
  }
  onHandleChannel: Dispatch<SetStateAction<{ id: string; name: string; }>>;
}

export default function Sidebar({
  className,
  channels,
  channelSelected,
  onHandleChannel }: Sidebar) {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  }
  return (
    <div className={className}>
      <button onClick={toggle}>
        <button>{isOpen ? 'ArrowUp' : 'ArrowDown'}</button>
      </button>
      <aside className={`${styles['sidebar']} ${styles[`${!isOpen && 'closed'}`]}`}>
        <h3 className={styles['title']}>Canales</h3>
          <ButtonList
            channels={channels}
            channelSelected={channelSelected}
            onHandleChannel={onHandleChannel}
          />
      </aside>
    </div>
  );
}
