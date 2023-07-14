import React from "react";
import { BsClock } from "react-icons/bs";
import { FaTools } from "react-icons/fa";
const HeaderButtons = () => {
  return (
    <div className="d-flex gap-4">
      <button type="button" className="button">
        <BsClock className="" />
        Available
      </button>
      <button type="button" className="button2">
        <FaTools />
      </button>
    </div>
  );
};

export default HeaderButtons;
