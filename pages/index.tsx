import { ABOUT, API_URL, REVALIDATE } from '@utils/config'
import { Channel, ChannelOfDatabase } from '@utils/types'
import { GetStaticProps } from 'next'
import { orderAlphabetically } from '@utils/common'
import { useLocalStorage } from '@hooks/useLocaleStorage'
import { useState } from 'react'
import styles from '@styles/Index.module.scss'

import ClientOnly from '@components/client-only/client-only'
import HeadComponent from '@components/head/head'
import Sidebar from '@sections/sidebar/sidebar'
import YouTubeVideo from '@sections/youtube-video/youtube-video'

interface Home {
  channels: Array<Channel>
}

export default function Home({ channels }: Home) {
  orderAlphabetically(channels)

  const [channelSelected, setChannelSelected] = useLocalStorage(
    'channelSelected',
    channels[0]
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalVersion, setModalVersion] = useState(ABOUT)
  const [loading, setLoading] = useState(true)

  const onHandleChannel = (channel: Channel) => {
    setChannelSelected(channel)
    setLoading(true)
  }

  const openModal = (version: string) => {
    setIsModalOpen(true)
    setModalVersion(version)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalVersion(ABOUT)
  }

  return (
    <>
      <HeadComponent channels={channels} />
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
            onHandleChannel={onHandleChannel}
            openModal={openModal}
          />
          <section className={styles['video']}>
            <YouTubeVideo
              loading={loading}
              openModal={openModal}
              setLoading={setLoading}
              title={channelSelected.name}
              videoId={channelSelected.id}
            />
          </section>
        </main>
      </ClientOnly>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  if (typeof API_URL === 'undefined') {
    throw new Error('API_URL is not defined')
  }
  const res = await fetch(API_URL)
  const data = await res.json()
  const channels = data.channels.map((channel: ChannelOfDatabase) => {
    const newChannel = {
      favorite: channel.favorite,
      id: channel.id,
      name: channel.name,
      type: channel.type,
    }
    return newChannel
  })

  return {
    props: {
      channels: channels,
    },
    revalidate: REVALIDATE, // 12 hours
  }
}
