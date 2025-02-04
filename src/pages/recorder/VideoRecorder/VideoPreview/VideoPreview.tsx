import { useState } from 'react';
import { useRecordContext } from '../contexts/RecorderContext';
import useVideoSource from '../hooks/use-video-source';
import { cn } from '@/lib/utils';
import { Placeholder } from '../Placeholder/Placeholder';
import { percentage } from '@/utils/percetange';
import {
  CAMERA_BORDER_RADIUS,
  CAMERA_HEIGHT,
  CAMERA_MARGIN_BOTTOM,
  CAMERA_MARGIN_RIGHT,
  CAMERA_WIDTH,
} from '@/utils/composer';

type ScreenshareSize = {
  width: number;
  height: number;
};

export const VideoPreview = () => {
  const { layout, cameraStream, screenshareStream } = useRecordContext();
  const updateCameraSource = useVideoSource(cameraStream);
  const updateScreenshareSource = useVideoSource(screenshareStream);

  const screenshareWidth = 1920;
  const screenshareHeight = 1080;

  return (
    <div className="relative w-full h-auto">
      {screenshareStream || layout === 'camera' ? (
        <video
          className={cn('max-w-full h-auto w-full max-h-[520px]', layout === 'camera' ? 'scale-x-[-1]' : '')}
          ref={layout === 'camera' ? updateCameraSource : updateScreenshareSource}
          autoPlay
          playsInline
          muted
        />
      ) : (
        <Placeholder />
      )}

      {layout === 'screen-and-camera' && cameraStream && !screenshareStream && (
        <video
          className={'absolute rounded-[8px] object-cover scale-x-[-1]'}
          ref={updateCameraSource}
          style={{
            right: percentage(CAMERA_MARGIN_RIGHT / screenshareWidth),
            bottom: percentage(CAMERA_MARGIN_BOTTOM / screenshareHeight),
            width: percentage(CAMERA_WIDTH / screenshareWidth),
            height: percentage(CAMERA_HEIGHT / screenshareHeight),
            borderRadius: [
              percentage(CAMERA_BORDER_RADIUS / CAMERA_WIDTH),
              percentage(CAMERA_BORDER_RADIUS / CAMERA_HEIGHT),
            ].join('/'),
          }}
          autoPlay
          playsInline
          muted
        />
      )}
    </div>
  );
};
