import React from "react";
import { LoaderIcon } from "react-hot-toast";

export const CustomLoader = () => {
  return (
    <div
      className="bg-black d-flex justify-content-center align-items-center"
      style={{ height: "100%", width: "100%", opacity: 2 }}
    >
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
