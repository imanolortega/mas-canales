import { ALL } from '@utils/config'
import { ButtonListProps } from '@utils/types'
import { Fragment } from 'react'

import StarOutline from '@components/icons/star-outline'
import StarSolid from '@components/icons/star-solid'
import styles from './ButtonList.module.scss'

export default function ButtonList({
  channels,
  channelSelected,
  selectedType,
  onHandleChannel,
  toggleFavorite,
}: ButtonListProps) {
  return (
    <div className={styles['channels']}>
      {channels.map((channel) => (
        <Fragment key={channel.id}>
          {(channel.type === selectedType || selectedType === ALL) && (
            <button
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
        </Fragment>
      ))}
    </div>
  )
}
