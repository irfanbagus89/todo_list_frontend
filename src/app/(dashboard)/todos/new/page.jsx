import DashboardLayout from '@/layout/DashboardLayout/DashboardLayout';
import NewTodo from '@/container/Todos/CreateTodo';

export default function NewTodoPage() {
  return (
    <DashboardLayout>
      <NewTodo />
    </DashboardLayout>
  );
}
