import { FaCheck } from "react-icons/fa";
import { MdDelete, MdModeEdit } from "react-icons/md";
import type { TodoTypes } from "../Types/Types";
import { useDispatch } from "react-redux";
import { todoSlice } from "../redux/todoSlice";
import { useState } from "react";

interface TodoProps {
  todoProps: TodoTypes;
}

function Todo({ todoProps }: TodoProps) {
  const { id, content, completed } = todoProps;
  const dispatch = useDispatch();
  const [newEditTodo, setNewEditTodo] = useState<string>(content);
  const [editTodo, setEditTodo] = useState<boolean>(false);
  const handleDelete = () => {
    dispatch(todoSlice.actions.removeById(id));
  };

  const handleEdit = () => {
    const payload: TodoTypes = {
      id,
      content: newEditTodo,
      completed
    };
    dispatch(todoSlice.actions.editTodo(payload));
    setEditTodo(false);
  };

  const handleMade = () => {
    dispatch(todoSlice.actions.toggleTodo(id));
    console.log(`Todo with id ${id} has been ${completed ? "uncompleted" : "completed"}.`);
  };

  return (
    <div className="todo-list-header">
      <div className="todo-list-div">
        {!editTodo && <p  className={`todo-list-title ${completed ? "completed" : ""}`}>{content}</p>}
        {editTodo && (
          <input
            type="text"
            className={`edit-todo-input ${editTodo ? "active" : ""}`}
            value={newEditTodo}
            onChange={(e) => setNewEditTodo(e.target.value)}
          />
        )}
      </div>
      <div className="todo-list-icons">
        <FaCheck
          className={completed ? "completed" : ""}
          onClick={handleMade}
          style={{ cursor: "pointer" }}
        />
        <MdDelete onClick={handleDelete} style={{ cursor: "pointer" }} />
        {editTodo ? (
          <FaCheck onClick={handleEdit} style={{ cursor: "pointer" }} />
        ) : (
          <MdModeEdit onClick={() => setEditTodo(true)} style={{ cursor: "pointer" }} />
        )}
      </div>
    </div>
  );
}

export default Todo;
