import StarOutline from '@components/icons/star-outline';
import StarSolid from '@components/icons/star-solid';
import { Channel } from '@utils/types';
import { Dispatch, SetStateAction } from 'react';
import styles from './ButtonList.module.scss'

interface ButtonList {
  channels: Array<Channel>;
  channelSelected: Channel;
  selectedType: string;
  onHandleChannel: Dispatch<SetStateAction<Channel>>;
  toggleFavorite: (channel: Channel) => void;
}

export default function ButtonList({
  channels,
  channelSelected,
  selectedType,
  onHandleChannel,
  toggleFavorite }: ButtonList) {
  console.log('selectedType', selectedType)
  console.log(channels)
  return (
    <div className={styles['channels']}>
      {channels.map((channel) => (
        <>
          {
            (channel.type === selectedType || selectedType === 'all') &&
            (<button
              key={channel.name}
              className={`${styles['channel']} ${channelSelected.id === channel.id ? styles['active'] : ''}`}
              onClick={() => onHandleChannel(channel)}
              title={`Ver ${channel.name}`}
            >
              {channel.name}
              {channel.favorite ? (
                <span
                  className={styles['added-favorite']}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(channel)
                  }}
                  title="Quitar de favoritos"
                >
                  <StarSolid />
                </span>
              ) : (
                <span
                  className={styles['favorite-to-add']}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(channel)
                  }}
                  title="Agregar a favoritos"
                >
                  <StarOutline />
                </span>
              )}
            </button>)
          }
        </>
      ))}
    </div>
  );
}
