import React from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { CgCloseR } from "react-icons/cg";
const DetailsSectionButton = () => {
  return (
    <div>
      <div className="d-flex gap-2 my-2">
        <MdOutlineMoreHoriz className="fs-5" />
        <CgCloseR className="fs-5" />
      </div>
    </div>
  );
};

export default DetailsSectionButton;
