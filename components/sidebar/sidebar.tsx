import { Channel } from '@utils/types'
import { updateChannels } from '@utils/common'
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useLocalStorage } from '@hooks/useLocaleStorage'
import styles from './Sidebar.module.scss'

import ArrowLeft from '@components/icons/arrow-left'
import Button from '@components/buttons/button'
import ButtonList from '@components/sidebar/parts/button-list/button-list'
import Logo from '@components/logo/logo'
import SearchIcon from '@components/icons/search'
import Selects from './parts/selects/selects'
import Search from './parts/search/search'
import Modal from '@components/modal/modal'
import About from '@components/modal/modal-contents/about'
import Info from '@components/icons/info'
interface Sidebar {
  className?: string
  channels: Array<Channel>
  channelSelected: Channel
  isModalOpen: boolean
  onHandleChannel: Dispatch<SetStateAction<Channel>>
  onHandleModal: Dispatch<SetStateAction<boolean>>
}

export default function Sidebar({
  className,
  channels,
  isModalOpen,
  channelSelected,
  onHandleChannel,
  onHandleModal,
}: Sidebar) {
  /* Focus the input 🔦 */
  const [isSearchOpen, setIsSearchOpen] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (isSearchOpen > 0 && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearchOpen])

  /* Toggle the sidebar 🎚️ */
  const [isOpen, setOpen] = useState(true)
  const toggle = (type: string) => {
    if (type === 'open') {
      setOpen(!isOpen)
    } else if (type === 'search') {
      setIsSearchOpen((prevCount) => prevCount + 1)
      setOpen(true)
    }
  }

  /* Toggle the favorite channels 🎚️ */
  const [favoriteChannels, setFavoriteChannels] = useLocalStorage(
    'favoriteChannels',
    [] as Channel[]
  )

  const toggleFavorite = (channel: Channel) => {
    const currentChannels = favoriteChannels || []
    if (channel.favorite) {
      setFavoriteChannels(currentChannels.filter((c) => c.id !== channel.id))
    } else {
      setFavoriteChannels([...currentChannels, { ...channel, favorite: true }])
    }
  }

  /* Filtering the channels 🔍 */
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useLocalStorage(
    'channelType',
    'Todos'
  )

  const filteredChannels = useMemo(() => {
    const channelsToShow = []
    const favoriteChannelIds: { [key: string]: boolean } = {}
    setFavoriteChannels(updateChannels(favoriteChannels, channels))
    for (const channel of favoriteChannels as Channel[]) {
      channelsToShow.push(channel)
      favoriteChannelIds[channel.id] = true
    }
    for (const channel of channels as Channel[]) {
      if (!favoriteChannelIds[channel.id]) {
        channelsToShow.push(channel)
      }
    }
    return searchTerm
      ? channelsToShow.filter((channel) =>
          channel.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : channelsToShow
  }, [searchTerm, channels, favoriteChannels])

  return (
    <aside className={`${styles['sidebar']} ${className || ''}`}>
      <div className={styles['logo-container']}>
        <Logo isOpen={isOpen} />
      </div>
      {isModalOpen && (
        <Modal toggle={onHandleModal}>
          <About />
        </Modal>
      )}
      <div className={styles['search-container']}>
        <Search
          inputRef={inputRef}
          isOpen={isOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div
          className={`${styles['search-btn-container']} ${
            styles[`${isOpen ? 'open' : ''}`]
          }`}
        >
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
      <div className={styles['selects-container']}>
        <Selects
          isOpen={isOpen}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </div>
      <div
        className={`${styles['content']} ${
          styles[`${isOpen ? 'open' : 'closed'}`]
        }`}
      >
        <div
          className={`${styles['button-list']} ${
            styles[`${isOpen ? 'open' : ''}`]
          } ${
            styles[
              `${
                searchTerm.length > 0 || selectedType === 'Radio'
                  ? 'searching'
                  : ''
              }`
            ]
          }`}
        >
          <ButtonList
            channels={filteredChannels}
            channelSelected={channelSelected}
            onHandleChannel={onHandleChannel}
            selectedType={selectedType}
            toggleFavorite={toggleFavorite}
          />
        </div>
      </div>
      <div className={styles['arrow-btn-container']}>
        {isOpen && (
          <Button
            className={`${styles['information']}`}
            onHandleClick={() => onHandleModal(true)}
            title="Información"
          >
            Más info
          </Button>
        )}
        <Button
          className={`${styles['btn']} ${
            isOpen ? styles['open'] : styles['closed']
          }`}
          onHandleClick={() => toggle('open')}
          title={`${isOpen ? 'Open' : 'Close'}`}
        >
          <ArrowLeft />
        </Button>
      </div>
    </aside>
  )
}
