import styles from './Index.module.scss'

import { channels } from '@utils/channels'

import { useLocalStorage } from '@hooks/useLocaleStorage'
import ClientOnly from '@components/client-only/client-only'
import HeadComponent from '@components/head/head'
import Sidebar from '@components/sidebar/sidebar'
import YouTubeVideo from '@components/youtube-video/youtube-video'

export default function Home() {
  const [channelSelected, setChannelSelected] = useLocalStorage(
    'channelSlected',
    channels[0]
  )
  return (
    <>
      <ClientOnly>
        <HeadComponent />
        <main className={styles['main']}>
          <Sidebar
            channels={channels}
            channelSelected={channelSelected}
            onHandleChannel={setChannelSelected}
          />
          <div className={styles['video']}>
            <YouTubeVideo
              title={channelSelected.name}
              videoId={channelSelected.id}
            />
          </div>
        </main>
      </ClientOnly>
      <footer></footer>
    </>
  )
}
