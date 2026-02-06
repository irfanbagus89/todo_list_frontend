import { useGetTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from '@/services/Todos/getTodos';
import { useGetTodoById } from '@/services/Todos/getTodoById';
import { useCreateTodo as useCreateTodoService } from '@/services/Todos/createTodo';
import { useUpdateTodo as useUpdateTodoService } from '@/services/Todos/updateTodo';
import { useDeleteTodo as useDeleteTodoService } from '@/services/Todos/deleteTodo';
import { useTodoStore } from '@/store/todoStore';

export function useTodos() {
  const { todos, setTodos, addTodo, updateTodo: storeUpdateTodo, deleteTodo: storeDeleteTodo } = useTodoStore();

  const { data: todosData, isLoading, error, mutate } = useGetTodos({});
  const { trigger: createTodo, isMutating: isCreating } = useCreateTodoService();
  const { trigger: updateTodoById, isMutating: isUpdating } = useUpdateTodoService();
  const { trigger: deleteTodoById, isMutating: isDeleting } = useDeleteTodoService();
  const { data: selectedTodo } = useGetTodoById();

  const handleCreateTodo = async (todoData) => {
    try {
      const newTodo = await createTodo(todoData);
      addTodo(newTodo);
      mutate();
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    try {
      const updatedTodo = await updateTodoById(id, todoData);
      storeUpdateTodo(id, updatedTodo);
      mutate();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodoById(id);
      storeDeleteTodo(id);
      mutate();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return {
    todos,
    isLoading,
    error,
    selectedTodo,
    isCreating,
    isUpdating,
    isDeleting,
    createTodo: handleCreateTodo,
    updateTodo: handleUpdateTodo,
    deleteTodo: handleDeleteTodo,
    mutate,
  };
}
