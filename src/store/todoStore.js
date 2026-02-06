import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTodoStore = create(
  persist(
    (set) => ({
      todos: [],
      selectedTodo: null,
      filters: {
        status: 'all',
        priority: 'all',
        categoryId: null,
        search: '',
      },
      setTodos: (todos) => set({ todos }),
      addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
      updateTodo: (id, updatedTodo) =>
        set((state) => ({
          todos: state.todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo)),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      setSelectedTodo: (todo) => set({ selectedTodo: todo }),
      setFilters: (filters) => set({ filters }),
      clearFilters: () =>
        set({
          filters: {
            status: 'all',
            priority: 'all',
            categoryId: null,
            search: '',
          },
        }),
    }),
    {
      name: 'todo-storage',
    }
  )
);
