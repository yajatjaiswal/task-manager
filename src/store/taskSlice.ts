import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, NewTask } from "../types/task";

interface TaskState {
  tasks: Task[];
  filter: "all" | "pending" | "completed";
  sortByDate: boolean;
}

const initialState: TaskState = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  filter: "pending",
  sortByDate: false,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<NewTask>) => {
      const newTask: Task = {
        ...action.payload,
        id: Date.now(),
      };
      state.tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleTaskStatus: (state, action: PayloadAction<number | undefined>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? {
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
            }
          : task
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "pending" | "completed">
    ) => {
      state.filter = action.payload;
    },
    toggleSort: (state) => {
      state.sortByDate = !state.sortByDate;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  setFilter,
  toggleSort,
} = taskSlice.actions;

export default taskSlice.reducer;
