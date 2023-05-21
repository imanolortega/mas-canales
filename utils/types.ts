import { Dispatch, RefObject, SetStateAction } from 'react'

export interface ButtonProps {
  className?: string
  children: React.ReactNode
  onHandleClick: () => void
  title: string
}

export interface ButtonListProps {
  channels: Array<Channel>
  channelSelected: Channel
  selectedType: string
  onHandleChannel: (channel: Channel) => void
  toggleFavorite: (channel: Channel) => void
}

export interface CloseIconProps {
  width?: number
  height?: number
}

export interface Channel {
  favorite: boolean
  id: string
  name: string
  type: string
}

export interface ChannelOfDatabase {
  docId: string
  id: string
  name: string
  type: string
  favorite: boolean
}

export interface ModalProps {
  className?: string
  children: React.ReactNode
  closeModal: () => void
  title?: string
}

export interface SearchProps {
  isOpen: boolean
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
  inputRef: RefObject<HTMLInputElement>
}

export interface SearchIconProps {
  className?: string
  width?: number
  height?: number
}

export interface SelectsProps {
  isOpen: boolean
  selectedType: string
  setSelectedType: Dispatch<SetStateAction<string>>
}

export interface SidebarProps {
  className?: string
  channels: Array<Channel>
  channelSelected: Channel
  closeModal: () => void
  isModalOpen: boolean
  modalVersion: string
  onHandleChannel: (channel: Channel) => void
  openModal: (version: string) => void
}

export interface YouTubeVideoProps {
  loading: boolean
  openModal: (version: string) => void
  setLoading: (loading: boolean) => void
  title: string
  videoId: string
}
