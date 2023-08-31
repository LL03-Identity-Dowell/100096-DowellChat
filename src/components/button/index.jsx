import { useState, useEffect } from "react";

export const Button = ({ title, setProductTitle, color, selectedProduct }) => {
  const [productName, setProductName] = useState();
  useEffect(() => {
    const splitedProductName = title.split("-");
    let productName = "";
    for (let i = 0; i < splitedProductName.length; i++) {
      productName += splitedProductName[i].toUpperCase();
    }
    setProductName(productName);
  }, [title]);

  return (
    <button
      disabled={selectedProduct === productName}
      onClick={() => {
        setProductTitle(productName);
      }}
      className={`flex justify-center items-center h-fit py-3 mb-2 min-w-max px-4 ${
        selectedProduct === productName && "opacity-50 border-4 border-blue-600"
      } text-white rounded-md`}
      style={{ backgroundColor: `${color}` }}
    >
      {title}
    </button>
  );
};
