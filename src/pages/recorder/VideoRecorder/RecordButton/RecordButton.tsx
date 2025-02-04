import { usePictureInPicture } from '../contexts/PictureInPicture';
import { useRecordContext } from '../contexts/RecorderContext';
import { useScreenShare } from '../hooks/use-screen-share';

export const RecordIcon = () => {
  return (
    <div className="border border-white rounded-full p-1 h-12 w-12 flex flex-col relative">
      <div className="w-full h-full bg-red-500 rounded-full shadow-lg " />
      <div className="w-full h-full bg-red-500 rounded-full shadow-lg absolute blur-lg top-0" />
    </div>
  );
};

export const RecordButton = () => {
  const { isRecording, layout, countingDown, setCountingDown } = useRecordContext();
  const { pipWindow, requestPipWindow } = usePictureInPicture();
  const { startScreenshare } = useScreenShare();

  return (
    <button
      onClick={async () => {
        if (countingDown) {
          return;
        }
        if (isRecording) {
          pipWindow?.close();
        } else if (pipWindow) {
          setCountingDown(true);
        } else if (layout === 'camera') {
          await requestPipWindow();
        } else {
          await startScreenshare();
        }
      }}
    >
      <RecordIcon />
    </button>
  );
};
