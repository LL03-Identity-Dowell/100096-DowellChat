import { useEffect, useContext, useState } from "react";
import "./button.css";
import { AppProvider } from "../ContextProvider/DataContext";
import ProductContext from "../ContextProvider/DataContext";
import { NavLink } from "react-router-dom";
import axios from "axios";
const Buttons = ({ onSetChatHeader, pageName }) => {
  const { productList, click, setClick, setChatHeader, setProductList } =
    useContext(ProductContext);
  // console.log(productList);
  const [isActive, setIsActive] = useState("");
  const [active, setActive] = useState();
  const [productListForButtons, setProductListForButtons] =
    useState(productList);

  useEffect(() => {
    if (pageName === "customerSupport") {
      axios
        .get("https://100096.pythonanywhere.com/client_product_list/")
        .then((res) => {
          setProductListForButtons(res.data.product_list);
        });
    } else {
      setProductListForButtons(productList);
    }
  }, [pageName, productList]);

  //Button colors List
  const colorsList = [
    "#FF8C00",
    "#00BFFF",
    "#32CD32",
    "#CD853F",
    "#3CB371",
    "#66CDAA",
    "#2F4F4F",
    "#87CEEB",
    "#BA55D3",
    "#DB7093",
    "#2F4F4F",
    "#DC143C",
    "#FF00FF",
    "#9ACD32",
    "#F4A460",
    "#D2691E",
    "#FF6347",
    "#800000",
    "#B8860B",
    "#808000",
    "#7FFF00",
    "#9ACD32",
    "#00FF7F",
    "#00FFFF",
    "#000080",
    "#8B008B",
    "#DC143C",
    "#A52A2A",
    "#A0522D",
    "#6B8E23",
  ];

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
          // backgroundColor: "#90e7b5",
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
  const handleClick = (title) => {
    setChatHeader(title);
    onSetChatHeader(title);
    setIsActive(!isActive, title);
    // style(title);
    // await getRooms();
  };
  const style = (title) => {
    switch (title) {
      case "Login":
        return {
          // backgroundColor: "#90e7b5",
          // backgroundColor: "white",
          opacity: "0.8",
        };
      case "Dowell-Mail":
        return {
          // backgroundColor: "#90e7b5",
          // backgroundColor: "white",
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
          {productListForButtons &&
            productListForButtons.map((title, i) => {
              const { backgroundColor, color, border, outline } =
                buttonStyles(title) ?? {};
              const { opacity } = style(title) ?? {};
              return (
                <button
                  key={title}
                  type="button"
                  aria-pressed="true"
                  className={`btn btn-md ${
                    isActive == title &&
                    "opacity-50 border border-4 border-primary"
                  }`}
                  // className={`btn btn-md ${isActive == title ? "active" : ""}`}
                  style={{
                    backgroundColor: `${colorsList[i]}`,
                    color,
                    border,
                    // outline,
                  }}
                  onClick={(e) => {
                    handleClick(title);
                    setIsActive(title);
                  }}
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
