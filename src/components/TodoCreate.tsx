import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../redux/todoSlice";
import type { TodoTypes } from "../Types/Types";
import TodoList from './TodoList'


function todoCreate() {

  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const todos = useSelector((state: any) => state.todo.todos);
  const total =todos.length;
  const completedTodos = todos.filter((todo:any) => todo.completed).length;
  const progress = total > 0 ? (completedTodos / total) * 100 : 0;

  const dispatch = useDispatch();
  const handleButtonClick = () => {
    if (inputValue.trim().length === 0) {
      setMessage('Zəhmət olmasa bir şey yaz!');
      setErrorMessage(true);
      setTimeout(() => setMessage(''), 3000);
      return;
    }

  setMessage('Todo əlavə edildi!');
  setErrorMessage(false);

  const payload: TodoTypes = {
    id: Math.floor(Math.random() * 1532),
    content: inputValue,
    completed: false
  };
  
 

  dispatch(createTodo(payload));
  setInputValue('');
  setTimeout(() => setMessage(''), 3000);
};
  return (  
    
    <div >
        
        <div id="container">
           {message && (
            <div className={`alert-message ${errorMessage ? 'error' : 'success'}`}>
              {message}
            </div>
        )}

          <div className="stats-container">
            <div  className="details">
              <h1>Todo App</h1>
              <p style={{marginTop:"10px"}}>
                {todos.length > 2 && "Davam Et Əlasan"}
                {todos.length<=2 &&"Todo Əlave etməyə başla:)"}
              </p>
              <div  id="progress-bar">
                
                <div id="progress" style={{
                     width: `${progress}%`,
                      height: "100%",
                      borderRadius: "10px",
                      transition: "width 0.3s ease-in-out",
                      backgroundColor: "#8c00ff",
                      boxShadow: "0 0 0px 1px #8c00ff",  // glow effekti üçün
                      filter: "drop-shadow(0 0  12px #8c00ff)",
                  }}
          ></div>
            </div>
            </div>
          <div className="made-todo">
            <div id="numbers">{completedTodos}/{todos.length}</div>
          </div>
    </div>
    </div>  
      <div  className="todo-create">
          <input  value={inputValue} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setInputValue(e.target.value)} className="todo-input" type="text" placeholder="Add a new todo" />
          <button onClick={handleButtonClick} className="todo-button">Add Todo</button>
      </div>
      <TodoList />
    </div>
  )
}

export default todoCreate
