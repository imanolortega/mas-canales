import YouTube from 'react-youtube';

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 1,
  },
};

export interface YouTubeVideoProps {
  videoId: string;
}

export const YouTubeVideo = ({ videoId }: YouTubeVideoProps) => {
  return <YouTube videoId={videoId} opts={opts} />;
};