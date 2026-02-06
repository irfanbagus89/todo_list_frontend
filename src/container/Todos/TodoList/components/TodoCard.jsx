'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Tag, 
  MoreVertical, 
  Check, 
  Trash2, 
  Edit2,
  AlertCircle,
  Circle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export function TodoCard({ todo, onToggleComplete, onEdit, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
    urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  };

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
    in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  };

  const isOverdue = todo.deadline && new Date(todo.deadline) < new Date();

  return (
    <Card className={cn(
      'transition-all duration-200 hover:shadow-md',
      todo.status === 'completed' && 'opacity-60'
    )}>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox
              id={`todo-${todo.id}`}
              checked={todo.status === 'completed'}
              onCheckedChange={() => onToggleComplete(todo.id)}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={priorityColors[todo.priority]}>
                  {todo.priority}
                </Badge>
                {todo.deadline && (
                  <span className={cn(
                    'flex items-center gap-1 text-xs',
                    isOverdue && 'text-red-600 dark:text-red-400'
                  )}>
                    <Clock className="h-3 w-3" />
                    {format(new Date(todo.deadline), 'MMM dd')}
                  </span>
                )}
              </div>
              <h3 className={cn(
                'font-medium',
                todo.status === 'completed' && 'line-through text-muted-foreground'
              )}>
                {todo.title}
              </h3>
            </div>
          </div>

          {/* Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(todo)}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(todo.id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Description */}
        {todo.description && (
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
            {todo.description}
          </p>
        )}

        {/* Tags */}
        {todo.tags && todo.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {todo.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Category */}
        {todo.category && (
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {todo.category}
            </Badge>
          </div>
        )}

        {/* Subtasks */}
        {todo.subtasks && todo.subtasks.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Circle className={cn(
                'h-4 w-4 transition-transform',
                isExpanded && 'rotate-90'
              )} />
              {todo.subtasks.filter((s) => s.completed).length}/{todo.subtasks.length} subtasks
            </button>
            
            {isExpanded && (
              <div className="mt-2 space-y-2 pl-4 border-l-2 border-border">
                {todo.subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center gap-2">
                    <Checkbox
                      checked={subtask.completed}
                      className="h-4 w-4"
                    />
                    <span className={cn(
                      'text-sm',
                      subtask.completed && 'line-through text-muted-foreground'
                    )}>
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
