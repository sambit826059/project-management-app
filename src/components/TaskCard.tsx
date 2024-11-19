import React, { useState } from 'react';
import { format } from 'date-fns';
import { Clock, Edit2, Tag, Trash2, User } from 'lucide-react';
import { Task } from '../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EditTaskDialog } from './EditTaskDialog';
import { useTaskStore } from '../store/taskStore';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const setSelectedTask = useTaskStore((state) => state.setSelectedTask);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => setSelectedTask(task.id)}
        className="group bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow relative"
      >
        <div className="absolute right-2 top-2 hidden group-hover:flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditDialogOpen(true);
            }}
            className="p-1 hover:bg-gray-100 rounded group/edit"
            title="Edit task"
          >
            <Edit2 size={14} className="text-gray-500" />
            <span className="absolute hidden group-hover/edit:block bg-gray-800 text-white text-xs px-2 py-1 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              Edit task
            </span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Are you sure you want to delete this task?')) {
                deleteTask(task.id);
              }
            }}
            className="p-1 hover:bg-gray-100 rounded group/delete"
            title="Delete task"
          >
            <Trash2 size={14} className="text-gray-500" />
            <span className="absolute hidden group-hover/delete:block bg-gray-800 text-white text-xs px-2 py-1 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              Delete task
            </span>
          </button>
        </div>

        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-gray-900">{task.title}</h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              task.priority === 'high'
                ? 'bg-red-100 text-red-800'
                : task.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {task.priority}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {task.assignee && (
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{task.assignee}</span>
            </div>
          )}
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{format(task.dueDate, 'MMM d')}</span>
            </div>
          )}
        </div>

        {task.labels.length > 0 && (
          <div className="flex items-center gap-2 mt-3">
            <Tag size={14} className="text-gray-400" />
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
      </div>

      <EditTaskDialog
        task={task}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      />
    </>
  );
}