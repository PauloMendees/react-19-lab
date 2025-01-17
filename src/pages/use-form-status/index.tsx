import { PageLayout } from '@/components/page-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const action = async () =>
  await new Promise<void>((res) => {
    setTimeout(res, 3000);
  });

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'useFormStatus pending state' : 'Login'}
    </Button>
  );
};

export const UseFormStatusPage = () => {
  const onSubmit = async () => {
    try {
      await action();
      return {
        error: false,
        data: [{ user: 'test' }],
      };
    } catch (error) {
      return {
        error: true,
        data: [],
      };
    }
  };

  const [data, submitAction, isPending] = useActionState(onSubmit, {
    error: false,
    data: [],
  });

  return (
    <PageLayout title={`"useFormStatus" & "useActionState" Showcase`}>
      <p>{`The "useFormStatus" hook allows the user check if the action function of form is awaiting.`}</p>

      <Card className="p-4 max-w-[350px] w-full">
        <form action={submitAction} className="flex flex-col gap-4 w-full">
          <Input className="w-full" value={'paulo.h.mendes25@gmail.com'} />
          <Input className="w-full" value={'12345678'} type="password" />
          <SubmitButton />
          <p>useActionState hook pending state: {isPending ? 'true' : 'false'}</p>
          <p>{JSON.stringify(data)}</p>
        </form>
      </Card>
    </PageLayout>
  );
};
