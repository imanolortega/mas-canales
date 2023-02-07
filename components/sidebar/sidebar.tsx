import { Channel } from '@utils/types';
import { Dispatch, SetStateAction } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './Sidebar.module.scss';

import ArrowLeft from '@components/icons/arrow-left';
import Button from '@components/buttons/button';
import ButtonList from '@components/button-list/button-list';
import CloseIcon from '@components/icons/close';
import Logo from '@components/logo/logo';
import SearchIcon from '@components/icons/search';
interface Sidebar {
  className?: string;
  channels: Array<Channel>;
  channelSelected: Channel;
  onHandleChannel: Dispatch<SetStateAction<Channel>>;
}

export default function Sidebar({
  className,
  channels,
  channelSelected,
  onHandleChannel }: Sidebar) {
  /* Focus the input. */
  const [isSearchOpen, setIsSearchOpen] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen > 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  /* Toggle the sidebar. 🎚️ */
  const [isOpen, setOpen] = useState(true);
  const toggle = (type: string) => {
    if (type === 'open') {
      setOpen(!isOpen);
    } else if (type === 'search') {
      setIsSearchOpen(prevCount => prevCount + 1);
      setOpen(true);
    }
  };

  /* Filter the channels. 🔍 */
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredChannels = useMemo(() => {
    return searchTerm
      ? channels.filter(channel =>
        channel.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : channels;
  }, [searchTerm, channels]);

  /* Toggle the favorite channels. */
  const [favoriteChannels, setFavoriteChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const storedChannels = JSON.parse(localStorage.getItem('favoriteChannels') || '[]');
    setFavoriteChannels(storedChannels);
  }, []);

  const toggleFavorite = (channel: Channel) => {
    if (channel.favorite) {
      setFavoriteChannels(favoriteChannels.filter(c => c.id !== channel.id));
    } else {
      setFavoriteChannels([...favoriteChannels, { ...channel, favorite: true }]);
    }
  };

  /* Creating a new array with the favorite channels first and then the rest of the channels. */
  const channelsToShow = [];
  const favoriteChannelIds: { [key: string]: boolean } = {};
  for (const channel of favoriteChannels as Channel[]) {
    channelsToShow.push(channel);
    favoriteChannelIds[channel.id] = true;
  };
  for (const channel of filteredChannels as Channel[]) {
    if (!favoriteChannelIds[channel.id]) {
      channelsToShow.push(channel);
    }
  };

  useEffect(() => {
    localStorage.setItem('favoriteChannels', JSON.stringify(favoriteChannels));
  }, [favoriteChannels]);

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
          {!searchTerm && <SearchIcon className={styles['search-btn']} />}
          {searchTerm && (
            <Button
              className={styles['close-btn']}
              onHandleClick={() => setSearchTerm('')}
              title="Borrar búsqueda"
            >
              <CloseIcon />
            </Button>)}
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
        <div className={`${styles['button-list']} ${styles[`${isOpen ? 'open' : ''}`]} ${styles[`${searchTerm.length > 0 || selectedType === 'Radio' ? 'searching' : ''}`]}`}>
          <ButtonList
            channels={channelsToShow}
            channelSelected={channelSelected}
            onHandleChannel={onHandleChannel}
            selectedType={selectedType}
            toggleFavorite={toggleFavorite}
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
