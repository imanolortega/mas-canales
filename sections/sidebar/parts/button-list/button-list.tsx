import { Channel } from '@utils/types'
import { Dispatch, SetStateAction } from 'react'
import StarOutline from '@components/icons/star-outline'
import StarSolid from '@components/icons/star-solid'
import styles from './ButtonList.module.scss'

interface ButtonList {
  channels: Array<Channel>
  channelSelected: Channel
  selectedType: string
  onHandleChannel: Dispatch<SetStateAction<Channel>>
  toggleFavorite: (channel: Channel) => void
}

export default function ButtonList({
  channels,
  channelSelected,
  selectedType,
  onHandleChannel,
  toggleFavorite,
}: ButtonList) {
  return (
    <div className={styles['channels']}>
      {channels.map((channel) => (
        <>
          {(channel.type === selectedType || selectedType === 'Todos') && (
            <button
              key={channel.id}
              className={`${styles['channel']} ${
                channelSelected.id === channel.id ? styles['active'] : ''
              }`}
              onClick={() => onHandleChannel(channel)}
              title={`Ver ${channel.name}`}
            >
              {channel.name}
              <span
                className={`${
                  channel.favorite
                    ? styles['added-favorite']
                    : styles['favorite-to-add']
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(channel)
                }}
                title={`${
                  channel.favorite ? 'Quitar de' : 'Agregar a'
                } favoritos`}
              >
                {channel.favorite ? <StarSolid /> : <StarOutline />}
              </span>
            </button>
          )}
        </>
      ))}
    </div>
  )
}