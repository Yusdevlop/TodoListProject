import { useSelector } from "react-redux"
import Todo from "./Todo"
import type { RootState } from "../redux/store"
import type { TodoTypes } from "../Types/Types"

function TodoList() {

  const {todos} = useSelector((state:RootState)=> state.todo)
  return (
    <div>
        {todos && todos.map((todo:TodoTypes) => (
          <Todo key={todo.id} todoProps ={todo} />
        ))}
    </div>
  )
}

export default TodoList
