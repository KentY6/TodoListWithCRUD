import React from "react";

export const MediumButton = ({ name }: { name: string }) => {
  return (
    <>
      <div className="m-2 bg-red-400 rounded cursor-pointer pl-6 pr-6 p-2 max-sm:mt-4">
        {name}
      </div>
    </>
  );
};
