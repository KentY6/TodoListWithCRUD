import React from "react";
import { Title } from "../components/atoms/Title";
import { TodoInputForm } from "../components/molecules/TodoInputForm";

export const Main = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Title title={"TodoList"} />
        <TodoInputForm />
      </div>
    </>
  );
};
