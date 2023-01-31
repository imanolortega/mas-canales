import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import styles from './Sidebar.module.scss';

import ArrowLeft from 'components/icons/arrow-left';
import ArrowRight from 'components/icons/arrow-right';
import ButtonList from 'components/button-list/button-list';
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
    <div className={`${styles['sidebar']} ${className}`}>
      <aside className={`${styles['content']} ${styles[`${!isOpen && 'closed'}`]}`}>
        {
          isOpen && (
            <>
              <h3 className={styles['title']}>Canales</h3>
              <ButtonList
                channels={channels}
                channelSelected={channelSelected}
                onHandleChannel={onHandleChannel}
              />
            </>
          )
        }
      </aside>
      <button className={styles['btn']} onClick={toggle}>
        {isOpen ? <ArrowLeft /> : <ArrowRight />}
      </button>
    </div>
  );
}
