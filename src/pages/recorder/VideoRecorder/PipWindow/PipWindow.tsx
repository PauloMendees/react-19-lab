import { createPortal } from 'react-dom';
import { useRecordContext } from '../contexts/RecorderContext';
import useStopWatch from '../hooks/use-stop-watch';
import useVideoSource from '../hooks/use-video-source';
import { FC } from 'react';
import { RecordIcon } from '../RecordButton';
import { formatDuration } from '@/utils/formatDuration';
import { Ban, CirclePause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface PipWindowProps {
  pipWindow: Window;
}

export const PipWindow: FC<PipWindowProps> = ({ pipWindow }) => {
  const { layout, cameraStream, isRecording, isPaused, startRecording, pauseRecording, resumeRecording } =
    useRecordContext();
  const updateCameraSource = useVideoSource(cameraStream);
  const stopWatch = useStopWatch();

  return createPortal(
    <div className="fixed flex flex-col bg-black w-full h-full items-center ">
      {layout !== 'screen' && (
        <video
          className="w-full h-full object-cover"
          ref={updateCameraSource}
          autoPlay
          playsInline
          muted
          controls={false}
        />
      )}
      {!isRecording ? (
        <button
          className="absolute bottom-4"
          onClick={() => {
            startRecording();
            stopWatch.start();
          }}
        >
          <RecordIcon />
        </button>
      ) : (
        <div className="px-4 absolute bottom-4 w-full flex items-center justify-between">
          <div className="px-2 py-2 bg-black rounded-md">
            <span className="text-white ">{formatDuration(stopWatch.elapsed)}</span>
          </div>
          <Button
            size="icon"
            onClick={() => {
              if (isPaused) {
                resumeRecording();
                stopWatch.start();
              } else {
                stopWatch.stop();
                pauseRecording();
              }
            }}
          >
            {isPaused ? <Play /> : <CirclePause />}
          </Button>
          <Button size="icon" className="bg-red-500" onClick={pipWindow.close}>
            <Ban />
          </Button>
        </div>
      )}
    </div>,
    pipWindow.document.body,
  );
};
