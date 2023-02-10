import { channels } from '@utils/channels'
import { useLocalStorage } from '@hooks/useLocaleStorage'
import { useState } from 'react'
import styles from './Index.module.scss'

import ClientOnly from '@components/client-only/client-only'
import HeadComponent from '@components/head/head'
import Sidebar from '@sections/sidebar/sidebar'
import YouTubeVideo from '@sections/youtube-video/youtube-video'

export default function Home() {
  const [channelSelected, setChannelSelected] = useLocalStorage(
    'channelSlected',
    channels[0]
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalVersion, setModalVersion] = useState('about')

  const openModal = (version: string) => {
    setIsModalOpen(true)
    setModalVersion(version)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalVersion('about')
  }

  return (
    <>
      <HeadComponent />
      <ClientOnly>
        <main className={styles['main']}>
          <h1
            style={{
              display: 'none',
            }}
          >
            Más Canales en Vivo
          </h1>
          <Sidebar
            channels={channels}
            channelSelected={channelSelected}
            closeModal={closeModal}
            isModalOpen={isModalOpen}
            modalVersion={modalVersion}
            onHandleChannel={setChannelSelected}
            openModal={openModal}
          />
          <section className={styles['video']}>
            <YouTubeVideo
              openModal={openModal}
              title={channelSelected.name}
              videoId={channelSelected.id}
            />
          </section>
        </main>
      </ClientOnly>
    </>
  )
}
