import React from "react";
import user from "../../../assets/male_avatar.png";
const InputBox = ({ input, setInput }) => {
  return (
    <div>
      <div className="d-flex gap-2">
        <img src={user} width="40px" height="40px" />
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="py-2 rounded input-"
          type="text"
          placeholder="Reply in Chat..."
          // style={{ width: "80%" }}
        />
      </div>
    </div>
  );
};

export default InputBox;
