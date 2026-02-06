"use client";

import { useRouter } from "next/navigation";
import { useCreateTodo } from "@/services/Todos/createTodo";
import { showToast } from "@/lib/toast";
import { TodoForm } from "@/container/Todos/CreateTodo/components/TodoForm";

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
          formData.categoryId && formData.categoryId !== "none"
            ? formData.categoryId
            : null,
      };

      await createTodo(payload);

      showToast.success("Todo created successfully!");
      router.push("/todos");
    } catch (error) {
      console.error("Failed to create todo:", error);
      showToast.error("Failed to create todo");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <button
            onClick={() => router.push("/todos")}
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
