import { useEffect, useContext, useState } from "react";
import "./button.css";
import ProductContext from "../ContextProvider/DataContext";
const Buttons = ({ onSetChatHeader }) => {
  const { productList, click, setClick, setChatHeader } =
    useContext(ProductContext);
  const [isActive, setIsActive] = useState("");
  const [active, setActive] = useState();
  const buttonStyles = (title) => {
    switch (title) {
      case "Login":
        return {
          backgroundColor: "#90e7b5",
          color: "black",
          outline: "none",
          border: "none",
          opacity: "0.8",
        };
      case "Dowell-Mail":
        return {
          backgroundColor: "#90e7b5",
          color: "black",
          outline: "none",
          border: "none",
          opacity: "0.8",
        };
      case "Extension":
        return {
          backgroundColor: "#ff9898",
          color: "black",
          outline: "none",
          border: "none",
          opacity: "0.8",
        };
      case "Living-Lab-Admin":
        return {
          backgroundColor: "#90e7b5",
          color: "black",
          outline: "none",
          border: "none",
          opacity: "0.8",
        };
      case "Sales-Agent":
        return {
          border: "2px solid #fca5a5",
          color: "black",
          backgroundColor: "transparent",
          opacity: "0.8",
        };

      default:
        return null;
    }
  };
  const buttonClick = (title) => {
    switch (title) {
      case "Login":
        return {
          opacity: "0.8",
        };
      case "Dowell-Mail":
        return {
          opacity: "0.8",
        };
      case "Extension":
        return {
          opacity: "0.8",
        };
      case "Living-Lab-Admin":
        return {
          opacity: "0.8",
        };
      case "Sales-Agent":
        return {
          opacity: "0.8",
        };

      default:
        return null;
    }
  };
  const handleClick = async (title) => {
    setChatHeader(title);
    setIsActive(!isActive, title);
  };
  const style = (title) => {
    switch (title) {
      case "Login":
        return {
          opacity: "0.8",
        };
      case "Dowell-Mail":
        return {
          opacity: "0.8",
        };
      case "Extension":
        return {
          opacity: "0.8",
        };
      case "Living-Lab-Admin":
        return {
          opacity: "0.8",
        };
      case "Sales-Agent":
        return {
          opacity: "0.8",
        };

      default:
        return null;
    }
  };

  const navlinkstyle = ({ isActive }) => {
    return {
      backgroundColor: "white",
    };
  };
  const handleClicks = () => {
    handleClick();
  };
  const activeIndex = -1;
  return (
    <div className="">
      <div className="pt-3 pt-md-2 pt-lg-0 pt-xl-0 pt-xxl-0 d-flex flex-nowrap">
        <div
          className="d-flex  flex-nowrap gap-3  text-nowrap pb-2"
          id="scroll"
        >
          {productList &&
            productList.map((title, i) => {
              const { backgroundColor, color, border, outline } =
                buttonStyles(title) ?? {};
              return (
                <button
                  key={title}
                  type="button"
                  aria-pressed="true"
                  className={`btn btn-md ${
                    isActive == title &&
                    "opacity-50 border border-4 border-primary"
                  }`}
                  style={{
                    backgroundColor,
                    color,
                    border,
                  }}
                  onClick={(e) => {
                    handleClick(title);
                    setIsActive(title);
                  }}
                >
                  {title}
                  {title === "DO-WELL-CSC" && (
                    <span className="badge bg-primary">11</span>
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
