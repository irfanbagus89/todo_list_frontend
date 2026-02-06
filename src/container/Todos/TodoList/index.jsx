"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTodos } from "@/services/Todos/getTodos";
import { useCreateTodo } from "@/services/Todos/createTodo";
import { useUpdateTodo } from "@/services/Todos/updateTodo";
import { useDeleteTodo } from "@/services/Todos/deleteTodo";
import { TodoCard } from "./components/TodoCard";
import { TodoSearch } from "./components/TodoSearch";
import { TodoFilters } from "./components/TodoFilters";

export default function TodoList() {
  const router = useRouter();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const {
    data: todos,
    isLoading,
    error,
    mutate,
  } = useGetTodos({ page: 1, limit: 20 });
  const { trigger: updateTodo } = useUpdateTodo();
  const { trigger: deleteTodo } = useDeleteTodo();
  console.log("Todos:", todos);
  const [filters, setFilters] = useState({
    priority: "all",
    status: "all",
    sortBy: "dueDate",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  const filteredTodos = todos?.data?.filter((todo) => {
    // Priority filter
    if (filters.priority !== "all" && todo.priority !== filters.priority) {
      return false;
    }

    // Status filter
    if (filters.status !== "all" && todo.status !== filters.status) {
      return false;
    }

    // Search filter
    if (
      searchQuery &&
      !todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const sortedTodos = [...(filteredTodos || [])].sort((a, b) => {
    if (filters.sortBy === "dueDate") {
      return new Date(a.deadline) - new Date(b.deadline);
    } else if (filters.sortBy === "priority") {
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3, none: 4 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (filters.sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const handleToggleComplete = async (id) => {
    try {
      await updateTodo({ id, data: { status: "completed" } });
      showToast.success("Todo marked as completed!");
      mutate();
    } catch (error) {
      console.error("Failed to update todo:", error);
      showToast.error("Failed to update todo");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      try {
        await deleteTodo(id);
        showToast.success("Todo deleted successfully!");
        mutate();
      } catch (error) {
        console.error("Failed to delete todo:", error);
        showToast.error("Failed to delete todo");
      }
    }
  };

  const handleEdit = (todo) => {
    router.push(`/todos/${todo.id}`);
  };

  if (authLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-40" />
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
            <p className="text-destructive">Failed to load todos</p>
            <Button onClick={() => mutate()} variant="outline" className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!todos || !todos.data || todos.data.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-12">
            <p className="text-lg font-medium mb-2">No todos yet</p>
            <p className="text-sm text-muted-foreground mb-6">
              Start by creating your first todo to get organized!
            </p>
            <Button onClick={() => router.push("/todos/new")}>
              Create Your First Todo
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
        <h1 className="text-3xl font-bold">My Todos</h1>
        <Button onClick={() => router.push("/todos/new")}>
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
          Add Todo
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <TodoSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <TodoFilters filters={filters} setFilters={setFilters} />
      </div>

      {/* Todo List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onDelete={() => handleDelete(todo.id)}
          />
        ))}
      </div>

      {/* Loading more indicator */}
      {isLoading && todos && todos.data && todos.data.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={() => mutate()}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
