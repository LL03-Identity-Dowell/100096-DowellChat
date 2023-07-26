import React from "react";
import { LoaderIcon } from "react-hot-toast";

export const CustomLoader = () => {
  return (
    <div
      className="bg-black"
      style={{
        height: "100vh",
        width: "1000vh",
        opacity: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
