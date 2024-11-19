import React, { useState } from 'react';
import { X, Calendar, User, Tag, Edit2 } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import { RichTextEditor } from './RichTextEditor';
import { format } from 'date-fns';
import { EditTaskDialog } from './EditTaskDialog';

export function TaskDetails() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const selectedTask = useTaskStore((state) => state.selectedTask);
  const tasks = useTaskStore((state) => state.tasks);
  const setSelectedTask = useTaskStore((state) => state.setSelectedTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const task = tasks.find((t) => t.id === selectedTask);

  if (!task) return null;

  return (
    <>
      <div className="fixed inset-y-0 right-0 w-1/2 bg-white shadow-xl border-l border-gray-200 overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-semibold text-gray-900">Task Details</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditDialogOpen(true)}
                className="p-1 hover:bg-gray-100 rounded group/edit"
                title="Edit task"
              >
                <Edit2 size={20} className="text-gray-500" />
                <span className="absolute hidden group-hover/edit:block bg-gray-800 text-white text-xs px-2 py-1 rounded -bottom-8 right-0 whitespace-nowrap">
                  Edit task
                </span>
              </button>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-1 hover:bg-gray-100 rounded group/close"
                title="Close details"
              >
                <X size={20} className="text-gray-500" />
                <span className="absolute hidden group-hover/close:block bg-gray-800 text-white text-xs px-2 py-1 rounded -bottom-8 right-0 whitespace-nowrap">
                  Close details
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <input
              type="text"
              value={task.title}
              onChange={(e) => updateTask(task.id, { title: e.target.value })}
              className="text-2xl font-bold w-full border-none p-0 focus:ring-0"
            />
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{format(task.createdAt, 'MMM d, yyyy')}</span>
            </div>
            {task.assignee && (
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{task.assignee}</span>
              </div>
            )}
          </div>

          {task.labels.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {task.labels.map((label) => (
                  <span
                    key={label}
                    className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4">
            <RichTextEditor
              content={task.content || ''}
              onChange={(content) => updateTask(task.id, { content })}
            />
          </div>
        </div>
      </div>

      <EditTaskDialog
        task={task}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      />
    </>
  );
}