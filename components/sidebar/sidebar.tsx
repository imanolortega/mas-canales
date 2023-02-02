import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import styles from './Sidebar.module.scss';

import ArrowLeft from '@components/icons/arrow-left';
import ButtonList from '@components/button-list/button-list';
import Logo from '@components/logo/logo';
interface Sidebar {
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
  const [isOpen, setOpen] = useState(true);
  const toggle = () => {
    setOpen(!isOpen);
  }
  return (
    <aside className={`${styles['sidebar']} ${className}`}>
      <div className={styles['logo-container']}>
        <Logo isOpen={isOpen} />
      </div>
      <div
        className={`${styles['content']} ${styles[`${isOpen ? 'open' : 'closed'}`]}`}>
        <div className={`${styles['button-list']} ${styles[`${isOpen ? 'open' : 'closed'}`]}`}>
          <ButtonList
            channels={channels}
            channelSelected={channelSelected}
            onHandleChannel={onHandleChannel}
          />
        </div>
      </div>
      <div>
        <button title="Arrow Button"  className={`${styles['btn']} ${!isOpen ? styles['rotate'] : ''}`} onClick={toggle}>
           <ArrowLeft />
        </button>
      </div>
    </aside>
  );
}
