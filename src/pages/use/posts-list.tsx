import { Card } from '@/components/ui/card';
import axios from 'axios';
import { use } from 'react';

type Post = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

const fetchPosts = axios.get<Array<Post>>('https://jsonplaceholder.typicode.com/posts').then((res) => res.data);

export function PostsList() {
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
