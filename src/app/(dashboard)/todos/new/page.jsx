'use client';

import { useRouter } from 'next/navigation';
import { useCreateTodo } from '@/services/Todos/createTodo';
import { showToast } from '@/lib/toast';
import { TodoForm } from '@/container/Todos/CreateTodo/components/TodoForm';

export default function NewTodo() {
  const router = useRouter();
  const { trigger: createTodo, isMutating: isCreating } = useCreateTodo();

const handleSubmit = async (formData) => {
  try {
    const payload = {
      title: formData.title,
      description: formData.description || null,
      priority: formData.priority,
      status: formData.status,

      due_date: formData.deadline
        ? new Date(formData.deadline).toISOString()
        : null,

      due_time: formData.dueTime || null,

      tags: formData.tags || [],

      category_id:
        formData.categoryId && formData.categoryId !== 'none'
          ? formData.categoryId
          : null,
    };

    await createTodo(payload);

    showToast.success('Todo created successfully!');
    router.push('/todos');
  } catch (error) {
    console.error('Failed to create todo:', error);
    showToast.error('Failed to create todo');
  }
};

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <button
            onClick={() => router.push('/todos')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Todos
          </button>
        </div>
        <TodoForm onSubmit={handleSubmit} isSubmitting={isCreating} />
      </div>
    </div>
  );
}
