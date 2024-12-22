import React from "react";
import { Task } from "../types/task";
import { TaskCard } from "./TaskCard";
import { ClipboardList } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (id: number | undefined) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleStatus,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-gray-100 rounded-full">
            <ClipboardList className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">
            No Tasks Found
          </h3>
          <p className="text-gray-500 max-w-sm">
            You haven't created any tasks yet. Click the "Add New Task" button
            above to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggleStatus={onToggleStatus} />
      ))}
    </div>
  );
};
