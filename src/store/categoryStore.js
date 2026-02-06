import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCategoryStore = create(
  persist(
    (set) => ({
      categories: [],
      selectedCategory: null,
      setCategories: (categories) => set({ categories }),
      addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
      updateCategory: (id, updatedCategory) =>
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === id ? { ...category, ...updatedCategory } : category
          ),
        })),
      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== id),
        })),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
    }),
    {
      name: 'category-storage',
    }
  )
);
