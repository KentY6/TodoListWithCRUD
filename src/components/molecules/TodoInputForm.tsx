import React, { useState } from "react";
import { SmallButton } from "../atoms/SmallButton";

export const TodoInputForm = ({ addTodo }: { addTodo: Function }) => {
  const [text, setText] = useState<string>("");

  const submitTodo: Function = () => {
    addTodo(text);
    setText("");
  };

  return (
    <>
      <div className="flex">
        <input
          className="m-2 p-1 border border-black rounded "
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="m-2" onClick={() => submitTodo()}>
          <SmallButton name={"Add"} />
        </div>
      </div>
    </>
  );
};
