
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { TodoInitialState, TodoTypes } from '../Types/Types'
import {  db } from '../config/Firebase';
import {  addDoc, collection,  } from 'firebase/firestore';
import type { User } from 'firebase/auth';


const initialState : TodoInitialState = {
      todos: [] 
}

export const addTodoToFirebase = async (user: User, todo: TodoTypes) => {
        if (!user?.uid) return;
        const pushFirebase = collection(db, "todos");
        const obj = {
                ...todo,
                userId: user.uid,
        };
        await addDoc(pushFirebase, obj);
    }

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    createTodo:(state:TodoInitialState, action:PayloadAction<TodoTypes>) => {
            state.todos=[...state.todos, action.payload]
    },
    removeById: (state: TodoInitialState, action: PayloadAction<number>) => {
            state.todos = [...state.todos.filter((todo: TodoTypes) => todo.id !== action.payload)]
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
    },

}});

export const { createTodo ,removeById, editTodo,toggleTodo } = todoSlice.actions

export default todoSlice.reducer