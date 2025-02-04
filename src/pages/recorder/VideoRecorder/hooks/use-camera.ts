import { useCallback, useRef } from 'react';
import { useRecordContext } from '../contexts/RecorderContext';
import { usePictureInPicture } from '../contexts/PictureInPicture';
import { getCameraStream } from '@/utils/media-devices';

const useCamera = (deviceId: string, enabled: boolean) => {
  if (!enabled) {
    deviceId = '';
  }

  const { layout, isRecording, cameraStream, setCameraStream } = useRecordContext();
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  const isRecordingRef = useRef(isRecording);
  isRecordingRef.current = isRecording;

  const { pipWindow } = usePictureInPicture();
  const pipWindowRef = useRef(pipWindow);
  pipWindowRef.current = pipWindow;

  const cameraStreamRef = useRef(cameraStream);
  cameraStreamRef.current = cameraStream;

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
      if (isRecordingRef.current && layoutRef.current !== 'screen') {
        pipWindowRef.current?.close();
      }
      cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
      if (deviceId) {
        const cameraStream = await getCameraStream(deviceId);
        setCameraStream(cameraStream);
      }
    },
    [setCameraStream],
  );
};

export default useCamera;
