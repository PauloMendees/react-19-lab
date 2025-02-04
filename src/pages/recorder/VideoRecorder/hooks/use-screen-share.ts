import { useRef } from 'react';
import { useRecordContext } from '../contexts/RecorderContext';
import { usePictureInPicture } from '../contexts/PictureInPicture';

export const useScreenShare = () => {
  const { screenshareStream, setScreenshareStream, layout, isRecording } = useRecordContext();
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  const isRecordingRef = useRef(isRecording);
  isRecordingRef.current = isRecording;

  const { pipWindow, requestPipWindow } = usePictureInPicture();
  const pipWindowRef = useRef(pipWindow);
  pipWindowRef.current = pipWindow;

  const startScreenshare = async () => {
    if (!pipWindowRef.current) {
      pipWindowRef.current = await requestPipWindow();
    }
    if (screenshareStream) {
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      stream.getVideoTracks()[0].onended = () => {
        setScreenshareStream(null);
        if (isRecordingRef.current && layoutRef.current !== 'camera') {
          pipWindowRef.current?.close();
        }
      };
      setScreenshareStream(stream);
    } catch {
      // Happens when the user aborts the screenshare
      if (isRecordingRef.current && layoutRef.current !== 'camera') {
        pipWindowRef.current?.close();
      }
    }
  };

  return { startScreenshare };
};
