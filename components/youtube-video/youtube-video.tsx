import styles from './YouTubeVideo.module.scss';

interface YouTubeVideoProps {
  videoId: string;
  title: string;
}

export default function YouTubeVideo({ title, videoId }: YouTubeVideoProps) {
  return (
    <div className={styles['video-container']}>
      <h3>{title}</h3>
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        height="390"
        width="640"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&amp;enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A3000&amp;widgetid=3`}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        title={`${title} YouTube Video Player`}>
      </iframe>
    </div>
  );
};