export interface TwitchChatProps {
  channel: string;
}

export default function TwitchChat({ channel }: TwitchChatProps) {
  return (
    <iframe
      src={`https://www.twitch.tv/embed/${channel}/chat?parent=localhost&darkpopout`}
      height="100%"
      width="100%"
      allowFullScreen>
    </iframe>
  );
}
