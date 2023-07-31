import React from "react";
import { Todo } from "../../screens/Main";
import { TrashButton } from "../atoms/TrashButton";

type props = {
  todos: Todo[];
  deleteTodo: Function;
};

export const TodoList: React.FC<props> = ({ todos, deleteTodo }) => {
  const submitDelete: Function = (id: number) => {
    deleteTodo(id);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex border p-4 m-2 w-1/3 max-sm:w-3/4 max-lg:w-1/2 justify-between shadow border-l-8 border-l-blue-400"
        >
          <div>{todo.content}</div>
          <div className="cursor-pointer" onClick={() => submitDelete(todo.id)}>
            <TrashButton />
          </div>
        </div>
      ))}
    </div>
  );
};
