import React from "react";

export const SmallButton = ({ name }: { name: string }) => {
  return (
    <>
      <div className="flex items-center justify-center h-max bg-blue-400 p-2 rounded cursor-pointer">
        {name}
      </div>
    </>
  );
};
