import React from "react";
import { CiMail } from "react-icons/ci";
import { BsStarFill } from "react-icons/bs";
import { FaTag } from "react-icons/fa";
const Icons = () => {
  return (
    <div>
      <div className="d-flex text-primary my-2">
        <small className="d-flex align-items-center">
          <CiMail /> Unread
        </small>
        <small className="d-flex align-items-center">
          <BsStarFill /> Follow Up
        </small>
        <small className="d-flex align-items-center">
          <FaTag />
          Labels
        </small>
      </div>
    </div>
  );
};

export default Icons;
