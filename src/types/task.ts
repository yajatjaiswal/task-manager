export interface Task {
  id: number | undefined;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "completed";
}

export interface NewTask {
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "completed";
}
