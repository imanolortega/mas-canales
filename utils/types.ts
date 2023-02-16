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