import React, { useState } from "react";
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
import { TaskForm } from "./TaskForm";
import { TaskFilters } from "./TaskFilters";
import { TaskList } from "./TaskList";

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

  const handleEdit = (task: Task) => {
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

        <TaskForm
          newTask={newTask}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          isEditing={editingId !== null}
        />

        <TaskFilters
          filter={filter}
          sortByDate={sortByDate}
          onFilterChange={(value) => dispatch(setFilter(value))}
          onSortToggle={() => dispatch(toggleSort())}
        />

        <TaskList
          tasks={filteredTasks}
          onToggleStatus={(id) => dispatch(toggleTaskStatus(id))}
          onEdit={handleEdit}
          onDelete={(id) => dispatch(deleteTask(id))}
        />
      </div>
    </div>
  );
};

export default TaskManager;
