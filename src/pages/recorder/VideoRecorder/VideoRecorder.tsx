import { usePictureInPicture } from './contexts/PictureInPicture';
import { LayoutSwitcher } from './LayoutSwitcher';
import { PipWindow } from './PipWindow';
import { RecordButton } from './RecordButton';
import { VideoAndAudioSettings } from './VideoAndAudioSettings';
import { VideoPreview } from './VideoPreview';

export const VideoRecorder = () => {
  const { pipWindow } = usePictureInPicture();

  return (
    <div className="w-full flex flex-col gap-4 items-center bg-gray-300 p-8 rounded-lg">
      <VideoPreview />
      <div className="w-full flex items-center gap-4 justify-center">
        <LayoutSwitcher />
        <VideoAndAudioSettings />
        {pipWindow && <PipWindow pipWindow={pipWindow} />}
      </div>
      <RecordButton />
    </div>
  );
};
