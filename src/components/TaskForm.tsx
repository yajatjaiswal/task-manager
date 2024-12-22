import React, { useState } from "react";
import { NewTask } from "../types/task";
import { X, Plus, Edit } from "lucide-react";
import { updateTask } from "../store/taskSlice";
import { addTask } from "../store/taskSlice";
import { useAppDispatch } from "../hooks/redux";

interface TaskFormProps {
  initialNewTask?: NewTask;
  editingId?: number;
  isEditing: boolean;
}
const resetTask: NewTask = {
  title: "",
  description: "",
  dueDate: "",
  status: "pending",
};

export const TaskForm: React.FC<TaskFormProps> = ({
  initialNewTask,
  editingId,
  isEditing,
}) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [newTask, setNewTask] = useState<NewTask>(initialNewTask || resetTask);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const validateData = (title: string, dueDate: string) => {
    if (title.length > 50) {
      alert("Title must be less than 50 characters");
      return false;
    }
    if (dueDate.length === 0) {
      alert("Due date is required");
      return false;
    }
    const currentDate = new Date().toISOString().split("T")[0];
    if (dueDate < currentDate) {
      alert("Due date must be today or a future date");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.dueDate) return;

    if (!validateData(newTask.title, newTask.dueDate)) {
      return;
    }

    if (isEditing) {
      dispatch(updateTask({ ...newTask, id: editingId }));
    } else {
      dispatch(addTask(newTask));
      setNewTask(resetTask);
    }
    setIsOpen(false);
  };

  return (
    <>
      <div>
        {!isEditing ? (
          <button
            onClick={() => setIsOpen(true)}
            className="mb-8 flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add New Task
          </button>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="p-1 sm:p-2 bg-blue-100 text-blue-600 rounded-full transition-all duration-200 hover:bg-blue-200 hover:scale-110"
          >
            <Edit className="w-3 h-3 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl relative animate-fadeIn">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <form onSubmit={handleSubmit} className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {isEditing ? "Edit Task" : "Add New Task"}
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                    Title <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    maxLength={50}
                    required
                    className="w-full p-3.5 border-2 border-transparent bg-gray-50 rounded-lg placeholder-gray-400 focus:border-purple-500 focus:bg-white transition-all duration-300 outline-none shadow-sm hover:shadow-md focus:shadow-lg"
                    placeholder="Enter task title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                    Due Date <span className="text-cyan-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3.5 border-2 border-transparent bg-gray-50 rounded-lg focus:border-cyan-500 focus:bg-white transition-all duration-300 outline-none shadow-sm hover:shadow-md focus:shadow-lg"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    className="w-full p-3.5 border-2 border-transparent bg-gray-50 rounded-lg placeholder-gray-400 focus:border-violet-500 focus:bg-white transition-all duration-300 outline-none shadow-sm hover:shadow-md focus:shadow-lg resize-none"
                    rows={3}
                    placeholder="Add task details..."
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  {isEditing ? "Update Task" : "Add Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
