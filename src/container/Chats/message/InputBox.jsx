import React from "react";

const InputBox = ({ input, setInput }) => {
  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="py-2 px-2 rounded input-"
        type="text"
        placeholder="Reply in Chat..."
        style={{ minWidth: "7rem" }}
      />
    </div>
  );
};

export default InputBox;
