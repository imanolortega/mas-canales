import { ChannelOfDatabase } from '@utils/types'
import Head from 'next/head'

type Channels = {
  channels: ChannelOfDatabase[]
}

export default function HeadComponent({ channels }: Channels) {
  const channelsDescription = channels
    .map((channel) => `${channel.name}`)
    .join(', ')

  const meta = {
    title: 'Más Canales | En Vivo',
    description: `Canales en Vivo de Argentina. ${channelsDescription}.`,
    image: 'https://mascanales.net/mas-canales-banner.jpeg',
    type: 'website',
    url: 'https://mascanales.net/',
  }

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={meta.url} />
      <link rel="canonical" href={meta.url} />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Más Canales" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </Head>
  )
}
