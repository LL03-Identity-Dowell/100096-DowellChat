import { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import ProductContext from "../ContextProvider/DataContext";
// const useAuth = () => {
//   const user = { loggedIn: localStorage.getItem("tokenId") };
//   const user = { token: false };
//   return user;
// };

const ProtectedRoutes = () => {
  const { searchParams } = useContext(ProductContext);
  // const
  // let isAuth = { token: true };
  if (!searchParams)
    return (window.location = "https://100014.pythonanywhere.com/");

  return <Outlet />;
};

export default ProtectedRoutes;
