export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: 'pending' | 'completed';
  }
  
  export interface NewTask {
    title: string;
    description: string;
    dueDate: string;
    status: 'pending' | 'completed';
  }
  