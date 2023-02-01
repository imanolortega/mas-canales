import { useState } from 'react'
import styles from './Index.module.scss'

import { channels } from '@utils/channels'

import HeadComponent from '@components/head/head'
import Sidebar from '@components/sidebar/sidebar'
import YouTubeVideo from '@components/youtube-video/youtube-video'

// import TwitchChat from '../components/twitch-chat/twitch-chat'

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
