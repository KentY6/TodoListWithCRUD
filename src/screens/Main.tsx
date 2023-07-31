import { useState } from "react";
import { Title } from "../components/atoms/Title";
import { TodoInputForm } from "../components/molecules/TodoInputForm";
import { TodoList } from "../components/molecules/TodoList";
import { Link } from "react-router-dom";

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
        <div className="text-blue-500 m-5 border-b border-blue-500">
          <Link to={`/login/`}>ログインフォームへ</Link>
        </div>

        <TodoList todos={todos} deleteTodo={deleteTodo} />
      </div>
    </>
  );
};
