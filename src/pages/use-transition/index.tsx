import { PageLayout } from '@/components/page-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTransition } from 'react';

export const UseTransitionPage = () => {
  const [isPending, startTransition] = useTransition();

  const onClick = () =>
    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 3000));
    });

  return (
    <PageLayout title={`"useTransition" Showcase`}>
      <p>{`The "useTransition" hook allows the user to create a pending state, which waits for a function to finish.`}</p>
      <Card className="p-4 w-full">
        <div className="w-full flex items-center gap-4">
          <span>
            Click in the button to simulate a loading state using the <b>useTransition</b> hook
          </span>
          <Button onClick={onClick} disabled={isPending}>
            {isPending ? 'Pending...' : 'Init transition'}
          </Button>
        </div>
      </Card>
    </PageLayout>
  );
};
