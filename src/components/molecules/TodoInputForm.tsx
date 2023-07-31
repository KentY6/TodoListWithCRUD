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
      <div className="flex items-center justify-center max-sm:w-3/4 max-lg:w-1/2">
        <input
          className="m-2 p-1 border border-black rounded max-sm:w-3/4 max-lg:w-3/4"
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
