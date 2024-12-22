import React from 'react';
import { Calendar, Trash2, Edit, Check, X } from 'lucide-react';
import { Task } from '../types/task';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onToggleStatus: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow p-4 ${
        task.status === 'completed' ? 'opacity-75' : ''
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
            {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleStatus(task.id)}
            className={`p-2 rounded ${
              task.status === 'completed'
                ? 'bg-green-100 text-green-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {task.status === 'completed' ? (
              <X className="w-5 h-5" />
            ) : (
              <Check className="w-5 h-5" />
            )}
          </button>
          
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="p-2 bg-blue-100 text-blue-600 rounded"
          >
            <Edit className="w-5 h-5" />
          </button>
          
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="p-2 bg-red-100 text-red-600 rounded"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};