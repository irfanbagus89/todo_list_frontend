'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function CategoryForm({
  formData,
  handleChange,
  handleColorChange,
  handleSubmit,
  isCreating,
  errors,
  presetColors,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Category Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Work, Personal, Shopping"
          className={cn(errors.name && 'border-destructive')}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      {/* Color */}
      <div className="space-y-3">
        <Label htmlFor="color">Category Color</Label>
        <div className="flex items-center gap-3">
          <Input
            id="color"
            name="color"
            type="color"
            value={formData.color}
            onChange={handleChange}
            className="w-20 h-10 p-1 cursor-pointer"
          />
          <Input
            value={formData.color}
            onChange={handleChange}
            name="color"
            placeholder="#3B82F6"
            className="flex-1"
          />
        </div>

        {/* Preset Colors */}
        <div className="flex flex-wrap gap-2">
          {presetColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleColorChange(color)}
              className={cn(
                'w-8 h-8 rounded-full border-2 transition-all',
                formData.color === color
                  ? 'border-foreground scale-110'
                  : 'border-transparent hover:scale-105'
              )}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>

        {/* Preview */}
        <div className="mt-4 p-4 rounded-lg border">
          <Label className="text-sm text-muted-foreground">Preview</Label>
          <div
            className="mt-2 p-3 rounded-md text-white font-medium"
            style={{ backgroundColor: formData.color }}
          >
            {formData.name || 'Category Name'}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isCreating}
          className="flex-1"
        >
          {isCreating ? 'Creating...' : 'Create Category'}
        </Button>
      </div>
    </form>
  );
}
