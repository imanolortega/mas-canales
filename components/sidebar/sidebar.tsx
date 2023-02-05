import { useEffect, useMemo, useRef, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import styles from './Sidebar.module.scss';

import ArrowLeft from '@components/icons/arrow-left';
import ButtonList from '@components/button-list/button-list';
import Logo from '@components/logo/logo';
import SearchIcon from '@components/icons/search';
import Button from '@components/buttons/button';

interface Sidebar {
  className?: string;
  channels: Array<{
    id: string;
    name: string;
    type: string;
  }>;
  channelSelected: {
    id: string;
    name: string;
    type: string;
  }
  onHandleChannel: Dispatch<SetStateAction<{
    id: string;
    name: string;
    type: string; }>>;
}

export default function Sidebar({
  className,
  channels,
  channelSelected,
  onHandleChannel }: Sidebar) {
  /* A hook that is used to focus the input. */
  const [isSearchOpen, setIsSearchOpen] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen > 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  /* A hook that is used to toggle the sidebar. 🎚️ */
  const [isOpen, setOpen] = useState(true);
  const toggle = (type: string) => {
    if (type === 'open') {
      setOpen(!isOpen);
    } else if (type === 'search') {
      setIsSearchOpen(prevCount => prevCount + 1);
      setOpen(true);
    }
  };

  /* A hook that is used to filter the channels. 🔍 */
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredChannels = useMemo(() => {
    let filtered = channels;
    if (selectedType !== 'all') {
      filtered = channels.filter(channel => channel.type === selectedType);
    }
    return searchTerm
      ? filtered.filter(channel =>
        channel.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : filtered;
  }, [searchTerm, channels, selectedType]);

  return (
    <aside className={`${styles['sidebar']} ${className || ''}`}>
      <div className={styles['logo-container']}>
        <Logo isOpen={isOpen} />
      </div>
      <div>
        <form
          className={`${styles['search-container']} ${styles[`${isOpen ? 'open' : ''}`]}`}
        >
          <input
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar canal"
            ref={inputRef}
            type="text"
            value={searchTerm}
          />
          <SearchIcon />
        </form>
        <div className={`${styles['search-btn-container']} ${styles[`${isOpen ? 'open' : ''}`]}`}>
          {!isOpen && (
            <Button
              className={`${styles['search-btn']}`}
              onHandleClick={() => toggle('search')}
              title="Search Button"
            >
              <SearchIcon height={22} width={22} />
            </Button>
          )}
        </div>
      </div>
      <div>
        <div className={`${styles['selects-container']} ${!isOpen && styles['closed']}`}>
          <Button
            className={`${styles['button']} ${selectedType === 'TV' ? styles['active'] : ''}`}
            onHandleClick={() => setSelectedType('TV')}
            title="Canales de TV"
          >
            TV
          </Button>
          <Button
            className={`${styles['button']} ${selectedType === 'Radio' ? styles['active'] : ''}`}
            onHandleClick={() => setSelectedType('Radio')}
            title="Canales de Radio"
          >
            Radio
          </Button>
          <Button
            className={`${styles['button']} ${selectedType === 'all' ? styles['active'] : ''}`}
            onHandleClick={() => setSelectedType('all')}
            title="Todos los Canales"
          >
            Todos
          </Button>
        </div>
      </div>
      <div className={`${styles['content']} ${styles[`${isOpen ? 'open' : 'closed'}`]}`}>
        <div className={`${styles['button-list']} ${styles[`${isOpen ? 'open' : ''}`]} ${styles[`${searchTerm.length > 0 || filteredChannels.length < 10 ? 'searching' : ''}`]}`}>
          <ButtonList
            channels={filteredChannels}
            channelSelected={channelSelected}
            onHandleChannel={onHandleChannel}
          />
        </div>
      </div>
      <div className={styles['arrow-btn-container']}>
        <Button
          className={`${styles['btn']} ${isOpen ? styles['open'] : styles['closed']}`}
          onHandleClick={() => toggle('open')}
          title={`${isOpen ? 'Open' : 'Close'}`}
        >
          <ArrowLeft />
        </Button>
      </div>
    </aside>
  );
}
