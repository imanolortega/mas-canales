import { Dispatch, SetStateAction } from 'react';

import styles from './ButtonList.module.scss'

interface ButtonList {
  channels: Array<{
    id: string;
    name: string;
  }>;
  channelSelected: {
    id: string;
    name: string;
  }
  onHandleChannel: Dispatch<SetStateAction<{ id: string; name: string; }>>;
}

export default function ButtonList({
  channels,
  channelSelected,
  onHandleChannel }: ButtonList) {
  return (
    <div className={`${styles['channels']} ${styles['channels-height']}`}>
      {channels.map((channel) => (
        <button
          key={channel.name}
          className={`${styles['channel']} ${channelSelected.id === channel.id ? styles['active'] : ''}`}
          onClick={() => onHandleChannel(channel)}>{channel.name}</button>
      ))}
    </div>
  );
}
