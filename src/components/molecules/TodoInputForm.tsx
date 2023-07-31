import React, { useState } from "react";
import { SmallButton } from "../atoms/SmallButton";

export const TodoInputForm = () => {
  const [text, setText] = useState<string>("");

  return (
    <>
      <div className="flex">
        <input
          className="m-2 p-1 border border-black rounded "
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="m-2">
          <SmallButton name={"Add"} />
        </div>
      </div>
    </>
  );
};
