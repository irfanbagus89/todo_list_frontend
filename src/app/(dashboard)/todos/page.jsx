import DashboardLayout from '@/layout/DashboardLayout/DashboardLayout';
import TodoList from '@/container/Todos/TodoList';

export default function TodosPage() {
  return (
    <DashboardLayout>
      <TodoList />
    </DashboardLayout>
  );
}
