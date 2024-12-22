import React from "react";
import { ChevronDown } from "lucide-react";

interface TaskFiltersProps {
  filter: "all" | "pending" | "completed";
  sortByDate: boolean;
  onFilterChange: (value: "all" | "pending" | "completed") => void;
  onSortToggle: () => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filter,
  sortByDate,
  onFilterChange,
  onSortToggle,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full sm:w-auto">
      <select
        value={filter}
        onChange={(e) =>
          onFilterChange(e.target.value as "all" | "pending" | "completed")
        }
        className="w-full sm:w-auto p-2 border rounded bg-white px-8 text-sm sm:text-base"
      >
        <option value="all">All Tasks</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <button
        onClick={onSortToggle}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border rounded hover:bg-gray-50 text-sm sm:text-base"
      >
        Sort by Date
        <ChevronDown
          className={`w-4 h-4 transform transition-transform ${
            sortByDate ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
};
