import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Status } from '../types';
import { useTaskStore } from '../store/taskStore';
import { TaskColumn } from './TaskColumn';

const columns: { id: Status; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' },
];

export function KanbanBoard() {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as Status;

    // Only update if dropping over a column
    if (columns.some(col => col.id === overId)) {
      updateTaskStatus(activeId, overId);
    }
  };

  const handleDragEnd = () => {
    // We handle the actual drop in dragOver
  };

  return (
    <DndContext 
      sensors={sensors} 
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex gap-4 h-full overflow-x-auto p-4">
        {columns.map((column) => (
          <TaskColumn
            key={column.id}
            title={column.title}
            tasks={tasks.filter((task) => task.status === column.id)}
            status={column.id}
          />
        ))}
      </div>
    </DndContext>
  );
}