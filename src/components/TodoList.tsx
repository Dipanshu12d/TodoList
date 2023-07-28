import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import TodoItem from "./Todo";

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);

  return (
    <div>
      {todos && todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
};

export default TodoList;
