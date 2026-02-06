'use client';

import { useRouter, useParams } from 'next/navigation';
import { useGetTodoById, useCreateTodo } from '@/services/Todos';
import { showToast } from '@/lib/toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import TodoForm from './components/TodoForm';

export default function CreateTodo() {
  const router = useRouter();
  const params = useParams();
  const { data: todo, isLoading, error } = useGetTodoById(params.id);
  const { trigger: createTodo, isMutating: isCreating } = useCreateTodo();

  const handleSubmit = async (formData) => {
    try {
      await createTodo(formData);
      showToast.success('Todo created successfully!');
      router.push('/todos');
    } catch (error) {
      console.error('Failed to create todo:', error);
      showToast.error('Failed to create todo');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await createTodo({ ...formData, id: params.id });
      showToast.success('Todo updated successfully!');
      router.push('/todos');
    } catch (error) {
      console.error('Failed to update todo:', error);
      showToast.error('Failed to update todo');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-destructive">Failed to load todo</p>
            <Button onClick={() => router.push('/todos')} variant="outline" className="mt-4">
              Back to Todos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{todo ? 'Edit Todo' : 'Create New Todo'}</CardTitle>
          <CardDescription>
            {todo ? 'Update your todo details below' : 'Fill in the form below to create a new todo'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TodoForm
            todo={todo}
            onSubmit={todo ? handleUpdate : handleSubmit}
            isSubmitting={isCreating}
          />
        </CardContent>
      </Card>
    </div>
  );
}
