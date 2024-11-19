import Dexie, { type Table } from 'dexie';
import { Task } from '../types';

export class ProjectDB extends Dexie {
  tasks!: Table<Task>;

  constructor() {
    super('projectDB');
    this.version(1).stores({
      tasks: '++id, status, assignee',
    });
  }
}

export const db = new ProjectDB();