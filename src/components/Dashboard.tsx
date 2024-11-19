import React, { useState } from 'react';
import { KanbanBoard } from './KanbanBoard';
import { CreateTaskDialog } from './CreateTaskDialog';
import { TaskDetails } from './TaskDetails';
import { Plus } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';

export function Dashboard() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const selectedTask = useTaskStore((state) => state.selectedTask);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">ProjectFlow Pro</h1>
            <button
              onClick={() => setIsCreateDialogOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Task
            </button>
          </div>
        </div>
      </header>

      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-200 ${
        selectedTask ? 'mr-[50vw]' : ''
      }`}>
        <KanbanBoard />
      </main>

      <CreateTaskDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
      
      <TaskDetails />
    </div>
  );
}