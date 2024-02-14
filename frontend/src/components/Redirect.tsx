import React from "react";

const Redirect: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-center flex-col w-2/4">
        <h1 className="text-center text-2xl font-semibold mt-5">{content}</h1>
      </div>
    </div>
  );
};

export default Redirect;
