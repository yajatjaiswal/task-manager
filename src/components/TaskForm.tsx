import React from 'react';
import { NewTask } from '../types/task';

interface TaskFormProps {
  newTask: NewTask;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  newTask,
  onInputChange,
  onSubmit,
  isEditing,
}) => {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            rows={3}
          />
        </div>
      </div>
      
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        {isEditing ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};
