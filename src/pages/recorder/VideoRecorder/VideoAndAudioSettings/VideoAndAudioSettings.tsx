import { Camera, CameraOff, Mic, MicOff } from 'lucide-react';
import { useMediaDevices } from '../contexts/MediaDevices';
import { useRecordContext } from '../contexts/RecorderContext';

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

  const { isRecording } = useRecordContext();

  return (
    <div className="flex items-center gap-8 rounded-lg border border-white p-[18px]">
      <div className="flex items-center gap-2">
        {microphoneEnabled ? (
          <button disabled={isRecording} onClick={() => setMicrophoneEnabled(false)}>
            <Mic className="cursor-pointer" />
          </button>
        ) : (
          <button disabled={isRecording} onClick={() => setMicrophoneEnabled(true)}>
            <MicOff className="cursor-pointer" />
          </button>
        )}
        <select
          disabled={isRecording}
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
          <button disabled={isRecording} onClick={() => setCameraEnabled(false)}>
            <Camera className="cursor-pointer" />
          </button>
        ) : (
          <button disabled={isRecording} onClick={() => setCameraEnabled(true)}>
            <CameraOff className="cursor-pointer" onClick={() => setCameraEnabled(true)} />
          </button>
        )}
        <select
          disabled={isRecording}
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
