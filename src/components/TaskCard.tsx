import React from "react";
import { Calendar, Trash2, Check, X } from "lucide-react";
import { Task } from "../types/task";
import { format } from "date-fns";
import { TaskForm } from "./TaskForm";
import { deleteTask } from "../store/taskSlice";
import { useDispatch } from "react-redux";

interface TaskCardProps {
  task: Task;
  onToggleStatus: (id: number | undefined) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleStatus }) => {
  const dispatch = useDispatch();
  const handleDelete = (id: number | undefined) => {
    if (id !== undefined) {
      dispatch(deleteTask(id));
    } else {
      alert("Task ID is undefined");
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 sm:p-6 ${
        task.status === "completed" ? "bg-gray-50" : ""
      }`}
    >
      <div
        className={`relative flex items-start justify-between gap-4 ${
          task.description.length === 0 ? "lg:pb-10 pb-4" : "lg:pb-4 pb-0"
        } `}
      >
        <div>
          <h3
            className={`text-base sm:text-lg font-semibold ${
              task.status === "completed"
                ? "line-through text-gray-500"
                : "text-gray-900"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`mt-2 text-sm sm:text-base ${
                task.status === "completed"
                  ? "line-through text-gray-400"
                  : "text-gray-600"
              }`}
            >
              {task.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className={task.status === "completed" ? "line-through" : ""}>
            {format(new Date(task.dueDate), "MMM dd, yyyy")}
          </span>
        </div>

        <div className="absolute bottom-0 right-0 flex items-center gap-2 sm:gap-3 lg:mt-4 mt-0 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => onToggleStatus(task.id)}
            className={`p-1 sm:p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              task.status === "completed"
                ? "bg-green-100 text-green-600 hover:bg-green-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title={
              task.status === "completed"
                ? "Mark as incomplete"
                : "Mark as complete"
            }
          >
            {task.status === "completed" ? (
              <X className="w-3 h-3 sm:w-5 sm:h-5" />
            ) : (
              <Check className="w-3 h-3 sm:w-5 sm:h-5" />
            )}
          </button>

          <TaskForm
            initialNewTask={task}
            editingId={task.id}
            isEditing={true}
          />

          <button
            type="button"
            onClick={() => handleDelete(task.id)}
            className="p-1 sm:p-2 bg-red-100 text-red-600 rounded-full transition-all duration-200 hover:bg-red-200 hover:scale-110"
            title="Delete task"
          >
            <Trash2 className="w-3 h-3 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
