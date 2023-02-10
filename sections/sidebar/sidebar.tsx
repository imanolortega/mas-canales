import { ALL, RADIO } from '@utils/constants'
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

import About from '@components/modal/modal-contents/about'
import ArrowLeft from '@components/icons/arrow-left'
import Button from '@components/buttons/button'
import ButtonList from '@sections/sidebar/parts/button-list/button-list'
import Logo from '@components/logo/logo'
import Modal from '@components/modal/modal'
import Search from './parts/search/search'
import SearchIcon from '@components/icons/search'
import Selects from './parts/selects/selects'

interface Sidebar {
  className?: string
  channels: Array<Channel>
  channelSelected: Channel
  closeModal: () => void
  isModalOpen: boolean
  modalVersion: string
  onHandleChannel: Dispatch<SetStateAction<Channel>>
  openModal: (version: string) => void
}

export default function Sidebar({
  channels,
  channelSelected,
  className,
  closeModal,
  isModalOpen,
  modalVersion,
  onHandleChannel,
  openModal,
}: Sidebar) {
  const [isSearchOpen, setIsSearchOpen] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (isSearchOpen > 0 && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSearchOpen])

  const [isOpen, setOpen] = useState(true)
  const toggle = (type: string) => {
    if (type === 'open') {
      setOpen(!isOpen)
    } else if (type === 'search') {
      setIsSearchOpen((prevCount) => prevCount + 1)
      setOpen(true)
    }
  }

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

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useLocalStorage('channelType', ALL)

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
      {isModalOpen && modalVersion === 'about' && (
        <Modal closeModal={closeModal}>
          <About />
        </Modal>
      )}
      {isModalOpen && modalVersion === 'channels' && (
        <Modal className={styles['modal-channels']} closeModal={closeModal}>
          <div className={styles['modal-search-container']}>
            <Search
              inputRef={inputRef}
              isOpen={isOpen}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
          <div className={styles['modal-selects-container']}>
            <Selects
              isOpen={isOpen}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          </div>
          <div className={styles['modal-list-container']}>
            <ButtonList
              channels={filteredChannels}
              channelSelected={channelSelected}
              onHandleChannel={onHandleChannel}
              selectedType={selectedType}
              toggleFavorite={toggleFavorite}
            />
          </div>
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
                searchTerm.length > 0 || selectedType === RADIO
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
            onHandleClick={() => openModal('about')}
            title="Información"
          >
            ¿Qué es &quot;Más Canales&quot;?
          </Button>
        )}
        <Button
          className={`${styles['btn']} ${
            isOpen ? styles['open'] : styles['closed']
          }`}
          onHandleClick={() => toggle('open')}
          title={`${isOpen ? 'Abrir' : 'Cerrar'}`}
        >
          <ArrowLeft />
        </Button>
      </div>
    </aside>
  )
}
