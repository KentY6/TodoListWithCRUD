import React from "react";
import { Todo } from "../../screens/Main";

type props = {
  todos: Todo[];
  deleteTodo: Function;
};

export const TodoList: React.FC<props> = ({ todos, deleteTodo }) => {
  const submitDelete: Function = (id: number) => {
    deleteTodo(id);
  };

  return (
    <div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex border p-4 m-2 w-80 justify-between shadow border-l-8 border-l-blue-400"
        >
          <div>{todo.content}</div>
          <div className="cursor-pointer" onClick={() => submitDelete(todo.id)}>
            delete
          </div>
        </div>
      ))}
    </div>
  );
};
