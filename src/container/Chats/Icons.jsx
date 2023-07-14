import React from "react";
import { CiMail } from "react-icons/ci";
import { BsStarFill } from "react-icons/bs";
import { FaTag } from "react-icons/fa";
const Icons = () => {
  return (
    <div>
      <div className="d-flex text-primary my-2 justify-content-evenly">
        <small className="d-flex align-items-center gap-1">
          <CiMail /> Unread
        </small>
        <small className="d-flex align-items-center gap-1">
          <BsStarFill /> Follow Up
        </small>
        <small className="d-flex align-items-center gap-1">
          <FaTag />
          Labels
        </small>
      </div>
    </div>
  );
};

export default Icons;
