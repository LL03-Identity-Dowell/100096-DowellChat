import { Button } from "../button";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import DataContext from "../../context/data-context";

export const Products = ({
  pageName = "customer-support",
  setProductTitle,
  selectedProduct,
}) => {
  const dataContext = useContext(DataContext);
  const [productList, setProductList] = useState([]);
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
  useEffect(() => {
    if (pageName === "living-lab-chat") {
      axios
        .get(
          `https://100096.pythonanywhere.com/client_product_list/${dataContext.collectedData.orgId}`
        )
        .then((res) => {
          setProductList(res.data.product_list);
        });
    } else {
      axios
        .get(`https://100096.pythonanywhere.com/admin_product_list/`)
        .then((res) => {
          setProductList(res.data.product_list);
        });
    }
  }, [dataContext.collectedData.orgId, pageName]);
  return (
    <>
      {productList.map((item, index) => (
        <Button
          key={index}
          title={item}
          color={colorsList[index]}
          setProductTitle={setProductTitle}
          selectedProduct={selectedProduct}
        />
      ))}
    </>
  );
};
