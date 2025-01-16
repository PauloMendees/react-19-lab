import { Suspense, use } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { PageLayout } from '@/components/page-layout';

type Post = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

const fetchPosts = axios.get<Array<Post>>('https://jsonplaceholder.typicode.com/posts').then((res) => res.data);

function PostsList() {
  const posts = use(fetchPosts);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols2 lg:grid-cols-3 gap-4">
      {posts.map((item) => (
        <Card className="p-4 flex flex-col gap-3" key={item.id}>
          <span>{item.id}</span>
          <h3 className="font-bold text-xl">{item.title}</h3>
          <p>{item.body}</p>
        </Card>
      ))}
    </div>
  );
}

export function UsePage() {
  return (
    <PageLayout title={`"use" Showcase`}>
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
