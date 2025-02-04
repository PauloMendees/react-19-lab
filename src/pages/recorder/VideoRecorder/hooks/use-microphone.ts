import { useCallback, useRef } from 'react';
import { useRecordContext } from '../contexts/RecorderContext';
import { usePictureInPicture } from '../contexts/PictureInPicture';
import { getMicrophoneStream } from '@/utils/media-devices';

const useMicrophone = (deviceId: string, enabled: boolean) => {
  if (!enabled) {
    deviceId = '';
  }

  const { isRecording, microphoneStream, setMicrophoneStream } = useRecordContext();
  const isRecordingRef = useRef(isRecording);
  isRecordingRef.current = isRecording;

  const { pipWindow } = usePictureInPicture();
  const pipWindowRef = useRef(pipWindow);
  pipWindowRef.current = pipWindow;

  const microphoneStreamRef = useRef(microphoneStream);
  microphoneStreamRef.current = microphoneStream;

  const deviceIdRef = useRef(deviceId);
  deviceIdRef.current = deviceId;

  return useCallback(
    async (deviceId: string, enabled: boolean) => {
      if (!enabled) {
        deviceId = '';
      }
      if (deviceId === deviceIdRef.current) {
        return;
      }
      if (isRecordingRef.current) {
        pipWindowRef.current?.close();
      }
      microphoneStreamRef.current?.getTracks().forEach((track) => track.stop());
      setMicrophoneStream(null);
      if (deviceId) {
        const microphoneStream = await getMicrophoneStream(deviceId);
        setMicrophoneStream(microphoneStream);
      }
    },
    [setMicrophoneStream],
  );
};

export default useMicrophone;
