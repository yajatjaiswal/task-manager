import React, { useState } from "react";
import { Calendar, Trash2, Edit, Check, X, ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  setFilter,
  toggleSort,
} from "../store/taskSlice";
import { Task, NewTask } from "../types/task";
import { format } from "date-fns";

const initialNewTask: NewTask = {
  title: "",
  description: "",
  dueDate: "",
  status: "pending",
};

const TaskManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, filter, sortByDate } = useAppSelector((state) => state.tasks);
  const [newTask, setNewTask] = useState<NewTask>(initialNewTask);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.dueDate) return;

    if (editingId !== null) {
      dispatch(updateTask({ ...newTask, id: editingId }));
      setEditingId(null);
    } else {
      dispatch(addTask(newTask));
    }

    setNewTask(initialNewTask);
  };

  const editTask = (task: Task) => {
    setNewTask(task);
    setEditingId(task.id);
  };

  const filteredTasks = tasks
    .filter((task) => (filter === "all" ? true : task.status === filter))
    .sort((a, b) =>
      sortByDate
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : 0
    );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Task Manager</h1>

        {/* Task Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6 mb-8"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                maxLength={50}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                rows={3}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {editingId !== null ? "Update Task" : "Add Task"}
          </button>
        </form>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={filter}
            onChange={(e) =>
              dispatch(
                setFilter(e.target.value as "all" | "pending" | "completed")
              )
            }
            className="p-2 border rounded bg-white"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={() => dispatch(toggleSort())}
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded hover:bg-gray-50"
          >
            Sort by Date
            <ChevronDown
              className={`w-4 h-4 transform transition-transform ${
                sortByDate ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-lg shadow p-4 ${
                task.status === "completed" ? "opacity-75" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  {task.description && (
                    <p className="text-gray-600 mt-1">{task.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(task.dueDate), "MMM dd, yyyy")}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => dispatch(toggleTaskStatus(task.id))}
                    className={`p-2 rounded ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {task.status === "completed" ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Check className="w-5 h-5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => editTask(task)}
                    className="p-2 bg-blue-100 text-blue-600 rounded"
                  >
                    <Edit className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => dispatch(deleteTask(task.id))}
                    className="p-2 bg-red-100 text-red-600 rounded"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">No tasks found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
