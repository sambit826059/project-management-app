import { create } from 'zustand';
import { Task, Status } from '../types';
import { db } from '../db';

interface TaskState {
  tasks: Task[];
  selectedTask: number | null;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (id: number, updates: Partial<Task>) => Promise<void>;
  updateTaskStatus: (id: number, status: Status) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  setSelectedTask: (id: number | null) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  selectedTask: null,
  addTask: async (task) => {
    const id = await db.tasks.add({
      ...task,
      createdAt: new Date(),
    });
    const tasks = await db.tasks.toArray();
    set({ tasks });
    return id;
  },
  updateTask: async (id, updates) => {
    await db.tasks.update(id, updates);
    const tasks = await db.tasks.toArray();
    set({ tasks });
  },
  updateTaskStatus: async (id, status) => {
    await db.tasks.update(id, { status });
    const tasks = await db.tasks.toArray();
    set({ tasks });
  },
  deleteTask: async (id) => {
    await db.tasks.delete(id);
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
      selectedTask: state.selectedTask === id ? null : state.selectedTask,
    }));
  },
  setSelectedTask: (id) => set({ selectedTask: id }),
}));