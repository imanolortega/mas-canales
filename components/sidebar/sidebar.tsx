import { useMemo, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import styles from './Sidebar.module.scss';

import ArrowLeft from '@components/icons/arrow-left';
import ButtonList from '@components/button-list/button-list';
import Logo from '@components/logo/logo';
import SearchIcon from '@components/icons/search';
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
  /* A hook that is used to toggle the sidebar. 🎚️ */
  const [isOpen, setOpen] = useState(true);
  const toggle = () => {
    setOpen(!isOpen);
  };
  /* A hook that is used to filter the channels. 🔍 */
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChannels = useMemo(() => {
    return searchTerm
      ? channels.filter(channel =>
          channel.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : channels;
  }, [searchTerm, channels]);

  return (
    <aside className={`${styles['sidebar']} ${className || ''}`}>
      <div className={styles['logo-container']}>
        <Logo isOpen={isOpen} />
      </div>
      <div
        className={`${styles['search-container']} ${styles[`${isOpen ? 'open' : ''}`]}`}
      >
        <input
          type="text"
          placeholder="Buscar canal"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <SearchIcon />
      </div>
      <div className={`${styles['search-btn-container']} ${styles[`${isOpen ? 'open' : ''}`]}`}>
        {!isOpen && (
          <button title="Search Button" className={`${styles['search-btn']}`} onClick={toggle}>
            <SearchIcon height={22} width={22} />
          </button>
        )}
      </div>
      <div className={`${styles['content']} ${styles[`${isOpen ? 'open' : 'closed'}`]}`}>
        <div className={`${styles['button-list']} ${styles[`${isOpen ? 'open' : ''}`]} ${styles[`${searchTerm.length > 0 ? 'searching' : ''}`]}`}>
          <ButtonList
            channels={filteredChannels}
            channelSelected={channelSelected}
            onHandleChannel={onHandleChannel}
          />
        </div>
      </div>
      <div className={styles['arrow-btn-container']}>
        <button title="Arrow Button"  className={`${styles['btn']} ${isOpen ? styles['open'] : styles['closed']}`} onClick={toggle}>
           <ArrowLeft />
        </button>
      </div>
    </aside>
  );
}
