import React from 'react';
import { Status, Task } from '../types';
import { TaskCard } from './TaskCard';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: Status;
}

export function TaskColumn({ title, tasks, status }: TaskColumnProps) {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div className="flex-shrink-0 w-80 bg-gray-50 rounded-lg p-4">
      <h2 className="font-semibold text-gray-900 mb-4">{title}</h2>
      <div
        ref={setNodeRef}
        className="space-y-3"
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}