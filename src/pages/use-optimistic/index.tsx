import { PageLayout } from '@/components/page-layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useOptimistic, useState } from 'react';

type Todos = {
  text: string;
  title: string;
  saving?: boolean;
};

export const UseOptimisticPage = () => {
  // Simulate state comming from backend
  const [todos, setTodos] = useState<Todos[]>([
    {
      title: 'Default 01',
      text: 'Default text 01',
    },
  ]);

  // optimistic items
  const [optimisticTodos, addOptimisticTodo] = useOptimistic<Todos[], Todos>(
    todos,
    (actualState: Todos[], newTodo: Todos) => [...actualState, { ...newTodo, saving: true }],
  );

  async function createNewTodoAction() {
    const newTodo = {
      title: 'Added todo',
      text: 'Added by optimistic todo',
    };

    // Optimistically add new todo
    addOptimisticTodo(newTodo);

    // Simulate API call or async operation
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

    // After delay, update todos with actual API response or processing result
    setTodos((currentTodos) => [
      ...currentTodos,
      { ...newTodo, pending: false }, // Mark as not pending after operation completes
    ]);
  }

  return (
    <PageLayout title={`"useOptimistic" Showcase`}>
      <p>{`The "useOptimistic" is a React Hook that lets you show a different state while an async action is underway.`}</p>
      <p>Click in "Add todo" button to simulate a creation using the optimistic hook</p>
      <div className="w-full grid grid-cols-1 md:grid-cols2 lg:grid-cols-3 gap-4">
        {optimisticTodos.map((todo, index) => (
          <Card className="p-4 w-full" key={index}>
            {todo.title}
            {todo.saving ? ' - (Saving)' : ''}
            <br />
            {todo.text}
          </Card>
        ))}
      </div>
      {/* this hook only works with the "action" function */}
      <form action={createNewTodoAction}>
        <Button type="submit">Add todo</Button>
      </form>
    </PageLayout>
  );
};
