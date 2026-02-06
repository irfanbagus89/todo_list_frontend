"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import { Search } from "lucide-react";
import { useGetCategories } from "@/services/Categories/getCategories";
import { useDeleteCategory } from "@/services/Categories/deleteCategory";
import { CategoryCard } from "./components/CategoryCard";

export default function CategoryList() {
  const router = useRouter();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { data: categories, isLoading, error, mutate } = useGetCategories();
  const { trigger: deleteCategory } = useDeleteCategory();
  const [searchQuery, setSearchQuery] = useState("");
  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);
  const filteredCategories = categories?.data?.filter((category) => {
    if (
      searchQuery &&
      !category.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        showToast.success("Category deleted successfully!");
        mutate();
      } catch (error) {
        console.error("Failed to delete category:", error);
        showToast.error("Failed to delete category");
      }
    }
  };

  const handleEdit = (category) => {
    router.push(`/categories/${category.id}/edit`);
  };

  if (authLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-destructive">Failed to load categories</p>
            <Button onClick={() => mutate()} variant="outline" className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!categories || !categories.data || categories.data.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-12">
            <p className="text-lg font-medium mb-2">No categories yet</p>
            <p className="text-sm text-muted-foreground mb-6">
              Create categories to organize your todos!
            </p>
            <Button onClick={() => router.push("/categories/new")}>
              Create Your First Category
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button onClick={() => router.push("/categories/new")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14m0 0h-6"
            />
          </svg>
          Add Category
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={handleEdit}
            onDelete={() => handleDelete(category.id)}
          />
        ))}
      </div>

      {/* Loading more indicator */}
      {isLoading && categories && categories?.data?.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={() => mutate()}>
            Refresh
          </Button>
        </div>
      )}
    </div>
  );
}
