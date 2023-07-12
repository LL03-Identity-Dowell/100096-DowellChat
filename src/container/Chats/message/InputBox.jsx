import React, { useContext } from "react";
import user from "../../../assets/male_avatar.png";
import ProductContext from "../../ContextProvider/DataContext";

const InputBox = ({ input, setInput }) => {
  const { room_Id } = useContext(ProductContext);
  return (
    <div className="d-flex gap-2 w-100">
      <div>
        <img src={user} width="40px" height="40px" alt="userImg" />
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="py-2 appearance-none rounded border-none w-100 overflow-auto"
        rows={5}
        style={{ outline: "none" }}
        type="text"
        placeholder="Reply in Chat..."
        // style={{ width: "80%" }}
      />
    </div>
  );
};

export default InputBox;
