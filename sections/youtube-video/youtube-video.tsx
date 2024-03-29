import { ABOUT, CHANNELS } from '@utils/config'
import { useEffect, useState } from 'react'
import { YouTubeVideoProps } from '@utils/types'
import styles from './YouTubeVideo.module.scss'
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube'

import Pause from '@components/icons/pause'
import PlayIcon from '@components/icons/play'
import SoundIcon from '@components/icons/sound'
import MuteIcon from '@components/icons/mute'
import Button from '@components/buttons/button'
import Loader from '@components/loader/loader'

export default function YouTubeVideo({
  loading,
  openModal,
  setLoading,
  title,
  videoId,
}: YouTubeVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [player, setPlayer] = useState<YouTubePlayer>()

  useEffect(() => {
    if (player) {
      const currentState = player.getPlayerState()
      if (currentState === 1) {
        setIsPlaying(false)
      } else {
        setIsPlaying(true)
      }

      if (player.isMuted()) {
        setIsMuted(true)
      } else {
        setIsMuted(false)
      }
    }
  }, [player, videoId])

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      allowFullScreen: true,
      autoplay: 1,
      mute: 0,
      origin: 'http://localhost:3000/',
    },
  }

  const togglePlay = () => {
    if (player) {
      const currentState = player.getPlayerState()
      if (currentState === 1) {
        setIsPlaying(false)
        player.pauseVideo()
      } else {
        setIsPlaying(true)
        player.playVideo()
      }
    }
  }

  const toggleMute = () => {
    if (player) {
      if (player.isMuted()) {
        setIsMuted(false)
        player.unMute()
      } else {
        setIsMuted(true)
        player.mute()
      }
    }
  }

  const handleReady = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target)
    setLoading(false)
  }

  return (
    <div className={styles['video-container']}>
      <div className={styles['title-container']}>
        <h2 className={styles['title']}>
          <span>{title}</span>
        </h2>
        <div className={styles['buttons-container']}>
          <button
            className={styles['channels-btn']}
            onClick={() => openModal(CHANNELS)}
            title="Canales"
          >
            Canales
          </button>
          <button
            className={styles['btn']}
            onClick={togglePlay}
            title={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? <Pause /> : <PlayIcon />}
          </button>
          <button
            className={`${styles['btn']} ${styles['alternative']}`}
            onClick={toggleMute}
            title={isMuted ? 'Activar Sonido' : 'Silenciar'}
          >
            {isMuted ? <MuteIcon /> : <SoundIcon />}
          </button>
        </div>
      </div>
      {loading && (
        <div className={styles['loading-container']}>
          <Loader />
        </div>
      )}
      <YouTube
        className={`${styles['video']} ${loading ? styles['hide-video'] : ''}}`}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onReady={(event) => handleReady(event)}
        opts={opts}
        videoId={videoId}
      />
      <div className={styles['footer']}>
        <Button
          className={`${styles['info']}`}
          onHandleClick={() => openModal(ABOUT)}
          title="Información"
        >
          ¿Qué es &quot;Más Canales&quot;?
        </Button>
      </div>
    </div>
  )
}
