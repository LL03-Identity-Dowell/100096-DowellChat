import { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import ProductContext from "../ContextProvider/DataContext";

const ProtectedRoutes = () => {
  const { searchParams } = useContext(ProductContext);
  if (!searchParam)
    return (window.location = "https://100014.pythonanywhere.com/");

  return <Outlet />;
};

export default ProtectedRoutes;
