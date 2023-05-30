import { useEffect, useContext, useState } from "react";
import "./button.css";
import { AppProvider } from "../ContextProvider/DataContext";
import ProductContext from "../ContextProvider/DataContext";
const Buttons = ({ onSetChatHeader }) => {
  const { productList, click, setClick, setChatHeader } =
    useContext(ProductContext);
  console.log(productList);

  const buttonStyles = (title) => {
    switch (title) {
      case "Login":
        return {
          backgroundColor: "#90e7b5",
          color: "black",
          outline: "none",
          border: "none",
        };
      case "Extension":
        return {
          backgroundColor: "#ff9898",
          color: "black",
          outline: "none",
          border: "none",
        };
      case "Living-Lab-Admin":
        return {
          backgroundColor: "#90e7b5",
          color: "black",
          outline: "none",
          border: "none",
        };
      case "Sales-Agent":
        return {
          border: "2px solid #fca5a5",
          color: "black",
          backgroundColor: "transparent",
        };

      default:
        return null;
    }
  };
  const handleClick = async (title) => {
    setChatHeader(title);
    // await getRooms();
  };
  const handleClicks = () => {
    handleClick();
  };
  return (
    <div className="">
      <div className=" d-flex flex-nowrap">
        <div className="d-flex flex-nowrap gap-3  text-nowrap py-3" id="scroll">
          {productList &&
            productList.map((title) => {
              const { backgroundColor, color, border, outline } =
                buttonStyles(title) ?? {};
              return (
                <button
                  key={title}
                  type="button"
                  className="btn btn-md"
                  style={{ backgroundColor, color, border, outline }}
                  onClick={(e) => handleClick(title)}
                >
                  {title}
                  {title === "DO-WELL-CSC" && (
                    <span
                      className="badge bg-primary"
                      // style={{ padding: "0.2px 7px" }}
                    >
                      11
                    </span>
                  )}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Buttons;
