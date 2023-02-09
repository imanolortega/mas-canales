import styles from './Index.module.scss'

import { channels } from '@utils/channels'

import { useLocalStorage } from '@hooks/useLocaleStorage'
import ClientOnly from '@components/client-only/client-only'
import HeadComponent from '@components/head/head'
import Sidebar from '@sections/sidebar/sidebar'
import YouTubeVideo from '@sections/youtube-video/youtube-video'
import { useState } from 'react'

export default function Home() {
  const [channelSelected, setChannelSelected] = useLocalStorage(
    'channelSlected',
    channels[0]
  )
  const [isModalInformationOpen, setIsModalInformationOpen] = useState(false)
  const [isModalSearchOpen, setIsModalSearchOpen] = useState(false)
  return (
    <>
      <ClientOnly>
        <HeadComponent />
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
            isModalOpen={isModalInformationOpen}
            onHandleChannel={setChannelSelected}
            onHandleModal={setIsModalInformationOpen}
          />
          <section className={styles['video']}>
            <YouTubeVideo
              isModalOpen={isModalSearchOpen}
              onHandleModal={setIsModalSearchOpen}
              title={channelSelected.name}
              videoId={channelSelected.id}
            />
          </section>
        </main>
      </ClientOnly>
    </>
  )
}
