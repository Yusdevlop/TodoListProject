export interface TodoTypes {
  id: number;
  content: string;
  completed: boolean;
}

export interface TodoInitialState {
  todos: TodoTypes[];
}



