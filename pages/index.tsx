import { useState } from 'react'
import ButtonList from '../components/button-list/button-list'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import TwitchChat from '../components/twitch-chat/twitch-chat'
import YouTubeVideo from '../components/youtube-video/youtube-video'

const channels = [
  {
    id: 'O3bhL1gPdxM',
    name: 'Todo Noticias',
  },
  {
    id: 'BUxXxVh7XhI',
    name: 'C5N',
  },
  {
    id: 'InSydaLSSlw',
    name: 'Crónica TV',
  },
  {
    id: 'IOSVORAZnRY',
    name: 'La Nación +',
  },
  {
    id: '9yfrm0_zC6E',
    name: 'TV Pública',
  },
  {
    id: 'OLmMmftzmf0',
    name: 'Canal 26'
  },
  {
    id: 'g7Kx0AKmfTg',
    name: 'Vorterix'
  },
  {
    id: 'o8JBz0XFS_k',
    name: 'América 24'
  },
  {
    id: 'uk6btTpO5IY',
    name: 'Canal de la Ciudad de Buenos Aires'
  },
  {
    id: 'sQ9a4Ipr474',
    name: 'Telefé'
  }
]

channels.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

export default function Home() {
  const [channelSelected, setChannelSelected] = useState(channels[0])
  return (
    <div className={styles.container}>
      <Head>
        <title>Más Canales</title>
        <meta name="description" content="Más canales de YouTube" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles['main']}>
        <div className={styles['right']}>
          <h3 className={styles['title']}>Canales</h3>
          <ButtonList
            channels={channels}
            onHandleChannel={setChannelSelected}
          />
        </div>

        <div className={styles['center']}>
          <YouTubeVideo videoId={channelSelected.id} />
        </div>

        <div className={styles['left']} >
          <TwitchChat channel='tinoburgos' />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
