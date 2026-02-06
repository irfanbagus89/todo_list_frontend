'use client';

import { useState } from 'react';
import { Plus, X, Check, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function SubtaskList({ subtasks, onAdd, onToggleComplete, onDelete }) {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  const handleAdd = () => {
    if (newSubtaskTitle.trim()) {
      onAdd(newSubtaskTitle);
      setNewSubtaskTitle('');
    }
  };

  return (
    <div className="space-y-2">
      {/* Add Subtask Input */}
      <div className="flex gap-2">
        <Input
          placeholder="Add a subtask..."
          value={newSubtaskTitle}
          onChange={(e) => setNewSubtaskTitle(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              handleAdd();
            }
          }}
        />
        <Button
          onClick={handleAdd}
          variant="outline"
          size="icon"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Subtask List */}
      <div className="space-y-2">
        {subtasks?.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            No subtasks yet. Add one above to get started!
          </p>
        ) : (
          subtasks?.map((subtask) => (
            <div
              key={subtask.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-card"
            >
              <div className="flex items-center gap-3 flex-1">
                <Checkbox
                  id={`subtask-${subtask.id}`}
                  checked={subtask.completed}
                  onCheckedChange={() => onToggleComplete(subtask.id)}
                  className="h-4 w-4"
                />
                <div className="flex-1 min-w-0">
                  <span className={cn(
                    'text-sm',
                    subtask.completed && 'line-through text-muted-foreground'
                  )}>
                    {subtask.title}
                  </span>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => onDelete(subtask.id)}
                    className="text-destructive"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
