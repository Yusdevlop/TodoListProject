export interface TodoTypes {
  id: number;
  content: string;
  completed: boolean;
  userId: string;
}

export interface TodoInitialState {
  todos: TodoTypes[];
}


