import { TvMinimalPlay } from 'lucide-react';
import { FC, useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { OnProgressProps } from 'react-player/base';

interface VideoPlayerProps {
  onPlay?: () => void;
  onPause?: () => void;
  onProgress?: (state: OnProgressProps) => void;
  initialTime?: number;
  progressInterval?: number;
  onSeek?: (seconds: number) => void;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
  onPlay,
  onPause,
  onProgress,
  progressInterval,
  onSeek,
  initialTime,
}) => {
  const [maxTime, setMaxTime] = useState<number>(initialTime || 0);
  const playerRef = useRef<ReactPlayer>(null);

  const onProgressHandler = (state: OnProgressProps) => {
    if (state.playedSeconds > maxTime + 2) {
      onSeek?.(state.playedSeconds);
      return;
    }

    if (state.playedSeconds >= maxTime + 1) {
      setMaxTime(state.playedSeconds);
      onProgress?.(state);
      return;
    }
  };

  return (
    <ReactPlayer
      ref={playerRef}
      config={{
        youtube: {
          playerVars: { showinfo: 1 },
        },
      }}
      onReady={() => {
        if (initialTime) {
          playerRef.current?.seekTo(initialTime, 'seconds');
        }
      }}
      onPlay={onPlay}
      onPause={onPause}
      onProgress={onProgressHandler}
      progressInterval={progressInterval}
      onSeek={onSeek}
      url="https://www.youtube.com/watch?v=u31qwQUeGuM"
      playIcon={<TvMinimalPlay />}
      controls
    />
  );
};
