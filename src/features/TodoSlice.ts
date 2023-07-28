import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoState } from "../types/TodoState";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  textColor: string;
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.textColor = todo.completed ? "red" : "black";
      }
    },
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, editTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
