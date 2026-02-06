"use client";

import { useRouter, useParams } from "next/navigation";
import { showToast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useGetCategories } from "@/services/Categories/getCategories";
import { useUpdateTodo } from "@/services/Todos/updateTodo";
import { useDeleteTodo } from "@/services/Todos/deleteTodo";
import { useGetTodoById } from "@/services/Todos/getTodoById";
import { useGetSubtasks } from "@/services/Subtasks/getSubtasks";
import { useCreateSubtask } from "@/services/Subtasks/createSubtask";
import { useUpdateSubtask } from "@/services/Subtasks/updateSubtask";
import { useDeleteSubtask } from "@/services/Subtasks/deleteSubtask";
import { SubtaskList } from "@/container/Todos/TodoDetail/components/SubtaskList";
import { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Clock,
  Tag,
  AlertCircle,
  CheckCircle2,
  Circle,
  Flame,
  Edit2,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import {
  formatDate,
  formatDateTime,
  formatShortDate,
  formatTime,
} from "@/lib/dateFormat";

export default function TodoDetail() {
  const router = useRouter();
  const params = useParams();

  const {
    data: todo,
    isLoading,
    error,
    mutate: mutateTodo,
  } = useGetTodoById(params.id);

  const { trigger: updateTodo } = useUpdateTodo();
  const { trigger: deleteTodo } = useDeleteTodo();

  const { data: subtasks, mutate: mutateSubtasks } = useGetSubtasks(
    params.id
  );

  const { trigger: createSubtask } = useCreateSubtask(params.id);
  const { trigger: updateSubtask } = useUpdateSubtask(params.id);
  const { trigger: deleteSubtask } = useDeleteSubtask(params.id);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Calculate subtask progress (must be before early returns)
  const subtaskProgress = useMemo(() => {
    if (!subtasks || subtasks.length === 0) return 0;
    const completed = subtasks.filter((s) => s.completed).length;
    return Math.round((completed / subtasks.length) * 100);
  }, [subtasks]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (todo?.Data) {
      setEditTitle(todo.Data.title);
      setEditDescription(todo.Data.description || "");
      setIsEditing(false);
    }
  }, [todo?.Data]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleSaveEdit = async () => {
    try {
      await updateTodo({
        id: params.id,
        data: {
          title: editTitle,
          description: editDescription,
        },
      });
      showToast.success("Todo updated successfully!");
      setIsEditing(false);
      mutateTodo();
    } catch {
      showToast.error("Failed to update todo");
    }
  };

  const handleAddSubtask = async (title) => {
    try {
      await createSubtask({ title, completed: false });
      showToast.success("Subtask added!");
      mutateSubtasks();
    } catch {
      showToast.error("Failed to add subtask");
    }
  };

  const handleToggleSubtask = async (subtaskId) => {
    try {
      await updateSubtask({
        subtaskId,
        data: {
          completed: !subtasks.find((s) => s.id === subtaskId)?.completed,
        },
      });
      mutateSubtasks();
    } catch {
      showToast.error("Failed to update subtask");
    }
  };

  const handleDeleteSubtask = async (subtaskId) => {
    if (confirm("Are you sure you want to delete this subtask?")) {
      try {
        await deleteSubtask(subtaskId);
        showToast.success("Subtask deleted!");
        mutateSubtasks();
      } catch {
        showToast.error("Failed to delete subtask");
      }
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      try {
        await deleteTodo(params.id);
        showToast.success("Todo deleted successfully!");
        router.push("/todos");
      } catch {
        showToast.error("Failed to delete todo");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <Skeleton className="h-40 w-full max-w-2xl" />
      </div>
    );
  }

  if (error || !todo?.Data) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-destructive">Failed to load todo</p>
            <Button
              onClick={() => router.push("/todos")}
              variant="outline"
              className="mt-4"
            >
              Back to Todos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Priority colors
  const priorityColors = {
    none: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    low: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    urgent: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  };

  const priorityIcons = {
    none: null,
    low: null,
    medium: <Flame className="h-3 w-3" />,
    high: <Flame className="h-3 w-3" />,
    urgent: <AlertCircle className="h-3 w-3" />,
  };

  // Status colors
  const statusColors = {
    pending: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    in_progress: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    completed: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  };

  const statusIcons = {
    pending: <Circle className="h-3 w-3" />,
    in_progress: <Clock className="h-3 w-3" />,
    completed: <CheckCircle2 className="h-3 w-3" />,
  };

  return (
    <div className="container mx-auto max-w-5xl p-4 md:p-6">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/todos")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Todos
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Todo Card */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="space-y-4">
            {/* Title and Edit Button */}
            <div className="flex items-start justify-between gap-4">
              {isEditing ? (
                <div className="flex-1 space-y-3">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Todo title"
                    className="text-lg font-semibold"
                  />
                </div>
              ) : (
                <div className="flex-1">
                  <CardTitle className="text-xl md:text-2xl">
                    {todo?.Data?.title}
                  </CardTitle>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (isEditing) {
                    handleSaveEdit();
                  } else {
                    setIsEditing(true);
                  }
                }}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Badges Row */}
            <div className="flex flex-wrap gap-2">
              {/* Priority Badge */}
              <Badge className={priorityColors[todo?.Data?.priority] || priorityColors.none}>
                {priorityIcons[todo?.Data?.priority]}
                <span className="ml-1 capitalize">
                  {todo?.Data?.priority || "none"}
                </span>
              </Badge>

              {/* Status Badge */}
              <Badge className={statusColors[todo?.Data?.status] || statusColors.pending}>
                {statusIcons[todo?.Data?.status]}
                <span className="ml-1 capitalize">
                  {todo?.Data?.status?.replace("_", " ") || "pending"}
                </span>
              </Badge>

              {/* Category Badge */}
              {todo?.Data?.category_id && (
                <Badge variant="outline">
                  {todo?.Data?.category?.name || "Category"}
                </Badge>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              {isEditing ? (
                <Input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Add description..."
                />
              ) : (
                <CardDescription className="text-base leading-relaxed whitespace-pre-wrap">
                  {todo?.Data?.description || "No description"}
                </CardDescription>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Due Date Section */}
            {(todo?.Data?.due_date || todo?.Data?.due_time) && (
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Due:{" "}
                    {todo?.Data?.due_date && formatShortDate(todo.Data.due_date)}
                    {todo?.Data?.due_time && ` at ${formatTime(todo.Data.due_time)}`}
                  </span>
                </div>
              </div>
            )}

            {/* Tags Section */}
            {todo?.Data?.tags && todo.Data.tags.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  <span>Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {todo.Data.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Progress Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-muted-foreground">Progress</span>
                <span className="text-muted-foreground">
                  {todo?.Data?.progress || 0}%
                </span>
              </div>
              <Progress value={todo?.Data?.progress || 0} className="h-2" />
            </div>

            {/* Subtask Progress */}
            {subtasks && subtasks.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-muted-foreground">Subtasks</span>
                  <span className="text-muted-foreground">
                    {subtasks.filter((s) => s.completed).length} / {subtasks.length}
                  </span>
                </div>
                <Progress value={subtaskProgress} className="h-2" />
              </div>
            )}

            {/* Meta Information */}
            <div className="pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {formatDateTime(todo?.Data?.created_at)}
                </div>
                <div>
                  <span className="font-medium">Updated:</span>{" "}
                  {formatDateTime(todo?.Data?.updated_at)}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button variant="destructive" onClick={handleDelete} className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete Todo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subtasks Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Subtasks</CardTitle>
            <CardDescription>
              {subtasks?.length} subtasks (
              {subtasks?.filter((s) => s.completed).length} completed)
            </CardDescription>
          </CardHeader>

          <CardContent>
            <SubtaskList
              subtasks={subtasks}
              onAdd={handleAddSubtask}
              onToggleComplete={handleToggleSubtask}
              onDelete={handleDeleteSubtask}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
