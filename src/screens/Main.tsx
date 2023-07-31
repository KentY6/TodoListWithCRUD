import { useState } from "react";
import { Title } from "../components/atoms/Title";
import { TodoInputForm } from "../components/molecules/TodoInputForm";
import { TodoList } from "../components/molecules/TodoList";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase";
import type { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { MediumButton } from "../components/atoms/MediumButton";

// Todoの型
export interface Todo {
  content: string;
  id: number;
}

export const Main = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [message, setMessage] = useState<string>("");

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

  const user: User | null = auth.currentUser;

  // Todoを保存する機能
  const saveTodosData: Function = async () => {
    if (user) {
      const todosDocRef = doc(db, `users/${user.uid}`);
      try {
        setMessage("保存中");
        await setDoc(todosDocRef, {
          todos: todos,
        });
        setMessage("保存に成功しました");
      } catch (error) {
        console.error(error);
        setMessage("保存に失敗しました");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Title title={"TodoList"} />
        <TodoInputForm addTodo={addTodo} />
        <div onClick={() => saveTodosData()}>
          <MediumButton name={"SAVE"} />
        </div>
        <div className="m-2">{message}</div>
        <div className="text-blue-500 m-5 border-b border-blue-500">
          <Link to={`/login/`}>ログインフォームへ</Link>
        </div>

        <TodoList todos={todos} deleteTodo={deleteTodo} />
      </div>
    </>
  );
};
