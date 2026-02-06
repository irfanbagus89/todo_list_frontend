import DashboardLayout from '@/layout/DashboardLayout/DashboardLayout';
import CategoryList from '@/container/Categories/CategoryList';

export default function CategoriesPage() {
  return (
    <DashboardLayout>
      <CategoryList />
    </DashboardLayout>
  );
}
