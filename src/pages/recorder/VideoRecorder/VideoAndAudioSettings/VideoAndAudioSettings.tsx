import { Camera, CameraOff, Mic, MicOff } from 'lucide-react';
import { useMediaDevices } from '../contexts/MediaDevices';

export const VideoAndAudioSettings = () => {
  const {
    microphones,
    microphoneId,
    microphoneEnabled,
    setPreferredMicrophone,
    setMicrophoneEnabled,
    setCameraEnabled,
    cameraEnabled,
    cameras,
    cameraId,
    setPreferredCamera,
  } = useMediaDevices();
  return (
    <div className="flex items-center gap-8 rounded-lg border border-white p-[18px]">
      <div className="flex items-center gap-2">
        {microphoneEnabled ? (
          <Mic className="cursor-pointer" onClick={() => setMicrophoneEnabled(false)} />
        ) : (
          <MicOff className="cursor-pointer" onClick={() => setMicrophoneEnabled(true)} />
        )}
        <select
          value={microphoneId}
          onChange={(event) => setPreferredMicrophone(event.target.value)}
          className="bg-transparent max-w-[15px] cursor-pointer"
        >
          {microphones?.map((mic) => (
            <option value={mic.deviceId} key={mic.deviceId}>
              {mic.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2 ">
        {cameraEnabled ? (
          <Camera className="cursor-pointer" onClick={() => setCameraEnabled(false)} />
        ) : (
          <CameraOff className="cursor-pointer" onClick={() => setCameraEnabled(true)} />
        )}
        <select
          value={cameraId}
          onChange={(event) => setPreferredCamera(event.target.value)}
          className="bg-transparent max-w-[15px] cursor-pointer"
        >
          {cameras?.map((camera) => (
            <option value={camera.deviceId} key={camera.deviceId}>
              {camera.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
