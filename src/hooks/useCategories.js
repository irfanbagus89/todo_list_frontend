import { useGetCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/services/Categories/getCategories';
import { useCreateCategory as useCreateCategoryService } from '@/services/Categories/createCategory';
import { useUpdateCategory as useUpdateCategoryService } from '@/services/Categories/updateCategory';
import { useDeleteCategory as useDeleteCategoryService } from '@/services/Categories/deleteCategory';
import { useCategoryStore } from '@/store/categoryStore';

export function useCategories() {
  const { categories, setCategories, addCategory, updateCategory: storeUpdateCategory, deleteCategory: storeDeleteCategory } = useCategoryStore();

  const { data: categoriesData, isLoading, error, mutate } = useGetCategories({});
  const { trigger: createCategory, isMutating: isCreating } = useCreateCategoryService();
  const { trigger: updateCategoryById, isMutating: isUpdating } = useUpdateCategoryService();
  const { trigger: deleteCategoryById, isMutating: isDeleting } = useDeleteCategoryService();
  const { selectedCategory } = useCategoryStore((state) => state.selectedCategory);

  const handleCreateCategory = async (categoryData) => {
    try {
      const newCategory = await createCategory(categoryData);
      addCategory(newCategory);
      mutate();
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const handleUpdateCategory = async (id, categoryData) => {
    try {
      const updatedCategory = await updateCategoryById(id, categoryData);
      storeUpdateCategory(id, updatedCategory);
      mutate();
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategoryById(id);
      storeDeleteCategory(id);
      mutate();
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return {
    categories,
    isLoading,
    error,
    selectedCategory,
    isCreating,
    isUpdating,
    isDeleting,
    createCategory: handleCreateCategory,
    updateCategory: handleUpdateCategory,
    deleteCategory: handleDeleteCategory,
    mutate,
  };
}
