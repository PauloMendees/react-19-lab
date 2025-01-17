import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { PageLayout } from '@/components/page-layout';
import { PostsList } from './posts-list';

export function UsePage() {
  return (
    <PageLayout title={`"use" Showcase`}>
      <p>{`The "use" hook puts the Suspense tag in fallback mode if the callback function is still awaiting.`}</p>
      <Suspense
        fallback={
          <div className="w-full grid grid-cols-1 md:grid-cols2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-[120px]" />
            ))}
          </div>
        }
      >
        <PostsList />
      </Suspense>
    </PageLayout>
  );
}
