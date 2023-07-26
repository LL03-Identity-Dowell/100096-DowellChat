import React from "react";
import { LoaderIcon } from "react-hot-toast";

export const CustomLoader = () => {
  return (
    <div className="bg-black opacity-50 w-screen h-screen d-flex justify-content-center align-items-center">
      <div className="d-flex justify-content-center align-items-center">
        <LoaderIcon
          style={{
            width: "60px",
            height: "60px",
          }}
        />
      </div>
    </div>
  );
};
