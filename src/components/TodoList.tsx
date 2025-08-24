import Todo from "./Todo"
import type { TodoTypes } from "../Types/Types"
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../config/Firebase";
import { useEffect, useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState<TodoTypes[]>([]);

  async function getTodos() {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      console.log("User not logged in");
      return;
    }

    const q = query(
      collection(db, "todos"),
      where("userId", "==", uid)
    );

    const querySnapshot = await getDocs(q);

    const todosArray: TodoTypes[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: Number(doc.id),
        content: data.content,
        completed: data.completed,
        userId: data.userId
      };
    });

    setTodos(todosArray);
  }

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos, "todoss");

  return (
    <div>
      {todos.length === 0 && <p>Heç bir todo yoxdur</p>}
      {todos.map((todo: TodoTypes) => (
        <Todo key={todo.id} todoProps={todo} />
      ))}
    </div>
  )
}

export default TodoList
