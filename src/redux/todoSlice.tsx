import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { TodoInitialState, TodoTypes } from '../Types/Types'

const savedTodos = localStorage.getItem("todos");
const initialState : TodoInitialState = {
      todos: savedTodos ? JSON.parse(savedTodos) : [],
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    createTodo:(state:TodoInitialState, action:PayloadAction<TodoTypes>) => {
            state.todos=[...state.todos, action.payload]
            localStorage.setItem("todos", JSON.stringify(state.todos))
    },
    removeById: (state: TodoInitialState, action: PayloadAction<number>) => {
            state.todos = [...state.todos.filter((todo: TodoTypes) => todo.id !== action.payload)]
            localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
        state.todos = state.todos.map((todo) =>
            todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        );
    },
    editTodo: (state, action: PayloadAction<TodoTypes>) => {
            state.todos = state.todos.map((todo) =>
            todo.id === action.payload.id ? action.payload : todo
            
        );
        localStorage.setItem("todos", JSON.stringify(state.todos)); 
        }}})

export const { createTodo ,removeById, editTodo,toggleTodo } = todoSlice.actions

export default todoSlice.reducer