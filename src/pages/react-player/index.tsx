import { PageLayout } from '@/components/page-layout';
import { Skeleton } from '@/components/ui/skeleton';
import { VideoPlayer } from '@/components/video-player';
import { Suspense } from 'react';

export const ReactPlayerPage = () => {
  return (
    <PageLayout title={`"react-player" library Showcase`}>
      <p>
        Click{' '}
        <a
          className="bg-gray-200 px-2 rounded-md cursor-pointer hover:opacity-70 duration-200"
          href="https://www.npmjs.com/package/react-player"
          target="_blank"
          rel="noopener noreferer"
        >
          here
        </a>{' '}
        to see npm documentation
      </p>
      <Suspense fallback={<Skeleton />}>
        <VideoPlayer
          onPause={() => console.log('Pause')}
          onPlay={() => console.log('Play')}
          onProgress={(state) => console.log(state)}
          progressInterval={500}
          onSeek={(seconds) => console.log(`Seeked to: ${seconds}`)}
        />
      </Suspense>
    </PageLayout>
  );
};
