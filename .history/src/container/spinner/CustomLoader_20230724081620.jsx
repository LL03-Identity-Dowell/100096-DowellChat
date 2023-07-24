import React from "react";

export const CustomLoader = () => {
  return (
    <div className="bg-black opacity-50 w-screen h-screen flex justify-center items-center">
      <div className="flex justify-center items-center">
        <LoaderIcon
          style={{
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // background: "black",
            // minHeight: "screen",
            // color: "white",
          }}
        />
      </div>
    </div>
  );
};
