import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { toggleTaskStatus, setFilter, toggleSort } from "../store/taskSlice";

import { TaskForm } from "./TaskForm";
import { TaskFilters } from "./TaskFilters";
import { TaskList } from "./TaskList";

const TaskManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, filter, sortByDate } = useAppSelector((state) => state.tasks);

  const filteredTasks = tasks
    .filter((task) => (filter === "all" ? true : task.status === filter))
    .sort((a, b) =>
      sortByDate
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : 0
    );

  return (
    <div className="min-h-screen bg-gray-100 p-4 ">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Task Manager</h1>

        <TaskForm isEditing={false} />

        {tasks.length > 0 && (
          <TaskFilters
            filter={filter}
            sortByDate={sortByDate}
            onFilterChange={(value) => dispatch(setFilter(value))}
            onSortToggle={() => dispatch(toggleSort())}
          />
        )}

        <TaskList
          tasks={filteredTasks}
          onToggleStatus={(id) => dispatch(toggleTaskStatus(id))}
        />
      </div>
    </div>
  );
};

export default TaskManager;
