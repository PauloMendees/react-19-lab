import { composeStreams } from '@/utils/composer';
import { createContext, FC, PropsWithChildren, useContext, useRef, useState } from 'react';

type Layout = 'screen' | 'camera' | 'screen-and-camera';

type RecorderContextProps = {
  layout: Layout;
  setLayout: React.Dispatch<React.SetStateAction<Layout>>;
  isRecording: boolean;
  isPaused: boolean;
  cameraStream: MediaStream | null;
  microphoneStream: MediaStream | null;
  screenshareStream: MediaStream | null;
  countingDown: boolean;
  setCountingDown: (countingDown: React.SetStateAction<boolean>) => void;
  startRecording: () => void;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  setCameraStream: (value: React.SetStateAction<MediaStream | null>) => void;
  setMicrophoneStream: (value: React.SetStateAction<MediaStream | null>) => void;
  setScreenshareStream: (value: React.SetStateAction<MediaStream | null>) => void;
};

export const RecorderContext = createContext<RecorderContextProps>({} as RecorderContextProps);

export const RecorderProvider: FC<PropsWithChildren> = ({ children }) => {
  const [layout, setLayout] = useState<Layout>('screen');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [microphoneStream, setMicrophoneStream] = useState<MediaStream | null>(null);
  const [screenshareStream, setScreenshareStream] = useState<MediaStream | null>(null);
  const [countingDown, setCountingDown] = useState(false);

  const mediaRecorder = useRef<MediaRecorder>(null);

  const startRecording = () => {
    setIsRecording(true);

    const composedStream = composeStreams(
      layout === 'screen' ? null : cameraStream,
      microphoneStream,
      layout === 'camera' ? null : screenshareStream,
    );
    mediaRecorder.current = new MediaRecorder(composedStream, {
      mimeType: 'video/webm; codecs=vp9',
      videoBitsPerSecond: 8e6,
    });

    const chunks: Blob[] = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    mediaRecorder.current.onstop = () => {
      composedStream.getVideoTracks().forEach((composedTrack) => composedTrack.stop());

      const blob = new Blob(chunks);

      // TODO: Do something to send direct to cloudfare

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'recording.webm';
      link.click();

      window.URL.revokeObjectURL(url);
    };

    mediaRecorder.current.start();
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
    setIsPaused(false);
  };

  const pauseRecording = () => {
    mediaRecorder.current?.pause();
    setIsPaused(true);
  };

  const resumeRecording = () => {
    setIsPaused(false);
    mediaRecorder.current?.resume();
  };

  return (
    <RecorderContext.Provider
      value={{
        layout,
        setLayout,
        isRecording,
        isPaused,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        cameraStream,
        microphoneStream,
        screenshareStream,
        setCameraStream,
        setMicrophoneStream,
        setScreenshareStream,
        countingDown,
        setCountingDown,
      }}
    >
      {children}
    </RecorderContext.Provider>
  );
};

export const useRecordContext = () => useContext(RecorderContext);
