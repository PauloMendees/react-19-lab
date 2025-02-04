import { PageLayout } from '@/components/page-layout';
import { VideoRecorder } from './VideoRecorder';
import { MediaDevicesProvider } from './VideoRecorder/contexts/MediaDevices';
import { RecorderProvider } from './VideoRecorder/contexts/RecorderContext';
import { PictureInPictureProvider } from './VideoRecorder/contexts/PictureInPicture';

export const RecorderPage = () => {
  return (
    <RecorderProvider>
      <MediaDevicesProvider>
        <PictureInPictureProvider>
          <PageLayout title="Video and webcam recorder">
            <VideoRecorder />
          </PageLayout>
        </PictureInPictureProvider>
      </MediaDevicesProvider>
    </RecorderProvider>
  );
};
