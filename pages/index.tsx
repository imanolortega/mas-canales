import { useState } from 'react'
import styles from './Index.module.scss'

import Sidebar from '../components/sidebar/sidebar'
import YouTubeVideo from '../components/youtube-video/youtube-video'
import HeadComponent from '../sections/head'

// import TwitchChat from '../components/twitch-chat/twitch-chat'

const channels = [
  {
    id: 'O3bhL1gPdxM',
    name: 'Todo Noticias',
  },
  {
    id: 'hVE2rKvixd4',
    name: 'C5N',
  },
  {
    id: 'InSydaLSSlw',
    name: 'Crónica TV',
  },
  {
    id: '6_d4yYpCqsk',
    name: 'La Nación +',
  },
  {
    id: 'C2tMrZ6_xGE',
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
    id: 'SWMaoqZYDXo',
    name: 'Telefé'
  },
  {
    id: 'rI5aucf1vYY',
    name: 'Telefé Córdoba'
  },
  {
    id: 'wGB-c2S5XYw',
    name: 'IP Noticias'
  },
  {
    id: 'O9mOtdZ-nSk',
    name: 'Euronews'
  }
]

channels.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

export default function Home() {
  const [channelSelected, setChannelSelected] = useState(channels[0])
  return (
    <div>
      <HeadComponent />

      <main className={styles['main']}>
        <Sidebar
          channels={channels}
          channelSelected={channelSelected}
          onHandleChannel={setChannelSelected}
        />

        <div className={styles['video-container']}>
          <YouTubeVideo
            title={channelSelected.name}
            videoId={channelSelected.id}
          />
        </div>

        {/* <div className={styles['left']} >
          <TwitchChat channel='tinoburgos' />
        </div> */}
      </main>

      <footer></footer>
    </div>
  )
}
