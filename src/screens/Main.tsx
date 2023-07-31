import { useState } from "react";
import { Title } from "../components/atoms/Title";
import { TodoInputForm } from "../components/molecules/TodoInputForm";
import { TodoList } from "../components/molecules/TodoList";

// Todoの型
export interface Todo {
  content: string;
  id: number;
}

export const Main = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Todo追加機能
  const addTodo: Function = (text: string) => {
    setTodos([
      ...todos,
      {
        content: text,
        id: Date.now(),
      },
    ]);
  };

  // Todo削除機能
  const deleteTodo: Function = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Title title={"TodoList"} />
        <TodoInputForm addTodo={addTodo} />
        <TodoList todos={todos} deleteTodo={deleteTodo} />
      </div>
    </>
  );
};
