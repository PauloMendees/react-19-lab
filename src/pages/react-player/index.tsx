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
          href="https://www.npmjs.com/package/react-player"
          className="bg-gray-200 px-2 rounded-md cursor-pointer hover:opacity-70 duration-200"
          target="_blank"
          rel="noopener noreferer"
        >
          here
        </a>{' '}
        to see npm documentation
      </p>
      <h2 className="font-bold">Youtube</h2>
      <Suspense fallback={<Skeleton />}>
        <VideoPlayer
          src={'https://www.youtube.com/watch?v=u31qwQUeGuM'}
          onPause={() => console.log('Pause')}
          onPlay={() => console.log('Play')}
          onProgress={(state) => console.log(state)}
          progressInterval={500}
          onSeek={(seconds) => console.log(`Seeked to: ${seconds}`)}
        />
      </Suspense>
      <br />
      <h2 className="font-bold">External source (cloudfare)</h2>
      <Suspense fallback={<Skeleton />}>
        <VideoPlayer
          src="https://customer-pbkwsh8u7tv1cfs9.cloudflarestream.com/774cdbb03ce874c0a473e2ccb844338e/manifest/video.m3u8"
          onPause={() => console.log('Pause')}
          onPlay={() => console.log('Play')}
          onProgress={(state) => console.log(state)}
          progressInterval={500}
          onSeek={(seconds) => console.log(`Seeked to: ${seconds}`)}
        />
      </Suspense>
      <br />
      <h2 className="font-bold">Customization</h2>
      <p>
        Its not implemented, but its possible. See example{' '}
        <a
          className="bg-gray-200 px-2 rounded-md cursor-pointer hover:opacity-70 duration-200"
          target="_blank"
          rel="noopener noreferer"
          href="https://oluwadaprof.medium.com/how-to-implement-custom-controls-with-react-player-%EF%B8%8F-a-step-by-step-guide-with-8068e2717590"
        >
          here
        </a>
      </p>
    </PageLayout>
  );
};
