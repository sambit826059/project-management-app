export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'review' | 'done';

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee?: string;
  dueDate?: Date;
  createdAt: Date;
  labels: string[];
  content?: string;
}